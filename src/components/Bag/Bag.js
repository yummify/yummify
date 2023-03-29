import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeBagInCartAsync } from "../Cart/cartBagSlice";
import { selectUser } from "../User/userSlice";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//TODO: double-check reserve button functionality

const Bag = (restaurant) =>{
    // console.log(restaurant.bag);

    const {expiration, image, newPrice, originalPrice, pickup, type, restaurantId} = restaurant.bag;
    
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUser);
    
    
    const handleAdd = async () => {
        console.log(userInfo.userId);
        dispatch(placeBagInCartAsync({...restaurant.bag, userId: userInfo.userId}))
    };

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
                <Button variant="primary" onClick={handleAdd}>Reserve</Button>
            </Card.Body>
        </Card>
        
    );
}


export default Bag;