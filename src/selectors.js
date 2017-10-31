// @flow

import R from 'ramda';
import { createSelector } from 'reselect';

import type { State } from './types';

export const initialState: State = {
  info: {},
  error: {},
  hasSignedUp: false,
  isAuthenticating: false,
  isConfirmed: false,
  isAuthenticated: false,
  needConfirmCode: false,
  needMFA: false,
  needNewPassword: false,
};

export const cognitoState = (state: { cognito: State }): State => state.cognito;

export const isAuthenticating = createSelector(
  [cognitoState],
  (state: State = initialState) => state.isAuthenticating,
);

export const isAuthenticated = createSelector(
  [cognitoState],
  (state: State = initialState) => state.isAuthenticated,
);

export const isConfirmed = createSelector(
  [cognitoState],
  (state: State = initialState) => state.isConfirmed,
);

export const hasSignedUp = createSelector(
  [cognitoState],
  (state: State = initialState) => state.hasSignedUp,
);

export const needConfirmCode = createSelector(
  [cognitoState],
  (state: State = initialState) => state.needConfirmCode,
);

export const info = createSelector(
  [cognitoState],
  (state: State = initialState) => state.info,
);

export const pool = createSelector([info], R.path(['pool']));

export const poolClientId = createSelector([pool], R.path(['clientId']));

export const poolStorage = createSelector([pool], R.path(['storage']));

