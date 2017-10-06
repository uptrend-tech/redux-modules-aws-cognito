// @flow

/**
 * Action Payloads
 */

export type State = {
  +info: {
    +user?: {},
  },
  +error: {
    +message?: string,
  },
  +hasSignedUp: boolean,
  +isAuthenticating: boolean,
  +isConfirmed: boolean,
  +isSignedIn: boolean,
};

/**
 * Action Payloads
 */

export type SetStatePayload = {
  +info?: {
    +user?: {},
  },
  +error?: {
    +message?: string,
  },
  +hasSignedUp?: boolean,
  +isAuthenticating?: boolean,
  +isConfirmed?: boolean,
  +isSignedIn?: boolean,
};

export type SignUpPayload = {
  email: string,
  password: string,
  locale: string,
  phoneNumber: string,
};

// export type ConfirmRegistrationPayload = {
//   email: string,
//   code: string,
// };

export type LogInPayload = {
  email: string,
  password: string,
  code?: string,
};

/**
 * Action Types
 */

export type SetStateAction = {
  type: 'AWS_COGNITO_SET_STATE',
  payload: SetStatePayload,
};

export type InitAction = {
  type: 'AWS_COGNITO_INIT',
};

export type SignUpAction = {
  type: 'AWS_COGNITO_SIGN_UP',
  payload: SignUpPayload,
};

// export type ConfirmRegistrationAction = {
//   type: 'AWS_COGNITO_CONFIRM_REGISTRATION',
//   payload: ConfirmRegistrationPayload,
// };

export type LogInAction = {
  type: 'AWS_COGNITO_LOG_IN',
  payload: LogInPayload,
};

export type LogOutAction = {
  type: 'AWS_COGNITO_LOG_OUT',
};

export type SignedInAction = {
  type: 'AWS_COGNITO_SIGNED_IN',
};

export type Action =
  // | ConfirmRegistrationAction
  | InitAction
  | LogInAction
  | LogOutAction
  | SetStateAction
  | SignUpAction
  | SignedInAction;
