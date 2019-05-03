//////////////////////////////////////////////////////////////////////////////
//
// Why custom ErrBase is used?
// See
//   - https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
//      #extending-built-ins-like-error-array-and-map-may-no-longer-work
//   - https://stackoverflow.com/questions/30402287/extended-errors-do-not-have-message-or-stack-trace
//
//////////////////////////////////////////////////////////////////////////////
export enum E {
    unknown = 'unknown',
    assert = 'assert',
    notImplemented = 'notImplemented',
    backend = 'backend',
    badRequest = 'badRequest',
}

// DO NOT extends Error. See file-header-comments above.
// Even if we have workaround, to remove confusion and difference among
//   target(es5, es6), custom class is ued.
export class Err {
    readonly stack: string | undefined; // This is 'non-enumerable'
    constructor (
        public code: E,
        public message?: string
    ) {
        // Object.setPrototypeOf(this, ErrBase.prototype);
        if (Error.hasOwnProperty('captureStackTrace')) {
            (<any>Error).captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error()).stack;
        }
        Object.defineProperty(this, 'stack', {
            enumerable: true
        });
    }

    toString(stack = false): string {
        let s = `Err: ${this.code ? this.code : ''}`;
        if (this.message) {
            s += '\n' + this.message;
        }
        if (stack) {
            s += '\n' + this.stack;
        }
        return s;
    }
}

/**
 * Assert Verification. Frequently used. So, name is simplified as 'a'.
 */
export function a(cond: boolean, e: E, msg?: string) {
    if (!cond) {
        throw new Err(e, msg);
    }
}
