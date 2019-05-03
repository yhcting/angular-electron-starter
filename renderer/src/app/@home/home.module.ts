import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ExternModule  } from '../extern';
import { SharingModule } from '../sharing';

import { reducers } from './home.store';
import { HomeComponent } from './home.component';

const COMPONENTS = [
    HomeComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        StoreModule.forFeature('home', reducers),
        ExternModule,
        SharingModule
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class HomeModule {}
