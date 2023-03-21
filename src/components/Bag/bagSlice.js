import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import {  query, setDoc, getDoc, updateDoc, collection, doc} from "firebase/firestore";

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



export const addBagAsync = createAsyncThunk("createBag", async (bagRef, expir, image, newprice, originalprice, pickup, type)=>{
    try{
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
})

export const editBagAsyc = createAsyncThunk("editBag", async (bagRef,expir, image, newprice, originalprice, pickup, type)=>{
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
            .addCase(fetchSingleBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
            .addCase(addBagAsync.fulfilled, (state, action)=>{
                return action.payload;
            })
    }
})


export const selectBag = (state)=> state.bag;
export default bagSlice.reducer;