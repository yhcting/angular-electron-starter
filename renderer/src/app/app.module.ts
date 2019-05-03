// import 'zone.js/dist/zone-mix'; /** This is for electron-renderer */
import 'zone.js/dist/zone';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    HttpClientModule,
    HttpClient
} from '@angular/common/http';

import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// NG Translate
import {
    TranslateModule,
    TranslateLoader
} from '@ngx-translate/core';
import {
    TranslateHttpLoader
} from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';

import {
    AppRoutingModule
} from './app-routing.module';

import { CoreModule } from './core';
import { ExternModule } from './extern';
import {
    ENTRY_COMPONENTS,
    SharingModule
} from './sharing';

import * as store from './app.store';
import { AppComponent } from './app.component';
import { HomeModule } from './@home';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],
    imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        StoreModule.forRoot(
            store.reducers,
            { metaReducers: store.metaReducers }
        ),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extention to log-only mode
        }),
        CoreModule,
        ExternModule,
        SharingModule,
        HomeModule,
        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
