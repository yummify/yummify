import React, {useEffect} from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Stack, Button, Card, Accordion } from "react-bootstrap";

//EDIT AND DELETE THUNKS: add to single user
// CHANGE 'EDIT USER' TO 'MESSAGE USER'

const AdminManageUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    //user thunk isn't working

    return (
        <>
        <h2>Manage Users</h2>
        <Stack style={{margin: "20px"}}>
            {users.length ? users.map((user) => {
                return (
                    <Card style={{margin: "10px", padding: "10px", width: "20rem"}}>
                    <h5>{user.data.firstName} {user.data.lastName}</h5>
                    <p>{user.data.email}</p>
                    <Accordion>
                        <Accordion.Header>Previous Orders</Accordion.Header>
                        {/** ===== LIST PREVIOUS ORDERS OF USER HERE ===== */}
                        <Accordion.Item></Accordion.Item>
                    </Accordion>
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