// src/firebaseconfig.tsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCTZrziR39ZJLPefCGH21E0ggqsGcngac8",
  authDomain: "fixandgo-6002c.firebaseapp.com",
  projectId: "fixandgo-6002c",
  storageBucket: "fixandgo-6002c.appspot.com",
  messagingSenderId: "944171454943",
  appId: "1:944171454943:web:e9e73004614279da8cb46a",
  measurementId: "G-T8G326J6MK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
