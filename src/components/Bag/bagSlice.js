import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { query,addDoc, setDoc, getDoc,getDocs, updateDoc, collection, doc, where} from "firebase/firestore";

//do not delete -- old search single bag by bagRef
/* //fetch by doc reference
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
}); */

//fetch by restID 
export const fetchSingleBagByRestAsync = createAsyncThunk("fetchBagByRest", async (restId)=>{
    try{

        //const bagCollectionRef = db.collection('bags');
        const bagCollectionRef = collection(db, 'bags');
        const q = query(bagCollectionRef,where('restaurantId', "==", restId ));
        const querySnap = await getDocs(q);
        if (querySnap.empty) {
            console.log('No matching documents.');
            return;
          }  
          
          querySnap.forEach(doc => {
            return(doc.id, '=>', doc.data());
          });
        

    }catch(err){
        console.log(err);
    }
});





export const addBagAsync = createAsyncThunk("createBag", async ({expiration, image, newPrice, originalPrice, pickup, quantity, type})=>{
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

        });


    }catch(err){
        console.log(err);
    }
})

export const editBagAsync = createAsyncThunk("editBag", async (bagRef,expir, image, newprice, originalprice, pickup, type)=>{
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
})


const initialState = {};
export const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            /* .addCase(fetchSingleBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            }) */
            .addCase(addBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
            .addCase(editBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
            .addCase(fetchSingleBagByRestAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
    }
})


export const selectBag = (state)=> state.bag;
export default bagSlice.reducer;