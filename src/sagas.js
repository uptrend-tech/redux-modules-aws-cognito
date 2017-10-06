// @flow

import { call, put, takeLatest } from 'redux-saga/effects';
// import type { call, put, takeLatest } from 'redux-saga/effects';
import type { IOEffect } from 'redux-saga/effects';

import {
  authRegister,
  confirmation,
  authSignIn,
  getLocalUser,
  authSignOut,
  getSession,
  config,
} from 'aws-cognito-promises';

// import * as actions from './actions';
// import * as states from './states';

import type {
  // State,
  // ConfirmRegistrationAction,
  InitAction,
  LogInAction,
  LogOutAction,
  SignUpAction,
  SignedInAction,
} from './types';

import { defaultState } from './actions';

// eslint-disable-next-line no-unused-vars
function* signedIn(action: SignedInAction) {
  try {
    yield call(getSession);
    const user = config.getUser();
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...defaultState,
        isSignedIn: true,
        isConfirmed: true,
        info: user,
      },
    });
  } catch (e) {
    // not signed in
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...defaultState,
      },
    });
  }
}

function* signUp(action: SignUpAction) {
  try {
    yield call(authRegister, action.payload.email, action.payload.password);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...defaultState,
        hasSignedUp: true,
      },
    });
  } catch (e) {
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...defaultState,
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
    const { email, password, code } = action.payload;

    if (code) {
      yield call(confirmation, email, code);
    }

    let user = yield call(authSignIn, email, password);
    user = yield call(getLocalUser);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        isSignedIn: true,
        isConfirmed: true,
        info: user,
      },
    });
  } catch (e) {
    if (e.code === 'UserNotConfirmedException') {
      yield put({
        type: 'AWS_COGNITO_SET_STATE',
        payload: { isConfirmed: false, error: e },
      });
    } else {
      yield put({
        type: 'AWS_COGNITO_SET_STATE',
        payload: { isConfirmed: true, error: e },
      });
    }
  }
}

// eslint-disable-next-line no-unused-vars
function* init(action: InitAction): Generator<IOEffect, *, *> {
  yield put({
    type: 'AWS_COGNITO_SET_STATE',
    payload: {
      ...defaultState,
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
