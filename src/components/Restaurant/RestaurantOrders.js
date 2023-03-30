import React, {useEffect} from "react";
import { Stack, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { fetchAllOrdersForRestaurantAsync, selectOrders } from "../Order/orderSlice";

const RestaurantOrders = () => {
    const dispatch = useDispatch();
    const {user} = useAuth();
    const restaurantId = user.userId;
    const orders = useSelector(selectOrders);
    const usersList = useSelector(selectUsers);
    const incompleteOrders = [];
    const completeOrders = [];
    orders.forEach((order) => {
        if(order.status === 'awaiting pickup') {
            incompleteOrders.push(order);
        }
        if (order.status === 'complete') {
            completeOrders.push(order);
        }
    })
    
    //ADD RESTAURANTID VARIABLE BACK AFTER TESTING: 
    useEffect(() => {
        dispatch(fetchAllOrdersForRestaurantAsync('4oNqNR7HjicnqevbvYL860t3Cb83'));
        dispatch(fetchUsersAsync())
    }, [dispatch])

// add conditional: for orders that have an 'awaiting pickup' status, mark as complete button
    // also make these have a diff color background
    return (
        <>
        <h1>Restaurant Order Page</h1>
        <Container style={{textAlign: 'center'}}>
            <Row>
                <Col>Confirmation Number</Col>
                <Col>Ordered By</Col>
                <Col>Pickup Window</Col>
                <Col>Status</Col>
            </Row>
        </Container>
        <Stack>
            <div>
            <h2>Awaiting Pickup</h2>
                {incompleteOrders ? incompleteOrders.map((order) => {
                    const singleUser = usersList.find((user) => user.userId === order.userId)
                    return (
                        <Card style={{backgroundColor: 'lightgray', textAlign: 'center'}}>
                        <Container>
                            <Row>
                                <Col className='text-wrap' style={{wordBreak: 'break-all'}}>{order.id}</Col>
                                <Col>{singleUser.data.name}</Col>
                                <Col>{order.pickup}</Col>
                                <Col><Button id='complete'>☐</Button></Col>
                            </Row>
                        </Container>
                    </Card>
                    )
                }): null}
            </div>
            <div>
                <h2>Complete</h2>
            <Card>
                <Container>
                    <Row>
                        <Col>h</Col>
                        <Col>e</Col>
                        <Col>r</Col>
                        <Col>hg</Col>
                    </Row>
                </Container>
            </Card>
            </div>
        </Stack>
        </>
    )
};

export default RestaurantOrders;