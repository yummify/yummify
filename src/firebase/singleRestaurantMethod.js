import { app, db } from './config';
import { query, getDoc, collection, doc } from 'firebase/firestore';

export const getSingleRestaurant = async () => {
    const docRef = doc(db, "restaurants", "Hawthorne Cafe");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(("Document Data:", docSnap.data));
    } else {
        console.log("No restaurant by that name found");
    }



};
// try {
//     const q = query(collection(db, 'restaurant'));
//     const querySnapshot = await getDoc(q);
//     let restaurant = [];
//     querySnapshot.forEach((query) => {
//         restaurants.push(query.data());
//     })
//     return restaurants;
// } catch (err) {
//     console.error(err)
// }
// };