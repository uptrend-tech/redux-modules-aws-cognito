// @flow

import type { State } from './types';

export const initialState: State = {
  info: {},
  error: {},
  isSignedIn: false,
  isConfirmed: false,
  hasSignedUp: false,
};

export const getInfo = (state: State = initialState) => state.info;
export const getError = (state: State = initialState) => state.error;
export const isSignedIn = (state: State = initialState) => state.isSignedIn;
export const isConfirmed = (state: State = initialState) => state.isConfirmed;
export const hasSignedUp = (state: State = initialState) => state.hasSignedUp;
