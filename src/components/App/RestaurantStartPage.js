import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
function RestaurantStartPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Container className="border my-3">
        <Row>
          <Image src="/Cafe.jpg" className="my-3" alt="image of cafe" />
        </Row>
        <Row>
          <Col className="my-3 text-center">
            <Button
              className="mx-3"
              style={{ width: "200px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="mx-3 my-3"
              style={{ width: "200px" }}
              onClick={() => navigate("/restaurantsignup")}
            >
              Sign up as Restaurant
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RestaurantStartPage;
