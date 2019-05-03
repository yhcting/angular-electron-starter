import { Directive, Input } from '@angular/core';

import * as m from '../deco/method';

@Directive({
    selector: '[appVars]',
    exportAs: 'appVars'
})
export class VarsDirective {

    @Input('appVars') set __appVars(o: any ) {
        if ('object' !== typeof(o)
            || null === o
            || Array.isArray(o)
        ) {
            throw Error('Invalid usage AppVars: Only object is allowed');
        }
        Object.assign(this, o);
    }

    constructor( ) {
    }
}
