//////////////////////////////////////////////////////////////////////////////
//
// Application common service - simple and misc. app-services.
//
//////////////////////////////////////////////////////////////////////////////
import { Injectable } from '@angular/core';

import {
    Observable,
    Observer,
    Subscription,
    Subject
} from 'rxjs';
import {
    select,
    Store
} from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import * as er from '../error';
import { BackendService } from './backend.service';
import { State } from '../app.store';
import * as storeApp from '../app-root.store';

export interface AppPreference {
    version: number;
    mspDir: string;
}

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private preference: AppPreference;

    constructor(
        private readonly store: Store<State>,
        private readonly translate: TranslateService,
        private readonly be: BackendService
    ) {
    }

    async init(warningCb: (msg: string) => void): Promise<void> {
    }

    progress(inProgress: boolean) {
        this.store.dispatch(new storeApp.InProgressAction(inProgress));
    }
}
