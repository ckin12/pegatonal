
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDUfWVlly9sKokNHY-mYvH3r14WaV0HUjM",
  authDomain: "datn-1fc4c.firebaseapp.com",
  projectId: "datn-1fc4c",
  storageBucket: "datn-1fc4c.firebasestorage.app",
  messagingSenderId: "562906844234",
  appId: "1:562906844234:web:29739eae72d70788492ab3",
  measurementId: "G-7W0ZMD51CQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);