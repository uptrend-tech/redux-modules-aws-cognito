import { getUser } from './config';

const signOut = (): Promise => {
  const cognitoUser = getUser();

  if (cognitoUser) {
    cognitoUser.signOut();
    Promise.resolve();
  } else {
    throw new Error('no cognitiveUser value');
  }
};

export default signOut;
