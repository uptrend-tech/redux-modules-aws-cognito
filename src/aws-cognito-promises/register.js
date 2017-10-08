import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { getUserPool } from './config';

const createUserAttribute = (name, value) => {
  return new CognitoUserAttribute({
    Name: name,
    Value: value,
  });
};

// TODO: convet this to flow type and allow array of attributes passed
export default function(email, password, locale, phoneNumber) {
  const userPool = getUserPool();

  const attributeList = [
    createUserAttribute('email', email),
    createUserAttribute('locale', locale),
    createUserAttribute('phone_number', phoneNumber),
  ];
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
