import { getUser } from './config';

export default function() {
  const cognitoUser = getUser();

  if (cognitoUser) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      cognitoUser.getSession(function(err, session) {
        if (err) {
          reject(err);
        } else {
          resolve(cognitoUser);
        }
      });
    });
  } else {
    throw new Error('no cognitiveUser value');
  }
}
