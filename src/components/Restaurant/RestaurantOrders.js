import React, { useEffect, useState } from "react";
import { Stack, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import {
  fetchAllOrdersForRestaurantAsync,
  selectOrders,
  markComplete,
} from "../Order/orderSlice";

const RestaurantOrders = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const restaurantId = user.userId;
  const orders = useSelector(selectOrders);
  const usersList = useSelector(selectUsers);
  const incompleteOrders = [];
  const completeOrders = [];
  const [ordersList, setOrdersList] = useState(orders);
  orders.forEach((order) => {
    if (order.status === "awaiting pickup") {
      incompleteOrders.push(order);
    }
    if (order.status === "complete") {
      completeOrders.push(order);
    }
  });

  useEffect(() => {
    dispatch(fetchAllOrdersForRestaurantAsync(restaurantId));
    dispatch(fetchUsersAsync());
  }, [dispatch, ordersList]);

  const handleComplete = (orderId) => {
    dispatch(markComplete(orderId));
    setOrdersList(orders);
  };
  return (
    <>
      <h1 style={{ fontWeight: "bold" }}>Orders</h1>
      <Stack>
        <div>
          <h3>Awaiting Pickup</h3>
          <Container style={{ textAlign: "center" }}>
            <Row style={{ fontWeight: "bold" }}>
              <Col>Confirmation Number</Col>
              <Col>Ordered By</Col>
              <Col>Pickup Time</Col>
              <Col className='text-wrap'>Mark Complete</Col>
            </Row>
          </Container>
          {incompleteOrders
            ? incompleteOrders.map((order) => {
                const singleUser = usersList.find(
                  (user) => user.userId === order.userId
                );
                return (
                  <Card
                    style={{
                      backgroundColor: "lightgray",
                      textAlign: "center",
                      margin: '5px' 
                    }}
                  >
                    <Container>
                      <Row>
                        <Col
                          className="text-wrap"
                          style={{ wordBreak: "break-all" }}
                        >
                          {order.id}
                        </Col>
                        <Col>{singleUser?.data.name}</Col>
                        <Col>{order.pickup}</Col>
                        <Col>
                          <Button
                            id="complete"
                            onClick={() => handleComplete(order.id)}
                          >
                            ☐
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Card>
                );
              })
            : null}
        </div>
        <div></div>
        <div>
          <h3>Complete</h3>
          <Container style={{ textAlign: "center" }}>
            <Row style={{ fontWeight: "bold" }}>
              <Col>Confirmation Number</Col>
              <Col>Ordered By</Col>
              <Col>Pickup Time</Col>
              <Col> </Col>
            </Row>
          </Container>
          {completeOrders
            ? completeOrders.map((order) => {
                const singleUser = usersList.find(
                  (user) => user.userId === order.userId
                );
                return (
                  <Card style={{ textAlign: "center", margin: '5px' }}>
                    <Container>
                      <Row>
                        <Col
                          className="text-wrap"
                          style={{ wordBreak: "break-all" }}
                        >
                          {order.id}
                        </Col>
                        <Col>{singleUser?.data.name}</Col>
                        <Col>{order.pickup}</Col>
                        <Col>Complete</Col>
                      </Row>
                    </Container>
                  </Card>
                );
              })
            : null}
        </div>
      </Stack>
    </>
  );
};

export default RestaurantOrders;
