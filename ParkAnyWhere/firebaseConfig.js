import { initializeApp } from 'firebase/app';
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword , sendEmailVerification } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2G3gaQdkFGRz4-6xefA7UmfGOYtfPdK8",
  authDomain: "project-3065124884762541683.firebaseapp.com",
  databaseURL: "https://project-3065124884762541683-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-3065124884762541683",
  storageBucket: "project-3065124884762541683.appspot.com",
  messagingSenderId: "180866816226",
  appId: "1:180866816226:web:c80b10ea55f30cc9a6e6bb",
  measurementId: "G-M5K46RKEJK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore , signInWithEmailAndPassword , createUserWithEmailAndPassword , sendEmailVerification };