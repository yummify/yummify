// ----------------------Admin --------------------------//
//const fs = require("firebase-admin");
//const serviceAccount = require("./yummify-352b4-73278bfed852.json");
// ----------------------Admin --------------------------//

// ----------------------Require --------------------------//
// const { initializeApp } = require("firebase/app");
// const { getAuth } = require("firebase/auth");
// const { getFirestore } = require("firebase/firestore");
// ----------------------Require --------------------------//

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// ----------------------Admin --------------------------//
// fs.initializeApp(firebaseConfig);
// const db = fs.firestore();
// const data = db.collection("users").where("email", "=", "dummy3@aol.com").get();
// console.log("data++++++" + data);
// ----------------------Admin --------------------------//

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth, app, storage };