// TODO remove this redux state example after loadSession works
// info>pool:
//   clientId: '138ht23c7buko7j9ql2260kq1k',
//   storage: {
//       'CognitoIdentityServiceProvider.138ht23c7buko7j9ql2260kq1k.LastAuthUser': 'dcafec8f-021c-432a-8ac9-8348007ee2a1',
//       'CognitoIdentityServiceProvider.138ht23c7buko7j9ql2260kq1k.dcafec8f-021c-432a-8ac9-8348007ee2a1.accessToken': 'eyJraWQiOiJzbGZ3OFJqWWVnZzkxbU5oNkVORjdCMXVyM1dQYUlubWp3MFJNM3lhZHR3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkY2FmZWM4Zi0wMjFjLTQzMmEtOGFjOS04MzQ4MDA3ZWUyYTEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfYU5kUDlyZkhPIiwiZXhwIjoxNTA3OTM2Nzc3LCJpYXQiOjE1MDc5MzMxNzcsImp0aSI6IjllOTAxMDdiLTY3N2UtNDhjNi04ODMyLWNkN2Q2NDk1ZWZlMyIsImNsaWVudF9pZCI6IjEzOGh0MjNjN2J1a283ajlxbDIyNjBrcTFrIiwidXNlcm5hbWUiOiJkY2FmZWM4Zi0wMjFjLTQzMmEtOGFjOS04MzQ4MDA3ZWUyYTEifQ.fAoCFkL2QSCcPPzWn6ovrJVaeVI87FbT8WZDhOuG4WMsF3foKTbSU_ONOZM1D47OqYuTGokMEDqxfuaru6RMtSjYtkASVzT9_hLZ0RZ6324-Ql-JwUELyONtNhd6ZPl-E5EBudnmhHfMPgpGOhzA3lypUJRJ56UgJ7zXp8ye--YoQcSClAMKnIHfUeCk2AqbfnlizS2QvaBlxvXKD0VW3vviXlsRwvWjVLz6rlXEPzUqajeMfYfmrkFaPi8jUvCM05AZvMChfErHTy33uwLtV0VZxPZE_GmiICWKUAv6ahzZQcPDl3YuFef1HrYMom0G5Aw_GHjSKf-XjycS3UvyqQ',
//       'CognitoIdentityServiceProvider.138ht23c7buko7j9ql2260kq1k.dcafec8f-021c-432a-8ac9-8348007ee2a1.idToken': 'eyJraWQiOiJ1Y1BQNWJzK1hkc0dGZXUyYTNsK3VCWnhkYXJNdW1vWStYMWJhWGtmVlJzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkY2FmZWM4Zi0wMjFjLTQzMmEtOGFjOS04MzQ4MDA3ZWUyYTEiLCJhdWQiOiIxMzhodDIzYzdidWtvN2o5cWwyMjYwa3ExayIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUwNzkzMzE3NywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfYU5kUDlyZkhPIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImRjYWZlYzhmLTAyMWMtNDMyYS04YWM5LTgzNDgwMDdlZTJhMSIsImV4cCI6MTUwNzkzNjc3NywibG9jYWxlIjoiZW4tVVMiLCJpYXQiOjE1MDc5MzMxNzcsImVtYWlsIjoiYnJhbmRvbkBvbXQudGVjaCJ9.jCG7UXS3Z8OhMw1Leq6Jn2Y1-Ay1vCeCD5EboBFhmiduHyDfiEa6YLfWAjiJB61LQwPqUecBfNc9NV2Qc0OQT84dPOIIcgU5PDHTOkX0fSLJxWA4Kxqt2v7A8925Hu8GywS9cw3wtCNSxgRVFtq7WoOHEiaaLdOXf588CdOA-xNWnc2O1zzbAoC6AyNZycChZDEfGrx5myNtGkmItDevvEQ0szUllxVN_to82LA3H_P0O0HOQCVPdpGP7SKYaAyPTDBSn4ZpVVs8Rit8a_zse3mHaekIXmBDO8uJV3VCu5m2Lm5869pc7lUtswnJWSyKVLyJ52AaJXZwH_IAj2PVFw',
//       'CognitoIdentityServiceProvider.138ht23c7buko7j9ql2260kq1k.dcafec8f-021c-432a-8ac9-8348007ee2a1.refreshToken': 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.kt9t3wuaYDmnzB8wORNTRqq_LQaA6ZkMq-sydJPexsAwSOIzT9F2lVzUcG30i__87mNvLzf1v8LeKcmSP5tPEtuNLgwlsNw4-8cEgToi_8axvbPRKPO-5WIXajBFIrtJUbwA3BSVKtgfoNvoXYGyBjYJiSsmKHn3uDRqmmMUdA0lVU5ftJxUvINg732o6QlCiiYqGHqmWhW2UEOyjuYPpjvaQPmkOn9sCh9JNUl0CURtUX19iEg19iID8Luy9g4vogRYtvSG-v-DlkjbD4oZjbbcTdNWyeTa5uejvAiOj7C0p5vAFbnkqQEOwit526keMH11nTbbd1xVmsRrzVt2xQ.HvlO5pfuuLVRIu9n.oZaHOt3ds80_zy2e9WbaUsQCj3kwxnwhad3_MZKLqnVd8SWPYahZ2LvWVWUwOLZCPN43rI8KBhXgaKNhZ4-obhlgvwwi4PvD8KbNl77e0rtWwK6OP7oSiS72ACVrvq0lyOy5bt01ZJlq8cm9D8Ezxiuwl1YwzkSQOlj9_A2X8UEHmjF1fFHXvfF-w6YxEYvuCjTTAcLzNIztHSF7DhA4laVsAoCv6vlUoBGiSyktqPLFA30QbUFg4VjCFAUBwKJa0j6cGUsU5Wpk6-vXIQahc4osvpxQr8uMCIvgnXaYMiyAaBGddImOvJA6dw6Q5svNvE0bPYGf-RLBCwgfj99T9t6A2neum2zJzt4M6RI3Gdf-1Zea21WtNIDJil69Rwx_WoSrIdhRYFgTWwWwiGfM9cwFVAE9xcwgJfdYPmxtbKGRR8AnPofMATeE8CB6wjwazvaOLbnXTPdtWPF6WaIuIifaPsTB2wnOfCjk67OW3iMf6IGpAOOk-j1lkjpSi32LYS_WqYPEMHU8Eflq5E8P4vtwIuLQPuq4oMZjCbip15TYEGMDBAEFkAKHvW19tgYB2DrX7CR1AaFnQt6P0zSxXHrZ3W_8XXbFSfai3ryfbfcihrdmcS4wEpz7QAetl6vnKSQWFynwFnhJQHQ-kurkRBpexpvFFlhORnkhNSc0EAqG5zvmgcVo7fichi1vK0zwQyC--wj62GSeNidJZ2-8fbACrezFcj5JQi_114-xGwTlEchQBVyGPuCoMN9U6cn6eIkTRVT7FH37x3DptA_4kzp07Cwg3D6hWFCL2D6JeBVlUSxVl4qvpyZNOVjFq7ZaIVdfPXQ4aJHgjsDdW8ftS7ooS7Da-3l5XwULbNOlwT-T3vdWrmhWM5jzaGEdVlk45hMw7WYXKMjajuzvPO8_KIfJJlu-fzF-lDlL7YoAblR4Duk2sh-yTEi3eUyxRBhXBfVXvERAsbAkMgyz0vrKJqbkiUv3ohh9FL9DzyvuHDLiG_-Pmc5a1eEamWd1Xg_67wW9OSwkZ3YssZ-1c1Tb9UVuZ8PADqbikATuN2IWKy9vP-rkhn6Mtj-cpGcFLuTebu4jziq5b5DMf1V6JLDfaXKlP5P24j5Ux8Ve_kYXo_FAjcjaxCKpum37z4Rnr7StvTGLhPlplFemVipZkvn9rYcGUwV_U2tDV4wnsSGqRUHs_GKPuQirewcJ.Y6xQZ20gadB_ADd2eT4Bew',
//       loglevel: 'INFO',
//       rides_auth_token: 'null',
//       rides_tenant_id: 'null'
//     }

