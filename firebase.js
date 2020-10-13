import * as firebase from 'firebase';
import 'firebase/auth';
import "firebase/database";
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ2qzYtj2CNHcUW4T2OMKOCEY784SfEFg",
  authDomain: "nph-scheduler.firebaseapp.com",
  databaseURL: "https://nph-scheduler.firebaseio.com",
  projectId: "nph-scheduler",
  storageBucket: "nph-scheduler.appspot.com",
  messagingSenderId: "686142316662",
  appId: "1:686142316662:web:00763774c645198fbbff57",
  measurementId: "G-YS8LNZRCPF"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
