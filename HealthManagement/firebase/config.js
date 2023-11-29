import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDR4kchc1HsFMuU6MSB_dmez2pfR_R9uec",
    authDomain: "littlelove-be349.firebaseapp.com",
    projectId: "littlelove-be349",
    storageBucket: "littlelove-be349.appspot.com",
    messagingSenderId: "1077778025794",
    appId: "1:1077778025794:web:27716236831daea9914cdb"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };