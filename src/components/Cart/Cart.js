import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { Alert, Card, Modal, Stack, Button, Badge, NavLink } from "react-bootstrap";


import { fetchUserOrdersAsync, selectOrders } from "../Order/orderSlice";
import { fetchAllRestaurants, selectRestaurants } from "../AllRestaurants/allRestaurantsSlice";

const Cart = () => {
  const [confirmation, setConfirmation] = useState(false);

  const dispatch = useDispatch();

  //get id of logged-in user
  const { user } = useAuth();
  const userId = user.userId;
  

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(userId));
    dispatch(fetchAllRestaurants());
  }, [dispatch,userId]);

  
  const orders = useSelector(selectOrders);
  console.log("orders: ", orders);
  const restaurants = useSelector(selectRestaurants);
  

  

    //calculate NYC sales tax and find total price
    const totalPrice = (price) => {
        let tax = (price * .0875)
        return (tax + price).toFixed(2);
    }

    //calculate savings
    const savings = (oldPrice, newPrice) => {
        let savings = oldPrice - newPrice;
        return savings.toFixed(2);
    };

    const handleCheckout = ()=> {

    }

    const handleDeleteOrder = () => {

    }
    return (
        <>
        <Alert variant={'warning'}>Remember: the contents of this bag are a SURPRISE!</Alert>
            <Stack>
                {orders.length > 0 ? orders.map((order)=>{
                    if(order.status === "shopping"){
                        const restId = order.restaurantId;
                        const rest = restaurants.find((rest) => rest.id === restId);
                        
                    return(
                <Card>
                    <Button variant="outline-dark" className="text-right" style={{textAlign: 'right'}} onClick={handleDeleteOrder}> Delete Bag</Button>
                    <Stack direction='horizontal'>
                    <Card.Header>
                        <Card.Img src='https://media.istockphoto.com/id/184395659/photo/brown-paper-bag-and-apple.jpg?s=612x612&w=0&k=20&c=MLpwawtbge0roehL_8LF638qGxBXrIWdDlItyrLxQ-s=' style={{width: '20vw'}}></Card.Img>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{order.type} SuperBag @ {rest?.restaurantName} </Card.Title>
                        <Card.Text>Pickup Window: {order.pickup}, {order.address}</Card.Text>
                    </Card.Body>
                    </Stack>
                    <Card.Footer style={{textAlign: 'right'}}>
                        <Stack direction='horizontal'>
                            <Card.Text style={{margin: '5px'}}><s>Original Price: {order.originalPrice}</s></Card.Text>
                            <Card.Text style={{margin: '5px'}}>New Price: {order.newPrice}</Card.Text>
                        </Stack>
                    </Card.Footer>
                </Card> )}
                else{
                    return null;
                }
                }) : <div>Your cart is empty<div></div> <NavLink href="/restaurants">Return to Browse</NavLink></div> }
                
                <Alert variant={'danger'}>Note: This app is a Capstone Project. Orders will not actually be sent to these restaurants, and credit cards will not actually be charged. </Alert>
                <Badge>Total Price</Badge>
                {orders.length > 0 ? (<Card>
                <p>Total Savings: ${savings(orders[0].originalPrice, orders[0].newPrice)}
                
                </p>
                <div></div>
                <p> <Button onClick={handleCheckout}>Checkout: ${totalPrice(orders[0].newPrice)}</Button></p>
                </Card>) : null}
            </Stack>
            
        </>
    )
};

export default Cart;
