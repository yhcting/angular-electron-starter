//////////////////////////////////////////////////////////////////////////////
//
// main ------- renderer
//  |---- Req ---->|
//  |<--- Res -----|
//
//  |<---Event-----|
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////
export type InitReq = undefined;
export type InitRes = undefined;


export enum Ecode {
    unknown = 'unknown',
    assert = 'assert',
    notImplemented = 'notImplemented',
    badRequest = 'badRequest',
}

export interface ResErrBody {
    code: Ecode;
    message?: string;
}

export interface ResErr {
    e: ResErrBody;
}

export type ResOkBody =
    InitRes
    ;

export interface ResOk {
    d: ResOkBody; /** data */
}

export type IpcRes = ResOk | ResErr;
export type IpcReq = {
        t: 'init', /** type */
        d: InitReq /** data */
    }
    ;
