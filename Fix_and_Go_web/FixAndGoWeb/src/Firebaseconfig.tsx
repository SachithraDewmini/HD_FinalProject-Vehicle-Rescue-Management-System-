// src/firebaseconfig.tsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXq8ISdzdOmBFORTUHkCHbFGsNugQd1Cs",
  authDomain: "fixandgodb.firebaseapp.com",
  projectId: "fixandgodb",
  storageBucket: "fixandgodb.appspot.com", // Corrected the storageBucket format
  messagingSenderId: "211991242239",
  appId: "1:211991242239:web:f447da7bacff6827f533ca",
  measurementId: "G-8KJJF5X231",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
