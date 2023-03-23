import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
<<<<<<< HEAD
import { getAnalytics } from "firebase/analytics"; 
=======
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";

// import { seedUsers } from "./usersSeed";
>>>>>>> 3554559e860333feeb3a0c1aff6cea52b57d4805

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  //credential: fs.credential.cert(serviceAccount),
};

// Google Maps configuration

const googleMapsConfig = {
  apiMapsKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
};

const app = initializeApp(firebaseConfig, googleMapsConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
<<<<<<< HEAD
=======

// Initialize Firebase Analytics
getAnalytics(app);
>>>>>>> 3554559e860333feeb3a0c1aff6cea52b57d4805

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, analytics, storage, app };
