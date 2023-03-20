import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

const AdminHome = () => {

    return (
        <>
        <h2>Admin Dashboard</h2>
        <ButtonToolbar>
            <ButtonGroup>
                <Button>Manage Users</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button>Manage Restaurants</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button>Order History</Button>
            </ButtonGroup>
        </ButtonToolbar>
        <Button>Customer View</Button>
        </>
    )
     //ADD CONDITIONAL LOGIC TO THE LOGIN FUNCTION -> IF USER IS ADMIN, NAVIGATE TO THIS HOME PAGE INSTEAD

};

export default AdminHome;