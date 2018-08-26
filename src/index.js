import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import firebase from 'firebase';







  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB65Gim5cFe_ZS_Sb_3XsjZ77jvU693ZWA",
    authDomain: "todo-list-d3fbe.firebaseapp.com",
    databaseURL: "https://todo-list-d3fbe.firebaseio.com",
    projectId: "todo-list-d3fbe",
    storageBucket: "todo-list-d3fbe.appspot.com",
    messagingSenderId: "1033118177235"
  };
  firebase.initializeApp(config);
  





ReactDOM.render(<App />, document.getElementById('root'));
