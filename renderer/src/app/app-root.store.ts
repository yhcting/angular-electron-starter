//////////////////////////////////////////////////////////////////////////////
//
// ngrx/store for App-root.
//
// TODO: As file is growing, refactoring may be required.
// This file may need to be refactored to
// - root.state.ts
// - root.reducer.ts
// - root.action.ts
//
//////////////////////////////////////////////////////////////////////////////
import * as ngstore from '@ngrx/store';
import {
    createFeatureSelector,
    createSelector,
    ActionReducerMap
} from '@ngrx/store';
import * as ngrouterStore from '@ngrx/router-store';

const PREF = 'Root/';
//////////////////////////////////////////////////////////////////////////////
//
// State
//
//////////////////////////////////////////////////////////////////////////////
export class State {
    constructor(
        public featurePage: FeaturePagePayload,
        public inProgressCount: number,
    ) {}
}

//////////////////////////////////////////////////////////////////////////////
//
// Action
//
//////////////////////////////////////////////////////////////////////////////
export type FeaturePagePayload = 'home';
export type InProgressPayload = boolean;
//
// NOTE: reducer gets all actions.
// That is, action is NOT modulized
// (see dispatch function. Only action is argument.)
// To avoid action-name-conflict, prefix 'Root/' is added
//
const atFeaturePage = PREF + 'featurePage';
const atInProgress = PREF + 'inProgress';

export class FeaturePageAction implements ngstore.Action {
    readonly type = atFeaturePage;
    constructor(
        public readonly payload: FeaturePagePayload
    ) {}
}

export class InProgressAction implements ngstore.Action {
    readonly type = atInProgress;
    constructor(
        public readonly payload: InProgressPayload
    ) {}
}

export type Action =
    FeaturePageAction
    | InProgressAction
    ;



//////////////////////////////////////////////////////////////////////////////
//
// Reducer
//
//////////////////////////////////////////////////////////////////////////////
const initialState: State = new State(
    'home',
    0,
);

export function reducer(
    state: State = initialState,
    action: Action
): State {
    // Early filtering.
    if (!action.type.startsWith(PREF)) {
        return state;
    }
    // For external actioins
    /* - For future use
    switch (<string>action.type) {
    case ngstore.INIT: {
    } break;
    case ngrouterStore.ROUTER_NAVIGATION: {
    } break;
    }
    */

    switch (action.type) {
    case atFeaturePage: {
        const act = (<FeaturePageAction>action);
        state.featurePage = act.payload;
    } break;

    case atInProgress: {
        const act = (<InProgressAction>action);
        state.inProgressCount += act.payload ? 1 : -1;
        if (state.inProgressCount < 0) {
            state.inProgressCount = 0;
        }
    } break;

    default:
        console.warn(`Unknown handled action type: ${(<any>action).type}`);
    }

    return state;
}


//////////////////////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////////////////////
