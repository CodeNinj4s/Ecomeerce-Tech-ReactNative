// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQRy4B53EZ1JFvdi0rBtrFXhNtFYd5o3E",
  authDomain: "ecomeerce-app-fe96a.firebaseapp.com",
  projectId: "ecomeerce-app-fe96a",
  storageBucket: "ecomeerce-app-fe96a.appspot.com",
  messagingSenderId: "784715387338",
  appId: "1:784715387338:web:89477e73f0868fc63f7f33",
  measurementId: "G-NG7Z51X0XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();