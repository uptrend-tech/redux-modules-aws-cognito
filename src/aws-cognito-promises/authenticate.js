import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import { getUserPool } from './config';

class LogInRequireNewPasswordError extends Error {
  constructor(message, userAttributes, requiredAttributes) {
    super(message);
    this.message = message;
    this.name = 'LogInRequireNewPasswordError';
    this.userAttributes = userAttributes;
    this.requiredAttributes = requiredAttributes;
  }
}

export default function(username, password) {
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: getUserPool(),
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        resolve(result);
      },

      onFailure: function(err) {
        reject(err);
      },

      mfaRequired: function(codeDeliveryDetails) {
        console.log('cognito::authenticateUser::mfaRequired', {
          codeDeliveryDetails,
        });
        reject(codeDeliveryDetails);

        // brandon.orther@gmail.com
        // // MFA is required to complete user authentication.
        // // Get the code from user and call
        // cognitoUser.sendMFACode(mfaCode, this);
      },

      newPasswordRequired: function(userAttributes, requiredAttributes) {
        console.log('cognito::authenticateUser::newPasswordRequired', {
          userAttributes,
          requiredAttributes,
        });
        reject(
          new LogInRequireNewPasswordError(
            'Log in requires new password.',
            userAttributes,
            requiredAttributes,
          ),
        );

        // reject({ userAttributes, requiredAttributes });
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // // the api doesn't accept this field back
        // delete userAttributes.email_verified;

        // // Get these details and call
        // cognitoUser.completeNewPasswordChallenge(
        //   newPassword,
        //   userAttributes,
        //   this,
        // );
      },
    });
  });
}
