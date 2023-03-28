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
  console.log("AuthUser in Navbar:", authUser?.user);

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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Yummify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!authUser?.user?.userId ? (
            <Nav className="me-auto">
              <Nav.Link href="/" className="mx-3 align-self-center">
                Home
              </Nav.Link>
              <Nav.Link href="/userstart" className="mx-3 align-self-center">
                User
              </Nav.Link>
              <Nav.Link
                href="/restaurantstart"
                className="mx-3 align-self-center"
              >
                Restaurant
              </Nav.Link>
            </Nav>
          ) : authUser?.user?.isRestaurantOwner ? (
            <Nav className="me-auto">
              <Nav.Link
                href="/restaurantprofile"
                className="mx-3 align-self-center"
              >
                Profile
              </Nav.Link>
              <Nav.Link
                href="/restaurantstore-ov"
                className="mx-3 align-self-center"
              >
                Store
              </Nav.Link>
              <Nav.Link href="/" className="mx-3 align-self-center">
                Orders
              </Nav.Link>
            </Nav>
          ) : authUser?.user?.isAdmin ? (
            <Nav className="me-auto">
              <Nav.Link href="/admin" className="mx-3 align-self-center">
                Dashboard
              </Nav.Link>
              <Nav.Link href="/adminprofile" className="mx-3 align-self-center">
                Profile
              </Nav.Link>
              <Nav.Link
                href="/admin/manage-users"
                className="mx-3 align-self-center"
              >
                Manage Users
              </Nav.Link>
              <Nav.Link
                href="/admin/manage-restaurants"
                className="mx-3 align-self-center"
              >
                Manage Restaurants
              </Nav.Link>
              <Nav.Link href="/admin/order-history">Order History</Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/restaurants" className="mx-3 align-self-center">
                Home
              </Nav.Link>

              <Nav.Link href="/userprofile" className="mx-3 align-self-center">
                Profile
              </Nav.Link>

              <Nav.Link href="/map" className="mx-3 align-self-center">
                Map View
              </Nav.Link>

              <Nav.Link href="/cart" className="mx-3 align-self-center">
                Cart
              </Nav.Link>
            </Nav>
          )}
          <Container className="text-end align-self-center">
            {authUser?.user && (
              <p>
                Hello <strong>{authUser?.user?.name}</strong>
              </p>
            )}

            {authUser?.user && <Button onClick={logout}>Logout</Button>}
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
