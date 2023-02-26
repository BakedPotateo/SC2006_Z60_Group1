import { initializeApp } from 'firebase/app';
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword , sendEmailVerification } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD2amLeLBuuQN0RbYQ2BzmSyJ8oZY8_iPg",
    authDomain: "sc2006-aa865.firebaseapp.com",
    projectId: "sc2006-aa865",
    storageBucket: "sc2006-aa865.appspot.com",
    messagingSenderId: "289945088905",
    appId: "1:289945088905:web:0be1027b446e3079bd6758",
    measurementId: "G-4P776TLCE0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore , signInWithEmailAndPassword , createUserWithEmailAndPassword , sendEmailVerification };