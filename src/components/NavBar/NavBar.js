import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";


const NavBar = () => {
    const user = useSelector(state => state.authenticate);
    
    //VS RESTAURANT - how to distinguish???

    return (
        <Navbar>
            <Container>
                    {user.isAdmin ? 
                        <Nav>
                        <Nav.Link href='/admin'>Dashboard</Nav.Link>
                        <Nav.Link href='/admin/manage-users'>Manage Users</Nav.Link>
                        <Nav.Link href='/admin/manage-restaurants'>Manage Restaurants</Nav.Link>
                        <Nav.Link href='/admin/order-history'>Order History</Nav.Link>
                        <Nav.Link href='/'>Customer View</Nav.Link>
                        </Nav>
                    : 
                    <Nav>
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/map'>Map View</Nav.Link>
                    <Nav.Link href='/profile'>Profile</Nav.Link>
                    <Nav.Link href='/cart'>Cart</Nav.Link>
                    </Nav>}
            </Container>
        </Navbar>
    )
};

export default NavBar;