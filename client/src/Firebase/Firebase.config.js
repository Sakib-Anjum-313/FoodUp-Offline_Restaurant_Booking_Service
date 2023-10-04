// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANKeKqxMDcmvuYqnCbV9sbyHCEXWZ-NaE",
  authDomain: "foodup-admin-panel.firebaseapp.com",
  projectId: "foodup-admin-panel",
  storageBucket: "foodup-admin-panel.appspot.com",
  messagingSenderId: "154079830166",
  appId: "1:154079830166:web:10ba8e471b5569266322b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
