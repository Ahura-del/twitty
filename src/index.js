import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactPWAInstallProvider from "react-pwa-install";
<<<<<<< HEAD
import {Provider} from 'react-redux'
import Store from './Redux/Store'

=======
// import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import Store from './Redux/Store'
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c
ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>
  <Provider store={Store}>
    <App />
  </Provider>
   </ReactPWAInstallProvider>
,
  document.getElementById('root')
);

<<<<<<< HEAD
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/sw.js`)
    .then(function() {
      console.log('Service worker registered!');
    })
    .catch(() => console.log('pwa not regester'))
}
=======
// serviceWorker.register()
// serviceWorker.register()
>>>>>>> 6e2390bb7d1e2b70867e7767bda3586d8740f61c

