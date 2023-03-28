import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext"
import { Alert, Card, Modal, Stack, Button, Badge } from "react-bootstrap";
import { selectBag } from "../Bag/bagSlice";
import { selectRestaurant } from "../SingleRestaurantUserView/singleRestaurantSlice";
import { selectOrders } from "../Order/orderSlice";
import { selectCartBag } from "./cartBagSlice";
import { fetchOrderByStatusAsync } from "./cartBagSlice";

const Cart = () => {

    const [confirmation, setConfirmation] = useState(false);
    
    const dispatch = useDispatch();

    //const orders = useSelector(selectCartBag);
    //const userInfo = useSelector(selectUser);
    const restaurant = useSelector(selectRestaurant);
    console.log('restaurant', restaurant);

    const { user } = useAuth();
    const userId = user.userId;

    useEffect(() => {
        dispatch(fetchOrderByStatusAsync(userId, 'shopping'));
    }, [dispatch])

    const bag = useSelector(selectCartBag);

    return (
        <>
        <Alert variant={'warning'}>Remember: the contents of this bag are a SURPRISE!</Alert>
            <Stack>
                <Card>
                    <Button variant="outline-dark" className="text-right" style={{textAlign: 'right'}}>X *add delete function</Button>
                    <Stack direction='horizontal'>
                    <Card.Header>
                        <Card.Img src='https://media.istockphoto.com/id/184395659/photo/brown-paper-bag-and-apple.jpg?s=612x612&w=0&k=20&c=MLpwawtbge0roehL_8LF638qGxBXrIWdDlItyrLxQ-s=' style={{width: '20vw'}}></Card.Img>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Restaurant Name</Card.Title>
                        {/* <Card.Text>Pickup Window: {bag.pickup}, {bag.address}</Card.Text> */}
                    </Card.Body>
                    </Stack>
                    <Card.Footer style={{textAlign: 'right'}}>
                        <Stack direction='horizontal'>
                            <Card.Text style={{margin: '5px'}}><s>Original Price: {bag[0]?.[0]?.originalPrice}</s></Card.Text>
                            <Card.Text style={{margin: '5px'}}>New Price: {bag[0]?.[0]?.newPrice}</Card.Text>
                        </Stack>
                    </Card.Footer>
                </Card>
                <Alert variant={'danger'}>Note: This app is a Capstone Project. Orders will not actually be sent to these restaurants, and credit cards will not actually be charged. </Alert>
                <Badge>Total Price</Badge>
                {/* <p>Total Savings: ({bag[0]?.[0]?.originalPrice} - {bag[0]?.[0]?.newPrice})</p> */}
                <div></div>
            </Stack>
            <h2>Checkout</h2>
        </>
    )
};

export default Cart;