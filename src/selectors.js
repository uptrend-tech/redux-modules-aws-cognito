// @flow

import type { State } from './types';

export const initialState: State = {
  info: {},
  error: {},
  hasSignedUp: false,
  isAuthenticating: false,
  isConfirmed: false,
  isSignedIn: false,
};

export const isAuthenticating = (state: State = initialState) =>
  state.isAuthenticating;

export const getInfo = (state: State = initialState) => state.info;

export const getError = (state: State = initialState) => state.error;

export const getErrorMsg = (state: State = initialState) => {
  const error = getError(state);
  return error.message;
};

export const isSignedIn = (state: State = initialState) => state.isSignedIn;

export const isConfirmed = (state: State = initialState) => state.isConfirmed;

export const hasSignedUp = (state: State = initialState) => state.hasSignedUp;
