// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPtTZ1EwFhhONXPC54147tDSjiJdQtXz4",
  authDomain: "power-hack-df694.firebaseapp.com",
  projectId: "power-hack-df694",
  storageBucket: "power-hack-df694.appspot.com",
  messagingSenderId: "245907645805",
  appId: "1:245907645805:web:fa92163a17c18510e5a664",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
