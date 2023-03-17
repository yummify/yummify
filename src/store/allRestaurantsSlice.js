import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../src/firebase";

export const updateUser = async () => {
const usersRef = collection(db, "users");
const q = query(usersRef, where("email", "==", "dummy3@aol.com"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
console.log(doc.id, " => ", doc.data());
});
};
updateUser();

export default updateUser;