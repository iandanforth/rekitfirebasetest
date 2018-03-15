// Summary:
//   This is the entry of the application, works together with index.html.

import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import * as  firebaseui from 'firebaseui';
import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

const store = configStore();

const config = {
  apiKey: 'AIzaSyDCNtlnV3_ulQuqPtxsSxFHLtzIJzrWHA8',
  authDomain: 'chattest-7c6b0.firebaseapp.com',
  databaseURL: 'https://chattest-7c6b0.firebaseio.com',
  projectId: 'chattest-7c6b0',
  storageBucket: 'chattest-7c6b0.appspot.com',
  messagingSenderId: '538646278044',
};
firebase.initializeApp(config);

// Get Firebase DB
const database = firebase.database();
database.ref('foo').on('value', (snapshot) => {
  console.log(snapshot.val());
});
database.ref('foo').set('bar');

setInterval(() => {
  database.ref('foo').set(Math.random());
}, 1000);

function renderApp(app) {
  render(<AppContainer>{app}</AppContainer>, document.getElementById('react-root'));
}

renderApp(<Root store={store} routeConfig={routeConfig} />);

// Hot Module Replacement API
/* istanbul ignore if  */
if (module.hot) {
  module.hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
  });
}
