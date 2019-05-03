import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap
} from '@ngrx/store';

import * as storeApp from '../app.store';
import * as storeRoot from './home-root.store';

export interface HomeState {
    root: storeRoot.State;
}

export interface State extends storeApp.State {
    home: HomeState;
}

export const reducers: ActionReducerMap<HomeState> = {
    root: storeRoot.reducer,
};

//////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////
export const selectHomeState = createFeatureSelector<HomeState>('home');
/*
export const selectChartNumSpf = createSelector(
    selectHomeState,
    state => state.root.chart.numSpf
);
*/
