// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDoR0b-ciokcTIZR4h-yWa4Ni97C53_chg",
  authDomain: "kim-ltd.firebaseapp.com",
  projectId: "kim-ltd",
  storageBucket: "kim-ltd.firebasestorage.app",
  messagingSenderId: "221789065078",
  appId: "1:221789065078:web:1979b8a7378fe467e87457",
  measurementId: "G-EBXXFH3C58"
};


const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const db = getFirestore(app);

