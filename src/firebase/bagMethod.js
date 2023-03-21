import {db} from './config';
import { query, setDoc, getDoc, updateDoc, collection, doc } from 'firebase/firestore';



export const getSingleBag = async (bagRef)=> {
    try{
        const bagByDocRef = doc(db, 'bags', `${bagRef}`);
        const bagDocSnap = await getDoc(bagByDocRef);
    
        const bag = bagDocSnap.data();

        //TODO: will change once firebase model changes from Timestamp -> String
        //converting firebase timestamp -> date with only JS
        const convert = new Date(bag.expiration.seconds*1000 + bag.expiration.nanoseconds/1000000);
        const date = convert.toDateString();


        
        const singlebag ={
            expiration: date,
            image: bag.image,
            newPrice: bag.newPrice,
            originalPrice: bag.originalPrice,
            pickup: bag.pickup,
            type: bag.type,
        }


        return {...singlebag, bagId: bagDocSnap.id}
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