export const poolStorageClientIdKeyPrefix = createSelector(
  [poolClientId],
  clientId => `CognitoIdentityServiceProvider.${clientId}`,
);

export const lastAuthUser = createSelector(
  [poolStorage, poolStorageClientIdKeyPrefix],
  (storage, keyPrefix) => R.path([`${keyPrefix}.LastAuthUser`])(storage),
);

export const poolStorageLastAuthUserKeyPrefix = createSelector(
  [poolStorageClientIdKeyPrefix, lastAuthUser],
  (keyPrefix, username) => `${keyPrefix}.${username}`,
);

/**
 * LAST AUTH USER TOKENS
 **/
export const lastAuthUserAccessToken = createSelector(
  [poolStorage, poolStorageLastAuthUserKeyPrefix],
  (storage, keyPrefix) => R.path([`${keyPrefix}.accessToken`])(storage),
);

export const lastAuthUserIdToken = createSelector(
  [poolStorage, poolStorageLastAuthUserKeyPrefix],
  (storage, keyPrefix) => R.path([`${keyPrefix}.idToken`])(storage),
);

export const lastAuthUserRefreshToken = createSelector(
  [poolStorage, poolStorageLastAuthUserKeyPrefix],
  (storage, keyPrefix) => R.path([`${keyPrefix}.refreshToken`])(storage),
);

export const user = createSelector([info], info => info.user);

export const showConfirm = createSelector([user], user => user);

/**
 * USER SESSION
 **/
export const userSession = createSelector(
  [info],
  info => info.signInUserSession,
);

/**
 * USER SESSION TOKENS
 **/
export const userSessionAccessToken = createSelector(
  [userSession],
  userSession =>
    userSession && userSession.accessToken && userSession.accessToken.jwtToken,
);

export const userSessionIdToken = createSelector(
  [userSession],
  userSession =>
    userSession && userSession.idToken && userSession.idToken.jwtToken,
);

export const userSessionRefreshToken = createSelector(
  [userSession],
  userSession =>
    userSession && userSession.refreshToken && userSession.refreshToken.token,
);

/**
 * DEFAULT SESSION TOKENS
 *
 * NOTE setting this up to return userSession tokens if available and then return
 *      lastAuthUser tokens if not.
 *
 * NOTE for now I am using what is in storage pool until I understand how to
 *      properly use tokens in different scenarios (loading session from local
 *      storage & logging in)
 **/
export const userAccessToken = createSelector(
  [userSessionAccessToken, lastAuthUserAccessToken],
  (userSessionToken, lastAuthToken) => userSessionToken || lastAuthToken,
);

export const userIdToken = createSelector(
  [userSessionIdToken, lastAuthUserIdToken],
  (userSessionToken, lastAuthToken) => userSessionToken || lastAuthToken,
);

export const userRefreshToken = createSelector(
  [userSessionRefreshToken, lastAuthUserRefreshToken],
  (userSessionToken, lastAuthToken) => userSessionToken || lastAuthToken,
);

export const userTokens = createSelector(
  [userAccessToken, userRefreshToken, userIdToken],
  (accessToken, refreshToken, idToken) => ({
    accessToken,
    refreshToken,
    idToken,
  }),
);

export const error = createSelector(
  [cognitoState],
  (state: State = initialState) => state.error,
);

export const errorMsg = createSelector([error], error => error.message);
