import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyBe855D_ybDKjiFgGLjrtgx72I-3uk4Gkc",
  authDomain: "mec-crew.firebaseapp.com",
  databaseURL: "https://mec-crew.firebaseio.com",
  projectId: "mec-crew",
  storageBucket: "mec-crew.appspot.com",
  messagingSenderId: "1032977291296"
};
var fire = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;