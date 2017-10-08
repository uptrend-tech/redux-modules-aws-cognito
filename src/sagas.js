// @flow

import { call, put, takeLatest } from 'redux-saga/effects';
import type { IOEffect } from 'redux-saga/effects';

import {
  authRegister,
  confirmation,
  authSignIn,
  getLocalUser,
  authSignOut,
  getSession,
  config,
} from './aws-cognito-promises';

import type {
  // ConfirmRegistrationAction,
  InitAction,
  LogInAction,
  LogOutAction,
  SignUpAction,
  SignedInAction,
} from './types';

import { initialState } from './selectors';

// eslint-disable-next-line no-unused-vars
function* signedIn(action: SignedInAction) {
  try {
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        isAuthenticating: true,
      },
    });
    yield call(getSession);
    const user = config.getUser();
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...initialState,
        isAuthenticating: false,
        isConfirmed: true,
        isSignedIn: true,
        info: user,
      },
    });
  } catch (e) {
    // not signed in
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...initialState,
      },
    });
  }
}

function* signUp(action: SignUpAction) {
  try {
    const { email, password, locale, phoneNumber } = action.payload;
    yield call(authRegister, email, password, locale, phoneNumber);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...initialState,
        hasSignedUp: true,
      },
    });
  } catch (e) {
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...initialState,
        error: e,
      },
    });
  }
}

// eslint-disable-next-line no-unused-vars
function* logOut(action: LogOutAction) {
  try {
    yield call(authSignOut);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: { isSignedIn: false },
    });
  } catch (e) {
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: { error: e, isSignedIn: false },
    });
  }
}

function* logIn(action: LogInAction) {
  try {
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        isAuthenticating: true,
      },
    });

    const { email, password, code } = action.payload;

    if (code) {
      yield call(confirmation, email, code);
    }

    let user = yield call(authSignIn, email, password);
    user = yield call(getLocalUser);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        isAuthenticating: false,
        isConfirmed: true,
        isSignedIn: true,
        info: user,
      },
    });
  } catch (e) {
    if (e.code === 'UserNotConfirmedException') {
      yield put({
        type: 'AWS_COGNITO_SET_STATE',
        payload: {
          isAuthenticating: false,
          isConfirmed: false,
          error: e,
        },
      });
    } else {
      yield put({
        type: 'AWS_COGNITO_SET_STATE',
        payload: {
          isAuthenticating: false,
          isConfirmed: true,
          error: e,
        },
      });
    }
  }
}

// eslint-disable-next-line no-unused-vars
function* init(action: InitAction): Generator<IOEffect, *, *> {
  yield put({
    type: 'AWS_COGNITO_SET_STATE',
    payload: {
      ...initialState,
    },
  });
}

export default function*(): Generator<IOEffect, *, *> {
  // yield takeLatest('AWS_COGNITO_CONFIRM_REGISTRATION', confirmRegistration);
  yield takeLatest('AWS_COGNITO_INIT', init);
  yield takeLatest('AWS_COGNITO_LOG_IN', logIn);
  yield takeLatest('AWS_COGNITO_LOG_OUT', logOut);
  yield takeLatest('AWS_COGNITO_SIGNED_IN', signedIn);
  yield takeLatest('AWS_COGNITO_SIGN_UP', signUp);
}
