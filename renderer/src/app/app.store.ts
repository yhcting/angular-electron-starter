//////////////////////////////////////////////////////////////////////////////
//
// Application store.
//
//////////////////////////////////////////////////////////////////////////////
import * as ngstore from '@ngrx/store';
import {
    createFeatureSelector,
    createSelector,
    ActionReducerMap
} from '@ngrx/store';

import { environment } from '../environments/environment';
import * as root from './app-root.store';


//////////////////////////////////////////////////////////////////////////////
//
// State / Reducer / Selector
//
//////////////////////////////////////////////////////////////////////////////
export interface State {
    root: root.State;
}

export const reducers: ngstore.ActionReducerMap<State> = {
    root: root.reducer
};


/*
 * Note: Using selector.
 * =====================
 * Keep in mind that once selector is invoked, result is meorized!
 * => Subscribe may not called due to memorized value(same value) is returned.
 * So, 'selector' is useful for data that is not updated frequently.
 */


//////////////////////////////////////////////////////////////////////////////
//
// Meta Reducers
//
//////////////////////////////////////////////////////////////////////////////
// console.log all actions
function logger(reducer: ngstore.ActionReducer<State>
): ngstore.ActionReducer<State> {
    return function(state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}
/*
export const metaReducers: ngstore.MetaReducer<State>[] = !environment.production
    ? [logger]
    : [];
*/
export const metaReducers: ngstore.MetaReducer<State>[] = [];
