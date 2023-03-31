import React, {useEffect, useState} from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { editUserStatusAsync } from "../User/userSlice";
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
    // const orders = useSelector(selectOrders);
    const [userData, setUserData] = useState(null);
    // will be used for suspending user ^
    // const [showOrders, setShowOrders] = useState(false);
    const [showSuspend, setShowSuspend] = useState(false);
    // const [ordersList, setOrdersList] = useState(orders);
 
    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    // FINISH ORDER HISTORY!!
    // const handleOpenOrderHistory = async (userId) => {
    //     await dispatch(fetchUserOrdersAsync(userId));
    //     setOrdersList(orders);
    //     setShowOrders(true);}
    // const handleCloseOrderHistory = () => setShowOrders(false);

    const handleOpenSuspend = () => setShowSuspend(true);
    const handleCloseSuspend = () => setShowSuspend(false);

    const handleSuspend = async (userId) => {
        await dispatch(editUserStatusAsync(userId));
        setShowSuspend(false);
    }

    // handle unsuspend 

    /// IF WE WANT TO BE ABLE TO SUSPEND USERS, HAVE TO ADD USER STATUS TO DB

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
                   {/* <Button onClick={() => {
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
                   </Modal> */}
                    <div>
                        <div className="vr" />
                        <Button onClick={() => {
                            setUserData(user.id);
                            handleOpenSuspend()
                            }}
                        >Suspend User</Button>
                        <Modal
                            show={showSuspend}
                            onHide={handleCloseSuspend}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Suspend User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to suspend this user?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                               variant="secondary"
                               onClick={handleCloseSuspend} 
                            >
                                No, do not suspend.
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    handleSuspend(userData)
                                }}
                            >
                                Yes, suspend.
                            </Button>
                        </Modal.Footer>
                        </Modal>
                      </div>
                    </Card>
                )
            }) : 'No registered users'}
        </Stack>
        </>
    );
};

export default AdminManageUsers;