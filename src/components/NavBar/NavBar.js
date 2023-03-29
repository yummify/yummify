import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const authUser = useAuth();
  const navigate = useNavigate();
  console.log("AuthUser in Navbar:", authUser?.user);

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
      <Container>
        {!authUser?.user?.userId ? (
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/userstart">User</Nav.Link>
            <Nav.Link href="/restaurantstart">Restaurant</Nav.Link>
          </Nav>
        ) : authUser?.user?.isRestaurantOwner ? (
          <Nav>
            <Nav.Link href="/restaurantprofile">Profile</Nav.Link>
            <Nav.Link href="/">Store</Nav.Link>
            <Nav.Link href="/">Orders</Nav.Link>
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
            <Nav.Link href="/restaurants">Home</Nav.Link>
            <Nav.Link href="/userprofile">Profile</Nav.Link>
            <Nav.Link href="/map">Map View</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Button onClick={logout}>Logout</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
