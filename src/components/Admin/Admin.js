import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
    const navigate = useNavigate();

    return (
        <>
        <h2>Admin Dashboard</h2>
        <ButtonToolbar>
            <ButtonGroup>
                <Button onClick={() => navigate('/admin/manage-users')}>Manage Users</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={() => navigate('/admin/manage-restaurants')}>Manage Restaurants</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={() => navigate('/admin/order-history')}>Order History</Button>
            </ButtonGroup>
        </ButtonToolbar>
        <Button onClick={() => navigate('/home')}>Customer View</Button>
        </>
    )
     //ADD CONDITIONAL LOGIC TO THE LOGIN FUNCTION -> IF USER IS ADMIN, NAVIGATE TO THIS HOME PAGE INSTEAD

};

export default AdminHome;