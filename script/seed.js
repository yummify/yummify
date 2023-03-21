// const { collection, query, where, getDocs } = require("firebase/firestore");
// //import { doc, setDoc } from "firebase/firestore";
// const { collection, addDoc } = require("firebase/firestore");
// console.log(auth);
// const { initializeApp } = require("firebase/app");
// require("dotenv").config();

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//const fs = require("firebase-admin");

//const serviceAccount = require("./yummify-352b4-73278bfed852.json");

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
//   credential: fs.credential.cert(serviceAccount),
// };

// // Initialize Firebase
//fs.initializeApp(firebaseConfig);

// const db = fs.firestore();

// admin query

// const datafetch = async () => {
//   const res = await db
//     .collection("users")
//     .where("email", "==", "dummy3@aol.com")
//     .get();
//   return res;
// };
// console.log("data++" + datafetch());

// const logUsers = async () => {
//   const usersRef = collection(db, "users");
//   const q = query(usersRef, where("email", "==", "dummy3@aol.com"));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// };

//console.log("seed ddata+++++" + logUsers());

// const updateUser = async () => {
//   const usersRef = collection(db, "users");
//   const q = query(usersRef, where("email", "==", "dummy3@aol.com"));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// };
// updateUser();
