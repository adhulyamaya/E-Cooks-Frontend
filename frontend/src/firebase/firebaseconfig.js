// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXnULZlkMEhpFCu6Y9V0-tIsQk23P-cJc",
  authDomain: "redux-38279.firebaseapp.com",
  projectId: "redux-38279",
  storageBucket: "redux-38279.appspot.com",
  messagingSenderId: "492263914667",
  appId: "1:492263914667:web:a1c7d2d0c9ec00dd7e4bee",
  measurementId: "G-CT8P4GC7MF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);