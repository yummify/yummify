import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectBag, fetchSingleBagByRestAsync } from "./bagSlice";
import { placeBagInCartAsync, fetchOrderByStatusAsync } from "../Cart/cartBagSlice";
import { selectUser } from "../User/userSlice";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Bag = (restaurant) =>{

    const {expiration, image, newPrice, originalPrice, pickup, type, restaurantId} = restaurant.bag;
    const dispatch = useDispatch();
    const singlebag = useSelector(selectBag);
    const userInfo = useSelector(selectUser);
    
    const navigate = useNavigate();

    //on click of "Reserve" button, create new Order document in db with bag/user/restaurant info and navigate to Cart
    const handleAdd = async () => {
        await dispatch(placeBagInCartAsync({...restaurant.bag, userId: userInfo.userId}))
        dispatch(fetchOrderByStatusAsync(userInfo.userId, "shopping"))
        navigate("/cart");
    };

    return(
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>
                    <b>{type} Surprise Bag</b>
                </Card.Title>
                <Card.Text>
                    <b>Pickup:</b> {pickup}
                </Card.Text>
                <Card.Text>
                    <b>Price:</b> ${Number(newPrice).toFixed(2)} <br/> 
                    <span style={{fontSize:'12px'}}>
                    <b>Original:</b> <s>${Number(originalPrice).toFixed(2)}</s>
                    </span>
                </Card.Text>
                <Button variant="primary" onClick={handleAdd}>Reserve</Button>
            </Card.Body>
        </Card>
        
    );
}

export default Bag;