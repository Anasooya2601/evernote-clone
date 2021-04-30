import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDGuNXgKvo307-2Te-YgZHNmRk8yypO8mI",
    authDomain: "noteapp-479f0.firebaseapp.com",
    projectId: "noteapp-479f0",
    storageBucket: "noteapp-479f0.appspot.com",
    messagingSenderId: "79532151746",
    appId: "1:79532151746:web:3518a7406ce3f2421bbc5b",
    measurementId: "G-SZE5QCDZC5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
//const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default { projectStorage, projectFirestore};