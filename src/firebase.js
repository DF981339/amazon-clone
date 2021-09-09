// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6EjEDwrtPiXvQdRVbibi2sKRRo57F0oM",
  authDomain: "clone-db7a6.firebaseapp.com",
  projectId: "clone-db7a6",
  storageBucket: "clone-db7a6.appspot.com",
  messagingSenderId: "942831099045",
  appId: "1:942831099045:web:7f1abcfe54dc8a65ea414c",
  measurementId: "G-H1NSFRKZKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
