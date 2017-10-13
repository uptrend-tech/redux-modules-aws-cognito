// @flow

import type {
  ActionLoadSession,
  ActionLoadSessionFailed,
  ActionLoadSessionSuccess,
  ActionLogIn,
  ActionLogInFailed,
  ActionLogInSuccess,
  ActionLogOut,
  ActionLogOutFailed,
  ActionLogOutSuccess,
  ActionResetState,
  ActionSetState,
  ActionSignUp,
  // ActionSignUpFailed,
  // ActionSignUpSuccess,
  PayloadLogIn,
  PayloadSetState,
  PayloadSignUp,
} from './types';

export const loadSession = (): ActionLoadSession => ({
  type: '@@awsCognito/LOAD_SESSION',
});

export const loadSessionFailed = (
  payload: PayloadSetState,
): ActionLoadSessionFailed => ({
  type: '@@awsCognito/LOAD_SESSION_FAILED',
  payload,
});

export const loadSessionSuccess = (
  payload: PayloadSetState,
): ActionLoadSessionSuccess => ({
  type: '@@awsCognito/LOAD_SESSION_SUCCESS',
  payload,
});

export const logIn = (payload: PayloadLogIn): ActionLogIn => ({
  type: '@@awsCognito/LOG_IN',
  payload,
});

export const logInFailed = (payload: PayloadSetState): ActionLogInFailed => ({
  type: '@@awsCognito/LOG_IN_FAILED',
  payload,
});

export const logInSuccess = (payload: PayloadSetState): ActionLogInSuccess => ({
  type: '@@awsCognito/LOG_IN_SUCCESS',
  payload,
});

export const logOut = (payload: PayloadSetState): ActionLogOut => ({
  type: '@@awsCognito/LOG_OUT',
  payload,
});

export const logOutFailed = (payload: PayloadSetState): ActionLogOutFailed => ({
  type: '@@awsCognito/LOG_OUT_FAILED',
  payload,
});

export const logOutSuccess = (
  payload: PayloadSetState,
): ActionLogOutSuccess => ({
  type: '@@awsCognito/LOG_OUT_SUCCESS',
  payload,
});

export const resetState = (payload?: PayloadSetState): ActionResetState => ({
  type: '@@awsCognito/RESET_STATE',
  payload,
});

export const setState = (payload: PayloadSetState): ActionSetState => ({
  type: '@@awsCognito/SET_STATE',
  payload,
});

export const signUp = (payload: PayloadSignUp): ActionSignUp => ({
  type: '@@awsCognito/SIGN_UP',
  payload,
});
