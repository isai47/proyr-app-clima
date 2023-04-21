// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfg8Xi4YCAPupuU_oG8y2Mx0XCtWza49o",
  authDomain: "proyr-64eb3.firebaseapp.com",
  projectId: "proyr-64eb3",
  storageBucket: "proyr-64eb3.appspot.com",
  messagingSenderId: "998728872457",
  appId: "1:998728872457:web:8b10b7a95b04696fc37ed8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)