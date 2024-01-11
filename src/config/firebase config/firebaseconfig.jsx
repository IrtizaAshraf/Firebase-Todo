// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC-bYKIdgbc2SxY1Tf46DZ4xkXRfsVGf34",
  authDomain: "todo-react-2c371.firebaseapp.com",
  projectId: "todo-react-2c371",
  storageBucket: "todo-react-2c371.appspot.com",
  messagingSenderId: "472937256527",
  appId: "1:472937256527:web:bff8d958318b971dc67c3a",
  measurementId: "G-7122DGQJN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAnalytics(app);