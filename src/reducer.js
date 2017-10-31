// @flow

import type { State, Action } from './types';

import { initialState } from './selectors';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case '@@awsCognito/LOAD_SESSION':
    case '@@awsCognito/LOG_IN':
      return { ...state, isAuthenticating: true };

    case '@@awsCognito/LOAD_SESSION_FAILED':
    case '@@awsCognito/LOG_IN_FAILED':
      return {
        ...state,
        ...action.payload,
        isAuthenticating: false,
        isAuthenticated: false,
        // isConfirmed: true,
        // needConfirmCode: false,
      };

    case '@@awsCognito/LOG_IN_REQUIRE_NEW_PASSWORD':
      return {
        ...state,
        error: {
          ...state.error,
          needNewPassword: {
            ...action.payload,
          },
        },
        isAuthenticated: false,
        isAuthenticating: false,
        needNewPassword: true,
        hasSignedUp: true,
        isConfirmed: true,
      };

    case '@@awsCognito/LOAD_SESSION_SUCCESS':
    case '@@awsCognito/LOG_IN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isAuthenticating: false,
        needNewPassword: false,
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
