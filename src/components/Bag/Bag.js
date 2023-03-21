import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBagAsync, selectBag } from "./bagSlice";



const Bag = () =>{
    const dispatch = useDispatch();
    const testingbag = "5zo2C263fsMNft46cGwg";
    fetchSingleBagAsync(testingbag);
    // should return expir: march17,2023. no img, newprice=7, etc.
    const singlebag = useSelector(selectBag);
    const {bagId, expiration, image, newPrice, originalPrice, pickup, type} = singlebag;
    //console.log(singlebag);
    useEffect(()=>{
        dispatch(fetchSingleBagAsync(testingbag));
    },[dispatch]);

    return(
        <div id ="bagcard">
            <p>this is where i would put bag info</p>
            <p>manual docref: {testingbag}</p>
            <p>from slice, docref: {bagId}</p>
            <p>expir: {expiration}</p>
            <p>newprice: {newPrice}</p>
            <p>originalprice: {originalPrice}</p>
        </div>
    );
};


export default Bag;