import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResultsState } from '../interfaces/ResultsState';

const getResultFeatureState = createFeatureSelector<any>('resultState');

export const selectAgentInfo = createSelector(
  getResultFeatureState,
  (state) => state.agentInfo
);

export const selectRole = createSelector(
  getResultFeatureState,
  (state) => state.role
);

export const selectFavoriteResults = createSelector(
  getResultFeatureState,
  (state) => {
    return state.DisplayResults().find((f: any) => f.favorite === true);
  }
);

export const selectResults = createSelector(getResultFeatureState, (state) =>
  state.DisplayResults()
);

export const selectFilters = createSelector(
  getResultFeatureState,
  (state) => state.filters
);

export const selectUnfiltered = createSelector(
  getResultFeatureState,
  (state) => state.unfiltered
);

export const selectIndex = createSelector(
  getResultFeatureState,
  (state, props) =>
    state.DisplayResults().findIndex((r) => r.propertyID === props.pID) -
    props.OFFSET
);


export const getError = createSelector(
  getResultFeatureState,
  (state) => state.error
);
