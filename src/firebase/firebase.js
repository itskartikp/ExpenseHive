import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyA06k7E9XBfBQrMkNSsLEMpd3J15k-DqBE",
    authDomain: "money-tracker-4bab4.firebaseapp.com",
    databaseURL: "https://money-tracker-4bab4-default-rtdb.firebaseio.com",
    projectId: "money-tracker-4bab4",
    storageBucket: "money-tracker-4bab4.appspot.com",
    messagingSenderId: "740476440427",
    appId: "1:740476440427:web:ef6300c2f835bf1873062e"
  };
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db };
