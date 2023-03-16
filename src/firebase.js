// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxGbHCoFToaRmAwCZ8wJyT0pYUd3tNBz8",
  authDomain: "yummify-352b4.firebaseapp.com",
  databaseURL: "https://yummify-352b4-default-rtdb.firebaseio.com",
  projectId: "yummify-352b4",
  storageBucket: "yummify-352b4.appspot.com",
  messagingSenderId: "61047984799",
  appId: "1:61047984799:web:e11a33049db5af613fc8aa",
  measurementId: "G-ZSQQSCGKRV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth, analytics };
