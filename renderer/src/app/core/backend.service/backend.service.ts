//////////////////////////////////////////////////////////////////////////////
//
// Gateway(Proxy) layer between frontend and backend.
// Keep this module as simple as possible.
// (DO NOT MAKE any dependencies on other modules - service, component ...)
//
//////////////////////////////////////////////////////////////////////////////
import { ipcRenderer as ipc  } from 'electron';
import { Injectable } from '@angular/core';
import * as er from '../../error';

import * as dto from './dto';
import * as sdo from './sdo';
import cfg from '../../config';

const ASYNC_IPC_ID_PREFIX = 'ELECTRON-ASYNC-IPC-ID';

let IPC_ID = 100000; // starting (base id)

function ipcId(): string {
    return ASYNC_IPC_ID_PREFIX + ':' + (IPC_ID++);
}


function isErrResponse(r: any): r is dto.ResErr {
    return r && r.e;
}

function ipcErrToErrObj(e: dto.ResErr): er.Err {
    return new er.Err(er.E.backend, `${e.e.code}: ${e.e.message}`);
}


function ipcSync<T>(m: dto.IpcReq): T {
    const r = <dto.IpcRes>ipc.sendSync('sync', m);
    if (isErrResponse(r)) {
        throw ipcErrToErrObj(r);
    } else {
        return r.d;
    }
}

function ipcAsync<T>(m: dto.IpcReq): Promise<T> {
    return new Promise((res, rej) => {
        // random generated unique id.
        const id = ipcId();
        ipc.once(id, (event, r: dto.IpcRes) => {
            if (isErrResponse(r)) {
                rej(ipcErrToErrObj(r));
            } else {
                res(r.d);
            }
        });
        ipc.send('async', id, m);
    });
}


//////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////
@Injectable({
    providedIn: 'root',
})
export class BackendService {
    constructor() {
        ipcSync({
            t: 'init',
            d: undefined
        });
    }

    isElectron(): boolean {
        // return !!(window && window.process && window.process.type);
        return true;
    }

    ipcSync<T>(m: dto.IpcReq): T {
        return ipcSync<T>(m);
    }

    ipcAsync<T>(m: dto.IpcReq): Promise<T> {
        return ipcAsync<T>(m);
    }

    //////////////////////////////////////////////////////////////////////////
    //
    //
    //
    //////////////////////////////////////////////////////////////////////////
}
