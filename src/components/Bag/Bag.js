import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { selectBag } from "./bagSlice";
import {
  placeBagInCartAsync,
  fetchOrderByStatusAsync,
} from "../Cart/cartBagSlice";
import { fetchUserOrdersAsync } from "../Order/orderSlice";
import { selectUser } from "../User/userSlice";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
  console.log("id: ", id);
  const dispatch = useDispatch();
  //const singlebag = useSelector(selectBag);
  const userInfo = useSelector(selectUser);

  const navigate = useNavigate();

  //useEffect loads info into state about whether user currently has an order status "shopping" 
  //add this to state

  //on click of "Reserve" button, create new Order document in db with bag/user/restaurant info and navigate to Cart
  const handleAdd = async () => {
    //check state 
    await dispatch(
      placeBagInCartAsync({ ...restaurant.bag, userId: userInfo.userId })
    );
    dispatch(fetchOrderByStatusAsync(userInfo.userId, "shopping"));
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
