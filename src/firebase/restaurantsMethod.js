import {app, db} from './config';
import { query, getDocs, collection, doc } from 'firebase/firestore';

export const getAllRestaurants = async () => {
try {
    const q = query(collection(db, 'restaurants'));
    const querySnapshot = await getDocs(q);
    let restaurants = [];
    querySnapshot.forEach((query) => {
        restaurants.push(query.data());
    })
    return restaurants;
} catch (err) {
    console.error(err)
}
};