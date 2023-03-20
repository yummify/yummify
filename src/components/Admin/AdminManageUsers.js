import React, {useEffect} from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Stack, Button } from "react-bootstrap";

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
        <Stack>
            {users.length ? users.map((user) => {
                return (
                    <div>
                    <h5>{user.data.firstName} {user.data.lastName}</h5>
                    <p>{user.data.email}</p>
                    <div>
                        <Button>Edit User</Button>
                        <div className="vr" />
                        <Button>Suspend User</Button>
                      </div>
                    </div>
                )
            }) : 'No registered users'}
        </Stack>
        </>
    );
};

export default AdminManageUsers;