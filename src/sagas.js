// @flow

import { call, put, takeLatest } from 'redux-saga/effects';

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
  State,
  ConfirmRegistrationAction,
  ConfirmRegistrationPayload,
  InitAction,
  LogInAction,
  LogInPayload,
  LogOutAction,
  SetStateAction,
  SignUpAction,
  SignUpPayload,
  SignedInAction,
} from './types';

import { defaultState } from './actions';

// export function* createResource(api, { data }, { resource, thunk }) {
//   try {
//     // https://github.com/diegohaz/arc/wiki/API-service
//     const detail = yield call([api, api.post], `/${resource}`, data);
//     // https://github.com/diegohaz/arc/wiki/Actions#async-actions
//     yield put(actions.resourceCreateSuccess(resource, detail, { data }, thunk));
//   } catch (e) {
//     yield put(actions.resourceCreateFailure(resource, e, { data }, thunk));
//   }
// }

// export function* readResourceList(api, { params }, { resource, thunk }) {
//   try {
//     const list = yield call([api, api.get], `/${resource}`, { params });
//     yield put(
//       actions.resourceListReadSuccess(resource, list, { params }, thunk),
//     );
//   } catch (e) {
//     yield put(actions.resourceListReadFailure(resource, e, { params }, thunk));
//   }
// }

// export function* readResourceDetail(api, { needle }, { resource, thunk }) {
//   try {
//     const detail = yield call([api, api.get], `/${resource}/${needle}`);
//     yield put(
//       actions.resourceDetailReadSuccess(resource, detail, { needle }, thunk),
//     );
//   } catch (e) {
//     yield put(
//       actions.resourceDetailReadFailure(resource, e, { needle }, thunk),
//     );
//   }
// }

// export function* updateResource(api, { needle, data }, { resource, thunk }) {
//   try {
//     const detail = yield call([api, api.put], `/${resource}/${needle}`, data);
//     yield put(
//       actions.resourceUpdateSuccess(resource, detail, { needle, data }, thunk),
//     );
//   } catch (e) {
//     yield put(
//       actions.resourceUpdateFailure(resource, e, { needle, data }, thunk),
//     );
//   }
// }

// export function* deleteResource(api, { needle }, { resource, thunk }) {
//   try {
//     yield call([api, api.delete], `/${resource}/${needle}`);
//     yield put(actions.resourceDeleteSuccess(resource, { needle }, thunk));
//   } catch (e) {
//     yield put(actions.resourceDeleteFailure(resource, e, { needle }, thunk));
//   }
// }

// export function* watchResourceCreateRequest(api) {
//   while (true) {
//     const { payload, meta } = yield take(actions.RESOURCE_CREATE_REQUEST);
//     yield call(createResource, api, payload, meta);
//   }
// }

// export function* watchResourceListReadRequest(api) {
//   while (true) {
//     const { payload, meta } = yield take(actions.RESOURCE_LIST_READ_REQUEST);
//     yield call(readResourceList, api, payload, meta);
//   }
// }

// export function* watchResourceDetailReadRequest(api) {
//   while (true) {
//     const { payload, meta } = yield take(actions.RESOURCE_DETAIL_READ_REQUEST);
//     yield call(readResourceDetail, api, payload, meta);
//   }
// }

// export function* watchResourceUpdateRequest(api) {
//   while (true) {
//     const { payload, meta } = yield take(actions.RESOURCE_UPDATE_REQUEST);
//     yield call(updateResource, api, payload, meta);
//   }
// }

// export function* watchResourceDeleteRequest(api) {
//   while (true) {
//     const { payload, meta } = yield take(actions.RESOURCE_DELETE_REQUEST);
//     yield call(deleteResource, api, payload, meta);
//   }
// }

// export default function*({ api }) {
//   yield fork(watchResourceCreateRequest, api);
//   yield fork(watchResourceListReadRequest, api);
//   yield fork(watchResourceDetailReadRequest, api);
//   yield fork(watchResourceUpdateRequest, api);
//   yield fork(watchResourceDeleteRequest, api);
// }

// auth is stateless. Each call to a auth action resets all state
let defaultState = {
  info: {},
  error: {},
  isSignedIn: states.AUTH_UNKNOWN,
  isConfirmed: states.AUTH_UNKNOWN,
  hasSignedUp: states.AUTH_UNKNOWN,
};

function* signedIn() {
  try {
    yield call(getSession);
    let user = config.getUser();
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...defaultState,
        isSignedIn: states.AUTH_SUCCESS,
        isConfirmed: states.AUTH_SUCCESS,
        info: user,
      },
    });
  } catch (e) {
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...defaultState,
        error: {},
      },
    });
  }
}

function* signUp(action) {
  try {
    yield call(authRegister, action.payload.username, action.payload.password);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        ...defaultState,
        hasSignedUp: states.AUTH_SUCCESS,
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

function* logOut() {
  try {
    yield call(authSignOut);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: { isSignedIn: states.AUTH_FAIL },
    });
  } catch (e) {
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: { error: e, isSignedIn: states.AUTH_FAIL },
    });
  }
}

function* logIn(action) {
  try {
    const { username, password, code } = action.payload;

    if (code) {
      yield call(confirmation, username, code);
    }
    let user = yield call(authSignIn, username, password);
    user = yield call(getLocalUser);
    yield put({
      type: 'AWS_COGNITO_SET_STATE',
      payload: {
        isSignedIn: states.AUTH_SUCCESS,
        isConfirmed: states.AUTH_SUCCESS,
        info: user,
      },
    });
  } catch (e) {
    if (e.code === 'UserNotConfirmedException') {
      yield put({
        type: 'AWS_COGNITO_SET_STATE',
        payload: { isConfirmed: states.AUTH_FAIL, error: e },
      });
    } else {
      yield put({
        type: 'AWS_COGNITO_SET_STATE',
        payload: { isConfirmed: states.AUTH_SUCCESS, error: e },
      });
    }
  }
}

function* init(api, action: InitAction): Generator<IOEffect, *, *> {
  yield put({
    type: 'AWS_COGNITO_SET_STATE',
    payload: {
      ...defaultState,
    },
  });
}

export default function* sagas({ api }) {
  yield takeLatest(
    'AWS_COGNITO_CONFIRM_REGISTRATION',
    confirmRegistration,
    api,
  );
  yield takeLatest('AWS_COGNITO_INIT', init, api);
  yield takeLatest('AWS_COGNITO_LOG_IN', logIn, api);
  // yield takeLatest('AWS_COGNITO_LOG_OUT', logOut, api);
  // yield takeLatest('AWS_COGNITO_SET_STATE', setState, api);
  yield takeLatest('AWS_COGNITO_SIGNED_IN', signedIn, api);
  yield takeLatest('AWS_COGNITO_SIGN_UP', signUp, api);
  // yield takeLatest(actions.AUTH_SIGN_UP, signUp, api);
  // yield takeLatest(actions.AUTH_SIGN_IN, signIn, api);
  // yield takeLatest(actions.AUTH_SIGN_OUT, signOut, api);
  // yield takeLatest(actions.AUTH_SIGNED_IN, signedIn, api);
  // yield takeLatest(actions.AUTH_INIT, init, api);
}

// export default function*({ api }) {
//   yield fork(watchResourceCreateRequest, api);
//   yield fork(watchResourceListReadRequest, api);
//   yield fork(watchResourceDetailReadRequest, api);
//   yield fork(watchResourceUpdateRequest, api);
//   yield fork(watchResourceDeleteRequest, api);
// }
