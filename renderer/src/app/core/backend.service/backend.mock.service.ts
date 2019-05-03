//////////////////////////////////////////////////////////////////////////////
//
// Application common service - simple and misc. app-services.
//
//////////////////////////////////////////////////////////////////////////////
// import { ipcRenderer as ipc  } from 'electron';
import { Injectable } from '@angular/core';

import * as er from '../../error';
import cfg from '../../config';
import * as dto from './dto';
import * as sdo from './sdo';

function toAsync<T>(f: () => T, delay: number): Promise<T> {
    return new Promise((r, j) => {
        setTimeout(() => {
            try {
                r(f());
            } catch (e) { j(e); }
        }, delay);
    });
}


@Injectable({
    providedIn: 'root',
})
export class BackendService {
    constructor() {
    }

    isElectron(): boolean {
        // return !!(window && window.process && window.process.type);
        return false;
    }

    //////////////////////////////////////////////////////////////////////////
    //
    //
    //
    //////////////////////////////////////////////////////////////////////////
}
