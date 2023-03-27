import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from "./config";
import { faker } from "@faker-js/faker";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Google Places API to fetch places and seed firestore
export const getPlaces = async () => {
  const location = { lat: 40.712776, lng: -74.005974 };
  const radius = 20000; // 20km radius around NYC
  const types = ["restaurant"];
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&types=${types}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  const places = data.results.map(async (result) => {
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=name,formatted_address,formatted_phone_number,opening_hours,website,types,photos,reviews&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    // const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=name,formatted_address,formatted_phone_number,opening_hours,website,types,photos,reviews&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const placeDetailsResponse = await fetch(placeDetailsUrl);
    const placeDetailsData = await placeDetailsResponse.json();
    const placeDetails = placeDetailsData.result;

    const statusOptions = ["pending", "approved", "suspended"];
    const cuisineOptions = [
      "Mexican",
      "Pizza",
      "Italian",
      "Chinese",
      "Indian",
      "Sushi",
      "Thai",
      "Mediterranean",
      "American",
      "French",
      "Greek",
      "Salads",
    ];

    // random EIN in the format XX-XXXXXXX
    const ein = `${Math.floor(Math.random() * 90) + 10}-${
      Math.floor(Math.random() * 9000000) + 1000000
    }`;

    // get first 3 photos from photo reference
    const photos = placeDetails.photos.slice(0, 3).map((photo) => {
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      return photoUrl;
    });

    const place = {
      restaurantName: result.name,
      EIN: ein,
      role: "restaurant",
      email: faker.internet.email(),
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      description:
        "Prepare to be pleasantly surprised! By purchasing a Super Bag, you'll be treated to a delightful assortment of scrumptious food items, carefully selected from the store's surplus at the close of business hours.",
      address: placeDetails.formatted_address,
      phoneNumber: placeDetails.formatted_phone_number,
      website: placeDetails.website,
      cuisine:
        cuisineOptions[Math.floor(Math.random() * cuisineOptions.length)],
      image: photos,
      zipcode: "10014",
    };

    // // Add the restaurant to the restaurants collection
    // const placesCollection = collection(db, "restaurants");
    // const docRef = await addDoc(placesCollection, place);

    // Add the restaurant to the restaurants collection with a custom ID
    const placesCollection = collection(db, "restaurants");
    const docRef = doc(placesCollection, result.place_id); // use place_id as the custom ID
    await setDoc(docRef, place); // use setDoc instead of addDoc

    // Create the user account with Firebase authentication
    const email = place.email;
    const password = place.email + "1234";

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Add restaurant user data to users collection
    const userData = {
      isRestaurantOwner: true,
      email: place.email,
      image: "/Student_Profile.png",
      isAdmin: false,
      name: place.restaurantName,
      phoneNumber: place.phoneNumber,
      zipcode: place.zipcode,
    };

    // UID in Authentication === Doc ID in users collection
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, userData);

    return {
      id: docRef.id,
      ...place,
    };
  });

  return Promise.all(places);
};

// call function to reseed
