import React, {useEffect, useState} from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { fetchUserOrdersAsync, selectOrders } from "../User/userOrdersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Stack, Button, Card, Accordion, Modal } from "react-bootstrap";

const AdminManageUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
// will need tpiece of state to hold that user's orders
// const orders = useSelector(selectOrders);
 
    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    return (
        <>
        <h2>Manage Users</h2>
        <Stack id = 'rest-stack' style={{margin: "20px"}}>
            {users.length ? users.map((user) => {
                // let userOrders = [];
                // dispatch(fetchUserOrdersAsync(user.userId));
                
                // const orders = useSelector(selectOrders);
                //for each, of orders that have orderId, push to userOrders
                let userType = '';
                if (user.data.isRestaurantOwner) {userType = 'Restaurant'} else if (user.data.isAdmin) {userType = 'Admin'} else {userType = 'User'}
                return (
                    <Card key={user.userId} style={{margin: "10px", padding: "10px", width: "20rem"}}>
                    <h5>{user.data.name}</h5>
                    <p>{user.data.email}</p>
                    <p>Role: {userType}</p>
                    <p>Phone: {user.data.phoneNumber}</p>
                    {/* <Card style={{backgroundColor: '#8783d1', padding: '4px'}}>
                        <h5>Order History</h5>
                        {orders ? orders.map((order) => {
                            return (
                                <div>
                                <p>Order #: {order.orderId}</p>
                                <p>Pickup: {order.data.pickup}</p>
                                </div>
                            )
                        }) : 'No previous orders'}
                    </Card> */}
                    </Card>
                )
            }) : 'No registered users'}
        </Stack>
        </>
    );
};

export default AdminManageUsers;