import firebase from "firebase";

// firebase init goes here
const config = {
  apiKey: "AIzaSyDkWeRkVZjfHTv9ejfjyw11RgyvDlYSLzI",
  authDomain: "vue-a2.firebaseapp.com",
  databaseURL: "https://vue-a2.firebaseio.com",
  projectId: "vue-a2",
  storageBucket: "vue-a2.appspot.com",
  messagingSenderId: "364630730437",
  appId: "1:364630730437:web:30e0b478fcd89860"
};
firebase.initializeApp(config);

// firebase utils
const fa = firebase.auth();
const fs = firebase.firestore();
const ff = firebase.functions();

export { fa, fs, ff };
