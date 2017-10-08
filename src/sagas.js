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

import * as actions from './actions';

// eslint-disable-next-line no-unused-vars
function* signedIn(action: SignedInAction) {
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

function* signUp(action: SignUpAction) {
  try {
    const { email, password, locale, phoneNumber } = action.payload;

    yield call(authRegister, email, password, locale, phoneNumber);

    yield put(actions.setState({ hasSignedUp: true }));
  } catch (e) {
    yield put(actions.resetState({ error: e }));
  }
}

// eslint-disable-next-line no-unused-vars
function* logOut(action: LogOutAction) {
  try {
    yield call(authSignOut);
  } catch (e) {
    yield put(actions.resetState({ error: e }));
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
    yield put(
      actions.setState({
        isAuthenticating: false,
        isConfirmed: true,
        isSignedIn: true,
        needConfirmCode: false,
        info: user,
      }),
    );
  } catch (e) {
    if (
      e.code === 'UserNotConfirmedException' ||
      e.code === 'CodeMismatchException'
    ) {
      yield put(
        actions.setState({
          isAuthenticating: false,
          hasSignedUp: true,
          isConfirmed: false,
          needConfirmCode: true,
          error: e,
        }),
      );
    } else {
      yield put(
        actions.setState({
          isAuthenticating: false,
          needConfirmCode: false,
          isConfirmed: true,
          error: e,
        }),
      );
    }
  }
}

// eslint-disable-next-line no-unused-vars
function* init(action: InitAction): Generator<IOEffect, *, *> {
  yield put(actions.resetState());
}

export default function*(): Generator<IOEffect, *, *> {
  // yield takeLatest('AWS_COGNITO_CONFIRM_REGISTRATION', confirmRegistration);
  yield takeLatest('AWS_COGNITO_INIT', init);
  yield takeLatest('AWS_COGNITO_LOG_IN', logIn);
  yield takeLatest('AWS_COGNITO_LOG_OUT', logOut);
  yield takeLatest('AWS_COGNITO_SIGNED_IN', signedIn);
  yield takeLatest('AWS_COGNITO_SIGN_UP', signUp);
}
