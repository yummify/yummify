import { auth, db } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { faker } from "@faker-js/faker";

// Seed fake authenticated users
const seedUsers = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      const email = faker.internet.email();
      const password = faker.internet.password();

      // Create user account in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add fake user data to Firestore
      const userData = {
        email: email,
        password: password,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.number("###-###-####"),
        image: faker.image.imageUrl(),
        zipcode: faker.address.zipCode("#####"),
        isAdmin: faker.datatype.boolean(),
      };

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        ...userData,
      });
    }
    console.log("Seeding successful!");
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
  }
};

export default seedUsers();
