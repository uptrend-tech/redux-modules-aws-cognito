// @flow

import type { State } from './types';

export const initialState: State = {
  info: {},
  error: {},
  hasSignedUp: false,
  isAuthenticating: false,
  isConfirmed: false,
  isSignedIn: false,
  needConfirmCode: false,
};

export const isAuthenticating = (state: State = initialState) =>
  state.isAuthenticating;

export const isSignedIn = (state: State = initialState) => state.isSignedIn;

export const isConfirmed = (state: State = initialState) => state.isConfirmed;

export const hasSignedUp = (state: State = initialState) => state.hasSignedUp;

export const needConfirmCode = (state: State = initialState) =>
  state.needConfirmCode;

export const showConfirm = (state: State = initialState) => {
  return getInfo(state).user;
};

export const getInfo = (state: State = initialState) => state.info;

export const getUser = (state: State = initialState) => {
  return getInfo(state).user;
};

export const getUserSession = (state: State = initialState) => {
  return getInfo(state).signInUserSession;
};

export const getUserIdToken = (state: State = initialState) => {
  const signInUserSession = getUserSession(state);
  return (
    signInUserSession &&
    signInUserSession.idToken &&
    signInUserSession.idToken.jwtToken
  );
};

export const getUserAccessToken = (state: State = initialState) => {
  const signInUserSession = getUserSession(state);
  return (
    signInUserSession &&
    signInUserSession.accessToken &&
    signInUserSession.accessToken.jwtToken
  );
};

export const getUserRefreshToken = (state: State = initialState) => {
  const signInUserSession = getUserSession(state);
  return (
    signInUserSession &&
    signInUserSession.refreshToken &&
    signInUserSession.refreshToken.token
  );
};

export const getUserTokens = (state: State = initialState) => ({
  accessToken: getUserAccessToken(state),
  refreshToken: getUserRefreshToken(state),
  idToken: getUserIdToken(state),
});

export const getError = (state: State = initialState) => state.error;

export const getErrorMsg = (state: State = initialState) => {
  const error = getError(state);
  return error.message;
};
