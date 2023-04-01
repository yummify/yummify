import React, {useEffect, useState} from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { fetchAllOrdersAsync, selectOrders } from "../Order/orderSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Stack, Button, Card, Accordion, Modal, ListGroup } from "react-bootstrap";

const AdminManageUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const orders = useSelector(selectOrders);
    const [show, setShow] = useState(false)

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false)
 
    useEffect(() => {
        dispatch(fetchUsersAsync());
        dispatch(fetchAllOrdersAsync())
    }, [dispatch]);

    return (
        <>
        <h2>Manage Users</h2>
        <Stack id = 'rest-stack' style={{margin: "20px"}}>
            {users.length ? users.map((user) => {
                let userType = '';
                if (user.data.isRestaurantOwner) {userType = 'Restaurant'} else if (user.data.isAdmin) {userType = 'Admin'} else {userType = 'User'};
                const userOrders = orders.filter((order) => order.userId === user.userId);
                return (
                    <Card key={user.userId} style={{margin: "10px", padding: "10px", width: "20rem"}}>
                    <h5>{user.data.name}</h5>
                    <p>{user.data.email}</p>
                    <p>Role: {userType}</p>
                    <p>Phone: {user.data.phoneNumber}</p>
                    <Card style={{backgroundColor: '#8783d1', padding: '4px', maxHeight: '15vh', overflow: 'scroll'}}>
                        <h5>Order History</h5>
                        {userOrders.length > 0 ? userOrders.map((order) => {
                            return (
                                <div style={{border: '1px solid black', padding: '2px', borderRadius: '4px'}}>
                                <p>Order #: {order?.id}</p>
                                <p>Price: {order?.newPrice}</p>
                                <p>Date: {order?.expiration}</p>
                                </div>
                            )
                        }) : <p>No previous orders</p>}
                    </Card>
                    </Card>
                )
            }) : 'No registered users'}
        </Stack>
        </>
    );
};

export default AdminManageUsers;