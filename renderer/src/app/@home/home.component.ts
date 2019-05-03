import {
    Component,
    AfterViewInit,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    Subscription,
    Observer,
    Observable,
    Subject
} from 'rxjs';
import {
    map,
    take,
    takeUntil,
    catchError
} from 'rxjs/operators';
import {
    Store,
    select
} from '@ngrx/store';

import {
    MatDialog,
    MatSnackBar,
} from '@angular/material';

import {
    AppService,
    BackendService
} from '../core';

import { State } from './home.store';

import * as storeApp from '../app-root.store';
import * as storeRoot from './home-root.store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements
OnInit, AfterViewInit, OnDestroy {
    private sjDestroy$ = new Subject<void>();

    constructor(
        private readonly snackbar: MatSnackBar,
        private readonly app: AppService,
        private readonly be: BackendService,
        private readonly store: Store<State>
    ) {}

    ngOnInit() {
        // Use saved(saved in filesystem) values if exists.
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.sjDestroy$.next();
        this.sjDestroy$.complete();
    }

    //////////////////////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////////////////////
}
