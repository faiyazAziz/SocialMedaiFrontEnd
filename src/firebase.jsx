// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAST_lf_tWVhxTwRlVTOkCnOqfNscN09Tg",
  authDomain: "social-2f752.firebaseapp.com",
  projectId: "social-2f752",
  storageBucket: "social-2f752.appspot.com",
  messagingSenderId: "364531254051",
  appId: "1:364531254051:web:db81057c5013cd8fac0296",
  measurementId: "G-T8M61L2JRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;