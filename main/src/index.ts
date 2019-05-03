import {
    app,
    BrowserWindow,
    protocol,
    screen
} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import { ipcMain } from './ipc';

let win: BrowserWindow;

const rendererDir = path.join(__dirname, '..', 'renderer');

function verifyPlatformEnvironment() {
    const err = new Error(`Platform "${process.platform}" is NOT supported!`);
    // Check platform
    switch (process.platform) {
    case 'linux':
    case 'darwin':
    case 'win32':
    break;

    default:
        throw err;
    }
    const homedir = process.env['HOME'];
    if (undefined === homedir) {
        throw err;
    }

    const homeStat = fs.statSync(homedir);
    if (!homeStat.isDirectory()) {
        throw new Error(`Invalid HOME directory: ${homedir}`);
    }
}

function createWindow(serve: boolean) {

    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height
    });

    if (serve) {
        throw new Error('notUsed!');
        /*
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/../node_modules/electron`)
        });
        win.loadURL('http://localhost:4200');
        */
    } else {
        protocol.registerFileProtocol('local', (request: any, callback: any) => {
            // console.log('>>> ', request);
            let u = request.url.substr('local://renderer/'.length);
            if (u.startsWith('#')) {
                // In general, this is case of reloading.
                // Set to home in force.
                win.loadURL(url.format({
                    pathname: 'renderer',
                    protocol: 'local:',
                    slashes: true
                }));
            } else {
                if (0 === u.length) {
                    u = 'index.html';
                }
                const filePath = path.join(rendererDir, u);
                // console.log('>>> path: ' + filePath);
                callback(path.normalize(filePath));
            }
        }, (error: any) => {
            if (error) {
                console.error('Failed to register protocol');
            }
        });
        // win.loadFile(path.join(__dirname, 'dist/index.html'));
        win.loadURL(url.format({
            // pathname: path.join(__dirname, 'dist', 'index.html'),
            // protocol: 'file:',
            // slashes: false
            pathname: 'renderer',
            protocol: 'local:',
            slashes: true
        }));
    }

    if ('true' === process.env['D_TICKET_DEV_TOOLS']) {
        BrowserWindow.addDevToolsExtension(
            '/home/yh77.cho/.config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.16.5_0'
        );
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = <any>undefined;
    });

}


async function main() {
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');

    verifyPlatformEnvironment();

    try {
      if (!serve) {
          protocol.registerStandardSchemes(['local']);
      }

      // This method will be called when Electron has finished
      // initialization and is ready to create browser windows.
      // Some APIs can only be used after this event occurs.
      app.on('ready', () => createWindow(serve));

      // Quit when all windows are closed.
      app.on('window-all-closed', () => {
          // On OS X it is common for applications and their menu bar
          // to stay active until the user quits explicitly with Cmd + Q
          if (process.platform !== 'darwin') {
              app.quit();
          }
      });

      app.on('activate', () => {
          // On OS X it's common to re-create a window in the app when the
          // dock icon is clicked and there are no other windows open.
          if (win) {
              createWindow(serve);
          }
      });

    } catch (e) {
      // Catch Error
      // throw e;
    }

    ipcMain();
}

main();
