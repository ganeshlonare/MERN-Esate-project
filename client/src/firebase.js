// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b4bbb.firebaseapp.com",
  projectId: "mern-estate-b4bbb",
  storageBucket: "mern-estate-b4bbb.appspot.com",
  messagingSenderId: "323251890269",
  appId: "1:323251890269:web:8cb54e640fdbddea9f05b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);