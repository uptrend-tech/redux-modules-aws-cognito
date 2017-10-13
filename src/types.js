// @flow

/**
 * Action Payloads
 */

export type State = {
  +info: {
    +user?: {},
    +signInUserSession?: {
      +idToken?: { jwtToken: string },
      +refreshToken?: { token: string },
      +accessToken?: { jwtToken: string },
    },
  },
  +error: {
    +message?: string,
  },
  +hasSignedUp: boolean,
  +isAuthenticating: boolean,
  +isConfirmed: boolean,
  +isSignedIn: boolean,
  +needConfirmCode: boolean,
};

/**
 * Action Payloads
 */

export type PayloadLogIn = {
  email: string,
  password: string,
  code?: string,
};

export type PayloadSetState = {
  +info?: {
    +user?: {},
    +signInUserSession?: {
      +idToken?: { jwtToken: string },
      +refreshToken?: { token: string },
      +accessToken?: { jwtToken: string },
    },
  },
  +error?: {
    +message?: string,
  },
  +hasSignedUp?: boolean,
  +isAuthenticating?: boolean,
  +isConfirmed?: boolean,
  +isSignedIn?: boolean,
  +needConfirmCode?: boolean,
};

export type PayloadSignUp = {
  email: string,
  password: string,
  locale: string,
  phoneNumber: string,
};

/**
 * Action Types
 */

// LOAD SESSION
export type ActionLoadSession = {
  type: '@@awsCognito/LOAD_SESS',
};

export type ActionLoadSessionFailed = {
  type: '@@awsCognito/LOAD_SESS_FAILED',
  payload?: PayloadSetState,
};

export type ActionLoadSessionSuccess = {
  type: '@@awsCognito/LOAD_SESS_SUCCESS',
  payload?: PayloadSetState,
};

// LOG IN
export type ActionLogIn = {
  type: '@@awsCognito/LOG_IN',
  payload: PayloadLogIn,
};

export type ActionLogInFailed = {
  type: '@@awsCognito/LOG_IN_FAILED',
  payload?: PayloadSetState,
};

export type ActionLogInSuccess = {
  type: '@@awsCognito/LOG_IN_SUCCESS',
  payload?: PayloadSetState,
};

// LOG OUT
export type ActionLogOut = {
  type: '@@awsCognito/LOG_OUT',
};

export type ActionLogOutFailed = {
  type: '@@awsCognito/LOG_OUT_FAILED',
  payload?: PayloadSetState,
};

export type ActionLogOutSuccess = {
  type: '@@awsCognito/LOG_OUT_SUCCESS',
  payload?: PayloadSetState,
};

// SIGN UP
export type ActionSignUp = {
  type: '@@awsCognito/SIGN_UP',
  payload: PayloadSignUp,
};

export type ActionSignUpFailed = {
  type: '@@awsCognito/SIGN_UP_FAILED',
  payload?: PayloadSetState,
};

export type ActionSignUpSuccess = {
  type: '@@awsCognito/SIGN_UP_SUCCESS',
  payload?: PayloadSetState,
};

// RESET STATE
// TODO remove this once we get event sourcing in place
export type ActionResetState = {
  type: '@@awsCognito/RESET_STATE',
  payload?: PayloadSetState,
};

// SET STATE
// TODO remove this once we get event sourcing in place
export type ActionSetState = {
  type: '@@awsCognito/SET_STATE',
  payload: PayloadSetState,
};

/**
 * Action Union Type
 */

export type Action =
  // | ConfirmRegistrationAction
  | ActionLoadSession
  | ActionLoadSessionFailed
  | ActionLoadSessionSuccess
  | ActionLogIn
  | ActionLogInFailed
  | ActionLogInSuccess
  | ActionLogOut
  | ActionLogOutFailed
  | ActionLogOutSuccess
  | ActionResetState
  | ActionSetState
  | ActionSignUp
  | ActionSignUpFailed
  | ActionSignUpSuccess;
