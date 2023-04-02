import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <>
    <Container style={{height: '80vh', textAlign: 'center'}}>
      <div style={{border: "5px solid #41ead4", padding: "15px", margin: "15px"}}>
      <h2>Admin Dashboard</h2>
      <ButtonToolbar className="justify-content-md-center">
        <ButtonGroup className="justify-content-md-center" style={{padding: '10px'}}>
          <Button onClick={() => navigate("/manage-users")}>
            Manage Users
          </Button>
        </ButtonGroup>
        <ButtonGroup className="justify-content-md-center" style={{padding: '10px'}}>
          <Button onClick={() => navigate("/manage-restaurants")}>
            Manage Restaurants
          </Button>
        </ButtonGroup>
        <ButtonGroup className="justify-content-md-center" style={{padding: '10px'}}>
          <Button onClick={() => navigate("/order-history")}>
            Order History
          </Button>
        </ButtonGroup>
        <ButtonGroup className="justify-content-md-center" style={{padding: '10px'}}>
          <Button onClick={() => navigate("/restaurants")}>
            Customer View
            </Button>
        </ButtonGroup>
      </ButtonToolbar>
      </div>
      </Container>
    </>
  );
};

export default AdminHome;
