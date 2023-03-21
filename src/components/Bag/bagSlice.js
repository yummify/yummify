import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { getSingleBag, createSingleBag, updateSingleBag } from "../../firebase/bagMethod";

//fetch by Ref
export const fetchSingleBagAsync = createAsyncThunk("fetchBag", async (bagRef)=>{
    try{
        const bag = await getSingleBag(bagRef);
        
        return bag;
    }catch(err){
        console.log(err);
    }
});



export const addBagAsync = createAsyncThunk("createBag", async (bagRef, expir, image, newprice, originalprice, pickup, type)=>{
    try{
        await createSingleBag({bagRef, expir, image, newprice, originalprice, pickup, type});
    }catch(err){
        console.log(err);
    }
})

export const editBagAsyc = createAsyncThunk("editBag", async (bagRef,expor, image, newprice, originalprice, pickup, type)=>{
    try{
        await updateSingleBag({bagRef,expor, image, newprice, originalprice, pickup, type});
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