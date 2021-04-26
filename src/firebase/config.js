import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC1lBsXxZIKWVrTtOzNuPyYlBUH-2Ya1uM",
    authDomain: "evernoteclone-98d60.firebaseapp.com",
    projectId: "evernoteclone-98d60",
    storageBucket: "evernoteclone-98d60.appspot.com",
    messagingSenderId: "287780210690",
    appId: "1:287780210690:web:6feff5e1efcc445915ff1b",
    measurementId: "G-7XMDKB8SNS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
//const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default { projectStorage, projectFirestore};