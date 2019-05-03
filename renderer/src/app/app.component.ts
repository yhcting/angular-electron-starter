import { Component } from '@angular/core';
import {
//    ElectronService,
    AppService,
} from './core';

import { TranslateService } from '@ngx-translate/core';
import {
    MatSnackBar,
} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    initialized = false;
    waitingMsg = '[TODO: Translate] Loading...';

    private async init() {
        await this.app.init((msg) => {
            this.snackbar.open(msg);
        });
    }

    constructor(
        // public electronService: ElectronService,
        private readonly app: AppService,
        private readonly snackbar: MatSnackBar,
        private readonly translate: TranslateService
    ) {
        translate.setDefaultLang('kr');

        this.init()
        .then(() => this.initialized = true)
        .catch(e => this.waitingMsg = e.toString());

        // console.log('environment', environment);
        /*
        if (electronService.isElectron()) {
            console.log('Mode electron');
            // console.log('Electron ipcRenderer', electronService.ipcRenderer);
            // console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            console.log('Mode web');
        }
        */
    }
}
