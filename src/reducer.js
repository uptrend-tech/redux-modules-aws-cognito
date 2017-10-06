// @flow

import type { State, Action } from './types';
import { defaultState } from './actions';

export const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'AWS_COGNITO_INIT':
      return { ...state, ...defaultState };

    case 'AWS_COGNITO_SET_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
