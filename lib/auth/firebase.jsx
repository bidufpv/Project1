// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyDERJahENv1NUMXur21a1EOJipmM7sWnTE",
  authDomain: "project-1-601f7.firebaseapp.com",
  projectId: "project-1-601f7",
  storageBucket: "project-1-601f7.firebasestorage.app",
  messagingSenderId: "1044493280341",
  appId: "1:1044493280341:web:ebb96fffea4b24807620dc",
  measurementId: "G-SFFBXRWT6V"
};




// Initialize Firebase
const app =  !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const analytics = isSupported().then((yes)=>yes ? getAnalytics(app) : null);

export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = app.storage();