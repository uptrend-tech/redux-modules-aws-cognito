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
  +isAuthenticated: boolean,
  +needConfirmCode: boolean,
  +needMFA: boolean,
  +needNewPassword: boolean,
};

/**
 * Action Payloads
 */

export type PayloadLogIn = {
  email: string,
  password: string,
  code?: string,
  newPassword?: string,
};

export type PayloadLogInRequireMFA = {
  codeDeliveryDetails: {},
};

export type PayloadLogInRequireNewPassword = {
  userAttributes: {},
  requiredAttributes: {},
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
  +isAuthenticated?: boolean,
  +needConfirmCode?: boolean,
  +needMFA?: boolean,
  +needNewPassword?: boolean,
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
  type: '@@awsCognito/LOAD_SESSION',
};

export type ActionLoadSessionFailed = {
  type: '@@awsCognito/LOAD_SESSION_FAILED',
  payload?: PayloadSetState,
};

export type ActionLoadSessionSuccess = {
  type: '@@awsCognito/LOAD_SESSION_SUCCESS',
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

// LOG IN MORE DATA REQUIRED
export type ActionLogInRequireMFA = {
  type: '@@awsCognito/LOG_IN_REQUIRE_MFA',
  payload?: PayloadLogInRequireMFA,
};

export type ActionLogInRequireNewPassword = {
  type: '@@awsCognito/LOG_IN_REQUIRE_NEW_PASSWORD',
  payload: PayloadLogInRequireNewPassword,
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
  | ActionLogInRequireMFA
  | ActionLogInRequireNewPassword
  | ActionLogOut
  | ActionLogOutFailed
  | ActionLogOutSuccess
  | ActionResetState
  | ActionSetState
  | ActionSignUp
  | ActionSignUpFailed
  | ActionSignUpSuccess;
