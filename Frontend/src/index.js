import React from 'react';
import ReactDOM from 'react-dom';
import App1 from './App1';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
 
  <App1/>,
 
  document.getElementById('root')
);

serviceWorker.unregister();

