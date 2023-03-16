const { red, green } = require("chalk");
const { faker } = require("@faker-js/faker");

// number of users
const numUsers = 20;

const seed = async () => {
  for (let i = 0; i < numUsers; i++) {
    const user = {
        email: faker.internet.email,
        firstName: faker.name.firstName,
        lastName: faker.name.lastName,
        isAdmin:
    };
  }
};

// wrapper function that is checking if seed() is working
async function runSeed() {
  try {
    await seed();
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
}

// checks if this module is being run directly by Node.js
if (require.main === module) {
  runSeed();
}
