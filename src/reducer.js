// @flow

import type { State, Action } from './types';

import { initialState } from './selectors';

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'AWS_COGNITO_INIT':
      return { ...state, ...initialState };

    case 'AWS_COGNITO_SET_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
