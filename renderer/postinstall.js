// Allow angular using electron module (native node modules)
const fs = require('fs');
const f_angular = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

let target = process.argv[2];

target || (target = 'electron-renderer');
if (target !== 'web' && target !== 'electron-renderer') {
    throw new Error('Invalid target.');
}

fs.readFile(f_angular, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let result = data.replace(/target: "electron-renderer",/g, '');
    result = result.replace(/target: "web",/g, '');

    result = result.replace(/return \{/g, `return {target: "${target}",`);

    fs.writeFile(f_angular, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

