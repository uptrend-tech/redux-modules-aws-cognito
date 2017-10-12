// @flow

import type {
  // ConfirmRegistrationAction,
  // ConfirmRegistrationPayload,
  InitAction,
  LogInAction,
  LogInFailedAction,
  LogInSuccessAction,
  LogInPayload,
  LogOutAction,
  ResetStateAction,
  SetStateAction,
  SetStatePayload,
  SignUpAction,
  SignUpPayload,
  SignedInAction,
} from './types';

// export const confirmRegistration = (
//   payload: ConfirmRegistrationPayload,
// ): ConfirmRegistrationAction => ({
//   type: 'AWS_COGNITO_CONFIRM_REGISTRATION',
//   payload,
// });

export const init = (): InitAction => ({
  type: 'AWS_COGNITO_INIT',
});

export const logIn = (payload: LogInPayload): LogInAction => ({
  type: 'AWS_COGNITO_LOG_IN',
  payload,
});

export const logInFailed = (payload: SetStatePayload): LogInFailedAction => ({
  type: 'AWS_COGNITO_LOG_IN_FAILED',
  payload,
});

export const logInSuccess = (payload: SetStatePayload): LogInSuccessAction => ({
  type: 'AWS_COGNITO_LOG_IN_SUCCESS',
  payload,
});

export const logOut = (): LogOutAction => ({
  type: 'AWS_COGNITO_LOG_OUT',
});

export const resetState = (payload?: SetStatePayload): ResetStateAction => ({
  type: 'AWS_COGNITO_RESET_STATE',
  payload,
});

export const setState = (payload: SetStatePayload): SetStateAction => ({
  type: 'AWS_COGNITO_SET_STATE',
  payload,
});

export const signUp = (payload: SignUpPayload): SignUpAction => ({
  type: 'AWS_COGNITO_SIGN_UP',
  payload,
});

export const signedIn = (): SignedInAction => ({
  type: 'AWS_COGNITO_SIGNED_IN',
});
