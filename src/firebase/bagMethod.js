import {db} from './config';
import { query, setDoc, getDoc, updateDoc, collection, doc } from 'firebase/firestore';


export const getSingleBag = async (bagRef)=> {
    try{
        const bagByDocRef = doc(db, 'bags', `${bagRef}`);
        const bagDocSnap = await getDoc(bagByDocRef);
        return bagDocSnap.data();
    }catch(err){
        console.log(err);
    }
}

export const createSingleBag = async ({bagRef, expir, image, newprice, originalprice, pickup, type})=>{
    try {
       
        await setDoc(doc(db, "bags", bagRef),{
            expir,
            image,
            newprice,
            originalprice,
            pickup,
            type,
        });
    }catch(err){
        console.log(err);
    }
}

export const updateSingleBag = async ({bagRef, expir, image, newprice, originalprice, pickup, type})=>{
    try{
        const bagByDocRef = doc(db, 'bags', `${bagRef}`);
        await updateDoc(bagByDocRef, {
            expiration: expir,
            image: image,
            newPrice: newprice,
            originalPrice: originalprice,
            pickup: pickup,
            type: type,
        });
    }catch(err){
        console.log(err);
    }
}