import React, {useEffect, useState} from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { editUserStatusAsync } from "../User/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Stack, Button, Card, Accordion, Modal } from "react-bootstrap";
import { selectOrders, fetchUserOrdersAsync, fetchAllOrdersAsync } from "../Order/orderSlice";
import { useAuth } from "../../contexts/AuthContext";

const AdminManageUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
 
    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    return (
        <>
        <h2>Manage Users</h2>
        <Stack id = 'rest-stack' style={{margin: "20px"}}>
            {users.length ? users.map((user) => {
                let userType = '';
                if (user.data.isRestaurantOwner) {userType = 'Restaurant'} else if (user.data.isAdmin) {userType = 'Admin'} else {userType = 'User'}
                
                return (
                    <Card style={{margin: "10px", padding: "10px", width: "20rem"}}>
                    <h5>{user.data.name}</h5>
                    <p>{user.data.email}</p>
                    <p>Role: {userType}</p>
                    <p>Phone: {user.data.phoneNumber}</p>
                    </Card>

                )
            }) : 'No registered users'}
        </Stack>
        </>
    );
};

export default AdminManageUsers;