// Import necessary Firebase modules
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const analytics = getAnalytics(app);

// Export Firestore and Authentication modules for use in other files
const db = getFirestore(app); // Firestore for database interactions
const auth = getAuth(app);    // Authentication module

export { analytics, app, auth, db };

