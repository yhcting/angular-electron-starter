/*
 * To prevents webpack from packing node_modules.
 * Node modules are installed by npm. So, webpack doesn't need to pack them!
 */
const nodeExts = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/*
const PiUglify = require('uglifyjs-webpack-plugin');
const PiOptimize = require('optimize-js-plugin');
*/

module.exports = (prod) => {
    wsdir = __dirname; // workspace directory

    let cfg = {
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            sourceMapFilename: `index.js.map`,
            path: wsdir + '/dist'
        },
        target: 'electron-main',
        externals: [nodeExts()],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: [
                        /node_modules/,
                        /\.spec.tsx?$/
                    ],
                    options: {
                        context: wsdir,
                        configFile: 'tsconfig.wp.json'
                    }
                },
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
              'src/favicon.icns',
              'src/favicon.ico',
              'src/favicon.png',
              'src/favicon.256x256.png',
              'src/favicon.512x512.png',
          ])
        ],
        resolve: {
            symlinks: false,
            extensions: [".tsx", ".ts", ".js"]
        },
        node: {
            __dirname: false,
            __filename: false
        }
    };

    if (prod) {
        cfg.mode = 'production';
        cfg.plugins = [
            ...cfg.plugins,
            /*
            new PiUglify({
                sourceMap: false
            }),
            new PiOptimize({
                parallel: true,
                uglifyOptions: {
                    ie8: false,
                    ecma: 6,
                    warnings: true,
                    mangle: true, // debug false
                    output: {
                        comments: false,
                        beautify: false,  // debug true
                    }
                },
                warnings: true,
            })
            */
        ];
    } else {
        cfg.mode = 'development';
        cfg.devtool = 'inline-source-map';
    }
    return cfg;
};
