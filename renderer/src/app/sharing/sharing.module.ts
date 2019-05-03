import { NgModule } from '@angular/core';
import { ExternModule } from '../extern';

import { ConfirmDialogComponent } from './dialog/confirm';
import { CustomValidatorDirective } from './validator/custom.directive';
import { VarsDirective } from './vars.directive';

const COMPONENTS = [
    ConfirmDialogComponent
];

const DIRECTIVES = [
    CustomValidatorDirective,
    VarsDirective
];

const MODULES = [
];

export const ENTRY_COMPONENTS = [
    ConfirmDialogComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    imports: [
        // This is already imported with ExternModule.
        // So, we don't need to re-export it.
        ExternModule,
        ...MODULES
    ],
    exports: [
        ...MODULES,
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})
export class SharingModule {}
