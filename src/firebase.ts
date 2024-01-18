// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcUn_lNb8OOQWoRsYj8ELSTMjxbl73yFE",
  authDomain: "nwitter-reloaded-7c1fb.firebaseapp.com",
  projectId: "nwitter-reloaded-7c1fb",
  storageBucket: "nwitter-reloaded-7c1fb.appspot.com",
  messagingSenderId: "706763719765",
  appId: "1:706763719765:web:022a8899a4db5ffb52c0dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
