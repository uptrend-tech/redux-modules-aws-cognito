// @flow

import type { State, Action } from './types';

import { initialState } from './selectors';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'AWS_COGNITO_INIT':
      return { ...state, ...initialState };

    case 'AWS_COGNITO_LOG_IN':
      return { ...state, isAuthenticating: true };

    case 'AWS_COGNITO_LOG_OUT':
      return { ...initialState };

    case 'AWS_COGNITO_RESET_STATE':
      return { ...initialState, ...action.payload };

    case 'AWS_COGNITO_SET_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default reducer;
