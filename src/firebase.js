// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6kHcLaFuDKeBw21aGBUCWWCLlizhMb18",
  authDomain: "ecom-6cea5.firebaseapp.com",
  projectId: "ecom-6cea5",
  storageBucket: "ecom-6cea5.appspot.com",
  messagingSenderId: "7496200751",
  appId: "1:7496200751:web:707f435dd28a809dd78cda",
  measurementId: "G-LYCHF8Q1FH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);