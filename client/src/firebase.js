// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "project-0402-9497b.firebaseapp.com",
  projectId: "project-0402-9497b",
  storageBucket: "project-0402-9497b.appspot.com",
  messagingSenderId: "762991059712",
  appId: "1:762991059712:web:f46802c3311398035e89e5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);