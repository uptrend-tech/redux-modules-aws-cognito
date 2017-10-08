import { Config } from 'aws-sdk';

// eslint-disable-next-line no-unused-vars
export default function(email, code) {
  return new Promise((resolve, reject) => {
    Config.credentials.refresh(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
