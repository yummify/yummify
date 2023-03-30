import { auth, db } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { faker } from "@faker-js/faker";

// Seed fake authenticated users
export const seedUsers = async () => {
  try {
    for (let i = 0; i < 3; i++) {
      const email = faker.internet.email();
      const password = email + "1234";

      // Create user account in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add fake user data to Firestore
      const userData = {
        email: email,
        name: faker.name.fullName(),
        phoneNumber: faker.phone.number("###-###-####"),
        image: faker.image.imageUrl(),
        zipcode: faker.address.zipCode("#####"),
        isAdmin: faker.datatype.boolean(),
      };

      // UID in Authentication === Doc ID in users collection
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userData);
    }
    console.log("Seeding successful!");
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
  }
};
