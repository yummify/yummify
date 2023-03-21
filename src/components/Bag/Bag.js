import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBagAsync, selectBag } from "./bagSlice";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//TODO: 

const Bag = () =>{
    const dispatch = useDispatch();

    //
    const testingbag = "5zo2C263fsMNft46cGwg";
    //fetchSingleBagAsync(testingbag);
    // should return expir: march17,2023. no img, newprice=7, etc.
    const singlebag = useSelector(selectBag);
    const {bagId, expiration, image, newPrice, originalPrice, pickup, type} = singlebag;
    //console.log(singlebag);
    useEffect(()=>{
        dispatch(fetchSingleBagAsync(testingbag));
    },[dispatch]);

    return(
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>
                    {type} Surprise Bag
                </Card.Title>
                <Card.Text>
                    Pickup: {pickup}
                </Card.Text>
                <Card.Text>
                    Price: ${Number(newPrice).toFixed(2)} - Original: $ {Number(originalPrice).toFixed(2)}
                </Card.Text>
                <Button variant="primary">Reserve</Button>
            </Card.Body>
        </Card>
        
    );
}


export default Bag;