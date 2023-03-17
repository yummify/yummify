// // const { red, green } = require("chalk");
// const { faker } = require("@faker-js/faker");
// const {initializeApp} = require("firebase-admin/app");
// const {db } = require("../src/firebase");
// const {doc, setDoc} = require("firebase/firestore")
// require("dotenv").config();

const { collection, getDocs, query, where, addDoc } = require("firebase/firestore");
const { db } = require("../src/firebase")

const updateUser = async () => {
const usersRef = collection(db, "users");
const q = query(usersRef, where("email", "==", "dummy3@aol.com"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
console.log(doc.id, " => ", doc.data());
});
};
updateUser();

module.exports = {updateUser}










// const app = initializeApp();

// var admin = require("firebase-admin");

// var serviceAccount = require("../admin.json");
// console.log(process.env.DATABASE_URL);

// initializeApp({
// credential: admin.credential.cert(serviceAccount),
// databaseURL: process.env.DATABASE_URL
// });

// // const admin = require('firebase-admin');
// // const firestore = require(process.env.API_KEY);

// // const db = admin.firestore();
// const rando = Math.floor(Math.random() * 10);
// const adminProp = rando > 7 ? true : false;

// // setDoc(doc(db, "users"), )

// // const createUsers = async () => {
// //   const users = [];
// //   for (let i=0; i<21; i++) {
// //     const newUser = {
// //       firstName: faker.internet.firstName(), 
// //       lastName: faker.internet.lastName(),
// //       email: faker.internet.email(), 
// //       isAdmin: adminProp
// //     };
// //     users.push(newUser);
// //   }
// // try {
// // const newDoc = doc(db, "users");
// // await users.forEach((user) => setDoc(newDoc, user));
// // } catch(err) {
// //   console.error(err)
// // } 

// // }


// // createUsers();
// const createUser = async () => {
// await setDoc(doc(db, "users", "2"), {
//   firstName: 'hey', 
//   lastName: 'last',
//   email: 'email@email.com', 
//   isAdmin: 'true'
// })}

// createUser();
















// // // number of users
// // const numUsers = 20;

// // const seed = async () => {
// //   for (let i = 0; i < numUsers; i++) {
// //     const user = {
// //         email: faker.internet.email,
// //         firstName: faker.name.firstName,
// //         lastName: faker.name.lastName,
// //         isAdmin:
// //     };
// //   }
// // };

// // // wrapper function that is checking if seed() is working
// // async function runSeed() {
// //   try {
// //     await seed();
// //   } catch (err) {
// //     console.error(err);
// //   } finally {
// //     db.close();
// //   }
// // }

// // // checks if this module is being run directly by Node.js
// // if (require.main === module) {
// //   runSeed();
// // }
