import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBag, fetchSingleBagByRestAsync } from "./bagSlice";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//TODO: able to fetch bag by specific bagID
//Attach reserve button to cart

const Bag = (restaurant) =>{
    // console.log(restaurant.bag);
    const {expiration, image, newPrice, originalPrice, pickup, type} = restaurant.bag;
    //console.log(expiration);
    const dispatch = useDispatch();

    //for testing only

    //const testingrest= "D1EEQluv6HmkAjs7Uvyv";
    
    const singlebag = useSelector(selectBag);
    //const {bagId, expiration, image, newPrice, originalPrice, pickup, type} = singlebag;
    
    // useEffect(()=>{
    //     dispatch(fetchSingleBagByRestAsync());
    // },[dispatch]);

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