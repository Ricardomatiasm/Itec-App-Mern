import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';



firebase.initializeApp({
    apiKey: "AIzaSyAv6WklRpEl8KoAJQI9y-lz1iuMoBkh548",
    authDomain: "robotica-web.firebaseapp.com",
    databaseURL: "https://robotica-web.firebaseio.com",
    projectId: "robotica-web",
    storageBucket: "robotica-web.appspot.com",
    messagingSenderId: "658285595843"
});

ReactDOM.render(<Router>
    <App />
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
