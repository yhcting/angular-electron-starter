import {
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';

// import { ElectronService } from './electron.service';
import {
    BackendService,
} from './backend.service';
import { AppService } from './app.service';

const common = [
    AppService,
];
/*
const electron = [
    ElectronService,
    FsService
];
*/
const web = [
    BackendService
];


/**
 * See https://angular.io/guide/singleton-services for details
 */
@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        ...common,
        ...web
    ]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
            'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
