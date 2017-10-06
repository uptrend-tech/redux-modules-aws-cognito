// @flow

// /**
//  * This function says hello.
//  * @param name Some name to say hello for.
//  * @returns The hello.
//  */
// const sayHello = (name: string = 'Haz'): string => `Hello, ${name}!`;

// export default sayHello;
import * as config from 'aws-cognito-promises';

import sagas from './sagas';

import * as action from './actions';
// import * as state from './states';
import * as reducer from './reducer';

export {
  config,
  sagas,
  action,
  // state,
  reducer,
};
