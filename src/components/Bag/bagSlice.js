import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { query, setDoc, getDoc,getDocs, updateDoc, collection, doc, where, limit, deleteDoc } from "firebase/firestore";


 //fetch by doc reference
export const fetchSingleBagAsync = createAsyncThunk("fetchBag", async (bagRef)=>{
    try{
        const bagByDocRef = doc(db, 'bags', `${bagRef}`);
        const bagDocSnap = await getDoc(bagByDocRef);
        const bag = bagDocSnap.data();

        const singlebag ={
            expiration: bag.expiration,
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
}); 

//fetch by restID 
export const fetchSingleBagByRestAsync = createAsyncThunk("fetchBagByRest", async (id)=>{
    try{
        //const bagCollectionRef = db.collection('bags');
        const bagCollectionRef = collection(db, 'bags');
        const q = query(bagCollectionRef, where('restaurantId', "==", id ), limit(1));
        const querySnap = await getDocs(q);
        // console.log(doc.data());
        console.log('querySnap:', querySnap.docs[0].data());
        if (querySnap.empty) {
            console.error('No matching documents.');
            //return;
          }  
          
        //   querySnap.forEach((doc) => {
        //     console.log('doc.data', doc.data());
        //     return (doc.data());
        //   });
        return querySnap.docs[0].data();
        
        
    }catch(err){
        console.log(err);
    }
});

//fetch by restID
export const fetchGroupBagByRestAsync = createAsyncThunk("fetchGroupBagByRest", async (rid)=>{
    try{
        
        const bagCollectionRef = collection(db, 'bags');
        const q = query(bagCollectionRef, where('restaurantId', "==", rid ));
        let querySnap = await getDocs(q);
        let allbags = [];
      
        if (querySnap.empty) {
            console.error('No matching documents.');
        }  
        
        querySnap.forEach((doc)=>{
            allbags.push({...doc.data(), id: doc.id});
        })
        
        return allbags;
       
        
        
    }catch(err){
        console.log(err);
    }
});



export const addBagAsync = createAsyncThunk("createBag", async ({expiration, image, newPrice, originalPrice, pickup, quantity, type, restaurantId})=>{
    try{
        
        //creating auto-gen doc reference
        const newDocRef = doc(collection(db, "bags"));

        await setDoc(newDocRef,{
            expiration,
            image,
            newPrice,
            originalPrice,
            pickup,
            quantity,
            type,
            restaurantId

        });


    }catch(err){
        console.log(err);
    }
})

export const editBagAsync = createAsyncThunk("editBag", async ({id, expiration, image, newPrice, originalPrice, pickup, quantity, type})=>{
    try{
        
        const bagByDocRef = doc(db, 'bags', `${id}`)
        await updateDoc(bagByDocRef, {
            expiration,
            image,
            newPrice,
            originalPrice,
            pickup,
            quantity,
            type,
            
        });
    }catch(err){
        console.log(err);
    }
})


export const deleteBagAsync = createAsyncThunk("deletebag", async (bagId)=>{
    console.log(bagId);
    const bagByDocRef = doc(db, 'bags', `${bagId}`)
    await deleteDoc(bagByDocRef)
})



const initialState = [];
export const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(fetchSingleBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
            .addCase(addBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
            .addCase(editBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
            .addCase(fetchSingleBagByRestAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
            .addCase(fetchGroupBagByRestAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
    }
})


export const selectBag = (state) => {
    //console.log(state.bag);
    return state.bag;
};
export default bagSlice.reducer;