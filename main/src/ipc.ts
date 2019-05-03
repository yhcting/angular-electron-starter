import * as os from 'os';
import { ipcMain as ipc } from 'electron';
import * as dto from './dto';
import * as handler from './handler';
import { Err } from './error';

function makeOkResponse(body: dto.ResOkBody): dto.ResOk {
    return {
        d: body
    };
}

function makeErrResponse(e: any): dto.ResErr {
    if (e instanceof Err) {
        return {
            e: {
                code: e.code,
                message: e.message
            }
        };
    } else {
        return {
            e: {
                code: dto.Ecode.unknown,
                message: e.toString()
            }
        };
    }
}

export function ipcMain() {
    ipc.on('async', async (event: any, id: any, arg: any) => {
        const msg: dto.IpcReq = arg;
        console.assert(id && arg);
        try {
            event.sender.send(id, makeOkResponse(
                await (<any>handler)[msg.t](msg.d))
            );
        } catch (e) {
            event.sender.send(id, makeErrResponse(e));
        }
    });

    ipc.on('sync', async (event: any, arg: any) => {
        const msg: dto.IpcReq = arg;
        // console.log(msg);
        try {
            event.returnValue = makeOkResponse(
                await (<any>handler)[msg.t](msg.d)
            );
        } catch (e) {
            event.returnValue = makeErrResponse(e);
        }
    });
}
