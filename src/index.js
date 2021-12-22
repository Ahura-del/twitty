import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactPWAInstallProvider from "react-pwa-install";
import {Provider} from 'react-redux'
import Store from './Redux/Store'

ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>
  <Provider store={Store}>
    <App />
  </Provider>
   </ReactPWAInstallProvider>
,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/sw.js`)
    .then(function() {
      console.log('Service worker registered!');
    })
    .catch(() => console.log('pwa not regester'))
}

