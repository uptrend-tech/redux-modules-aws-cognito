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
  ActionLogIn,
  ActionLogOut,
  ActionSignUp,
  ActionLoadSession,
} from './types';

import * as actions from './actions';

// eslint-disable-next-line no-unused-vars
function* loadSession(action: ActionLoadSession) {
  try {
    yield put(actions.setState({ isAuthenticating: true }));

    yield call(getSession);

    const user = config.getUser();

    yield put(
      actions.resetState({
        isAuthenticating: false,
        isConfirmed: true,
        isSignedIn: true,
        info: user,
      }),
    );
  } catch (e) {
    // not signed in
    yield put(actions.resetState());
  }
}

function* signUp(action: ActionSignUp) {
  try {
    const { email, password, locale, phoneNumber } = action.payload;

    yield call(authRegister, email, password, locale, phoneNumber);

    yield put(actions.setState({ hasSignedUp: true }));
  } catch (e) {
    yield put(actions.resetState({ error: e }));
  }
}

// eslint-disable-next-line no-unused-vars
function* logOut(action: ActionLogOut) {
  try {
    yield call(authSignOut);
  } catch (e) {
    yield put(actions.resetState({ error: e }));
  }
}

function* logIn(action: ActionLogIn) {
  try {
    const { email, password, code } = action.payload;
    console.log('saga:logIn', { email, password, code }, { action });

    if (code) {
      yield call(confirmation, email, code);
    }

    let user = yield call(authSignIn, email, password);
    user = yield call(getLocalUser);
    yield put(actions.logInSuccess({ info: user }));
  } catch (e) {
    console.trace(e);
    if (
      e.code === 'UserNotConfirmedException' ||
      e.code === 'CodeMismatchException'
    ) {
      yield put(
        actions.logInFailed({
          hasSignedUp: true,
          isConfirmed: false,
          needConfirmCode: true,
          error: e,
        }),
      );
    } else {
      yield put(
        actions.logInFailed({
          needConfirmCode: false,
          isConfirmed: true,
          error: e,
        }),
      );
    }
  }
}

export default function*(): Generator<IOEffect, *, *> {
  // yield takeLatest('@@awsCognito/CONFIRM_REGISTRATION', confirmRegistration);
  yield takeLatest('@@awsCognito/LOG_IN', logIn);
  yield takeLatest('@@awsCognito/LOG_OUT', logOut);
  yield takeLatest('@@awsCognito/SIGNED_IN', loadSession);
  yield takeLatest('@@awsCognito/SIGN_UP', signUp);
}
