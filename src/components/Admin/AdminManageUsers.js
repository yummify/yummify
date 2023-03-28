import React, {useEffect, useState} from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Stack, Button, Card, Accordion, Modal } from "react-bootstrap";
import { selectOrders, fetchUserOrdersAsync, fetchAllOrdersAsync } from "../Order/orderSlice";
import { useAuth } from "../../contexts/AuthContext";

//EDIT AND DELETE THUNKS: add to single user
// CHANGE 'EDIT USER' TO 'MESSAGE USER'

const AdminManageUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const orders = useSelector(selectOrders);
    const [userData, setUserData] = useState(null);
    // will be used for suspending user ^
    const [showOrders, setShowOrders] = useState(false);
    const [showSuspend, setShowSuspend] = useState(false);
    const [ordersList, setOrdersList] = useState(orders);
 
    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    const handleOpenOrderHistory = async (userId) => {
        await dispatch(fetchUserOrdersAsync(userId));
        setOrdersList(orders);
        setShowOrders(true);}
    const handleCloseOrderHistory = () => setShowOrders(false);

    // const handleSuspend = async (userId) => {
    //     await dispatch(denyStatusRestaurantAsync(userId));
    //     setRestaurantsList(restaurants);
    //     setShowSuspend(false);
    //   };

    // const prevOrders = (userId) => {
    //     dispatch(fetchUserOrdersAsync(userId));
    //     return (
    //         <Accordion>
    //             <Accordion.Header>Order History</Accordion.Header>
    //         </Accordion>
    //     )
    // };
    // const userOrders = dispatch(fetchUserOrdersAsync(userId));
    // when the load previous orders button is clicked, I want to call a function that takes in the userId and finds all orders with that userId.
    // then that function should return accordion items for each of those orders. 

    return (
        <>
        <h2>Manage Users</h2>
        <Stack style={{margin: "20px"}}>
            {users.length ? users.map((user) => {
                return (
                    <Card style={{margin: "10px", padding: "10px", width: "20rem"}}>
                    <h5>{user.data.firstName} {user.data.lastName}</h5>
                    <p>{user.data.email}</p>
                   <Button onClick={() => {
                    setUserData(user.id);
                    handleOpenOrderHistory()}}>
                   Load Order History</Button>
                   <Modal
                    show={showOrders}
                    onHide={handleCloseOrderHistory}
                   >
                    <Modal.Header></Modal.Header>
                    <Modal.Title>Orders</Modal.Title>
                    <Modal.Body>
                        <Accordion>
                            {orders.length > 0 ? orders.map((order) => {
                                return (
                                    <Accordion.Item>
                                        <Accordion.Header>Order # {order.id}</Accordion.Header>
                                        <Accordion.Body>
                                            <p style={{textDecoration: 'line-through'}}>Original Price: {order.originalPrice}</p> <span>New Price: {order.newPrice}</span>
                                            <p>Restaurant: ## add name ## </p>
                                            <p>Status: {order.status}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            }) : 'No previous orders'}
                        </Accordion>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                        onClick={() => setShowOrders(false)}
                        >Close Order History</Button>
                        </Modal.Footer>
                   </Modal>
                    <div>
                        <Button>Edit User</Button>
                        <div className="vr" />
                        <Button>Suspend User</Button>
                      </div>
                    </Card>
                )
            }) : 'No registered users'}
        </Stack>
        </>
    );
};

export default AdminManageUsers;