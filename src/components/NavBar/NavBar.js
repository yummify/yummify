import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserAsync } from "../User/userSlice";

const NavBar = () => {
  const authUser = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (authUser?.user?.userId)
      dispatch(fetchUserAsync(authUser?.user?.userId));
  }, [dispatch, authUser?.user?.userId]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar>
      <img id='logo' src='logo.png'></img>
      <Container>
        {!authUser?.user?.userId ? (
          <Nav>
            <Nav.Link href="/userstart">User</Nav.Link>
            <Nav.Link href="/restaurantstart">Restaurant</Nav.Link>
          </Nav>
        ) : authUser?.user?.isRestaurantOwner ? (
          <Nav>
            <Nav.Link href="/restaurantprofile">Profile</Nav.Link>
            <Nav.Link href="/restaurantorders">Orders</Nav.Link>
            <Nav.Link href="/restaurantinventory">Inventory</Nav.Link>
            <Nav.Link href={`/restaurant/${authUser?.user?.userId}`}>View Storefront </Nav.Link>
            <Button onClick={logout}>Logout</Button>
          </Nav>
        ) : authUser?.user?.isAdmin ? (
          <Nav>
            <Nav.Link href="/admin">Dashboard</Nav.Link>
            <Nav.Link href="/adminprofile">Profile</Nav.Link>
            <Nav.Link href="/admin/manage-users">Manage Users</Nav.Link>
            <Nav.Link href="/admin/manage-restaurants">
              Manage Restaurants
            </Nav.Link>
            <Nav.Link href="/admin/order-history">Order History</Nav.Link>
            <Button onClick={logout}>Logout</Button>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/restaurants">Browse</Nav.Link>
            <Nav.Link href="/userprofile">Profile</Nav.Link>
            {/* <Nav.Link href="/map">Map View</Nav.Link> */}
            <Nav.Link href="/cart">Cart</Nav.Link>
            {/* <Button onClick={logout}>Logout</Button> */}
            <Nav.Link href="/logout" onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
