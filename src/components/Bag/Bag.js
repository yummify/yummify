import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  placeBagInCartAsync,
} from "../Cart/cartBagSlice";
import { fetchOrderByStatusAsync, selectOrders} from "../Order/orderSlice";
import { selectUser } from "../User/userSlice";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//TODO: add modal whenever a user has an existing order in cart

const Bag = (restaurant) => {
  const {
    id,
    //expiration,
    //image,
    newPrice,
    originalPrice,
    pickup,
    type,
    //restaurantId,
  } = restaurant.bag;
  
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const orders = useSelector(selectOrders);

  const navigate = useNavigate();

  
  useEffect(()=>{
    dispatch(fetchOrderByStatusAsync(userInfo.userId, "shopping"));
  },[dispatch,userInfo.userId]);

  //preventing users from reserving more than 1 bag at a time.
  const handleAdd = async () => {
    //check state 
     if(orders.length === 0){
      
    await dispatch(
      placeBagInCartAsync({ ...restaurant.bag, userId: userInfo.userId })
    );
    dispatch(fetchOrderByStatusAsync(userInfo.userId, "shopping"));
    navigate("/cart");}
    else{
      console.log("no worky, too many orders")
      return null;
    }
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
                <Button variant="primary" onClick={
                  handleAdd}>Reserve</Button>
            </Card.Body>
        </Card>
        
    );
}

export default Bag;
