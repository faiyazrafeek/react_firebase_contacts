import firebase from 'firebase/app';
import'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCGpEncMuZjK4RnBLrT0r96SkjgtOuE5Q4",
    authDomain: "react-fa-share.firebaseapp.com",
    databaseURL: "https://react-fa-share-default-rtdb.firebaseio.com",
    projectId: "react-fa-share",
    storageBucket: "react-fa-share.appspot.com",
    messagingSenderId: "803708143799",
    appId: "1:803708143799:web:ae902e1ebd626f1686a532"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();