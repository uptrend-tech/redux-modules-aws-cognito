// @flow

import { createSelector } from 'reselect';

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

export const cognitoState = (state: { cognito: State }): State => state.cognito;

export const isAuthenticating = createSelector(
  [cognitoState],
  (state: State = initialState) => state.isAuthenticating,
);

export const isSignedIn = createSelector(
  [cognitoState],
  (state: State = initialState) => state.isSignedIn,
);

export const isConfirmed = createSelector(
  [cognitoState],
  (state: State = initialState) => state.isConfirmed,
);

export const hasSignedUp = createSelector(
  [cognitoState],
  (state: State = initialState) => state.hasSignedUp,
);

export const needConfirmCode = createSelector(
  [cognitoState],
  (state: State = initialState) => state.needConfirmCode,
);

export const getInfo = createSelector(
  [cognitoState],
  (state: State = initialState) => state.info,
);

export const getUser = createSelector([getInfo], info => info.user);

export const showConfirm = createSelector([getUser], user => user);

export const getUserSession = createSelector(
  [getInfo],
  info => info.signInUserSession,
);

export const getUserIdToken = createSelector(
  [getUserSession],
  userSession =>
    userSession && userSession.idToken && userSession.idToken.jwtToken,
);

export const getUserAccessToken = createSelector(
  [getUserSession],
  userSession =>
    userSession && userSession.accessToken && userSession.accessToken.jwtToken,
);

export const getUserRefreshToken = createSelector(
  [getUserSession],
  userSession =>
    userSession && userSession.refreshToken && userSession.refreshToken.token,
);

export const getUserTokens = createSelector(
  [getUserAccessToken, getUserRefreshToken, getUserIdToken],
  (accessToken, refreshToken, idToken) => ({
    accessToken,
    refreshToken,
    idToken,
  }),
);

export const getError = createSelector(
  [cognitoState],
  (state: State = initialState) => state.error,
);

export const getErrorMsg = createSelector([getError], error => error.message);
