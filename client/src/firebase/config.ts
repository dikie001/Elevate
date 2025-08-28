// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8EYGHDWgmR4maYQw_f1wpCDyTQe_uwTY",
  authDomain: "elevate-92f33.firebaseapp.com",
  projectId: "elevate-92f33",
  storageBucket: "elevate-92f33.firebasestorage.app",
  messagingSenderId: "349619041730",
  appId: "1:349619041730:web:e1e371650d3937b8bb925b",
  measurementId: "G-T3D591MKZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
