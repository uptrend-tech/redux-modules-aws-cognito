// @flow

import type { State, Action } from './types';

import { initialState } from './selectors';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case '@@awsCognito/LOAD_SESS':
      return { ...state, isAuthenticating: true };

    case '@@awsCognito/LOAD_SESS_FAILED':
      return {
        ...state,
        ...action.payload,
        isAuthenticating: false,
        isSignedIn: false,
      };

    case '@@awsCognito/LOAD_SESS_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isSignedIn: true,
        isAuthenticating: false,
      };

    case '@@awsCognito/LOG_IN':
      return { ...state, isAuthenticating: true };

    case '@@awsCognito/LOG_IN_FAILED':
      return {
        ...state,
        isAuthenticating: false,
        isConfirmed: true,
        isSignedIn: false,
        needConfirmCode: false,
      };

    case '@@awsCognito/LOG_IN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isSignedIn: true,
        isAuthenticating: false,
      };

    case '@@awsCognito/LOG_OUT':
      return { ...initialState };

    case '@@awsCognito/RESET_STATE':
      return { ...initialState, ...action.payload };

    case '@@awsCognito/SET_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default reducer;
