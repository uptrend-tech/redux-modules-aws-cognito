// @flow

import type {
  State,
  // ConfirmRegistrationAction,
  // ConfirmRegistrationPayload,
  InitAction,
  LogInAction,
  LogInPayload,
  LogOutAction,
  SetStateAction,
  SetStatePayload,
  SignUpAction,
  SignUpPayload,
  SignedInAction,
} from './types';

export const defaultState: State = {
  info: {},
  error: {},
  isSignedIn: false,
  isConfirmed: false,
  hasSignedUp: false,
};

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

export const logOut = (): LogOutAction => ({
  type: 'AWS_COGNITO_LOG_OUT',
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
