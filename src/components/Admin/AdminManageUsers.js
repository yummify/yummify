import React, { useEffect, useState } from "react";
import { fetchUsersAsync, selectUsers } from "../Users/usersSlice";
import { fetchAllOrdersAsync, selectOrders } from "../Order/orderSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Stack, Card, Container, Row, Col } from "react-bootstrap";

const AdminManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchUsersAsync());
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  return (
    <>
      <h2 style={{ textAlign: "center", fontWeight: "700" }}>Manage Users</h2>
      <Stack
        id="rest-stack"
        style={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {users.length
          ? users.map((user) => {
              let userType = "";
              if (user.data.isRestaurantOwner) {
                userType = "Restaurant";
              } else if (user.data.isAdmin) {
                userType = "Admin";
              } else {
                userType = "User";
              }
              const userOrders = orders.filter(
                (order) => order.userId === user.userId
              );
              return (
                <Card
                  key={user.userId}
                  style={{
                    margin: "10px",
                    padding: "10px",
                    width: "20rem",
                    border: "2px solid #41ead4",
                  }}
                >
                  <h5 style={{ fontWeight: "700", textAlign: 'center' }}>{user.data.name}</h5>
                  <p>{user.data.email}</p>
                  <p>
                    <span style={{ fontWeight: "700" }}>Role: </span>
                    {userType}
                  </p>
                  <p>
                    <span style={{ fontWeight: "700" }}>Phone: </span>{" "}
                    {user.data.phoneNumber}
                  </p>
                  {userType === 'User' ? 
                    <div>
                    <Container
                    style={{
                      backgroundColor: "#8783d1",
                      padding: "4px",
                      maxHeight: "15vh",
                      overflow: "scroll",
                      borderRadius: "4px",
                      width: '17rem'
                    }}
                  >
                    <p style={{ fontWeight: "700" }}>Order History</p>
                    <Row style={{ fontWeight: "bold" }}>
                      <Col>Order #</Col>
                      <Col>Price</Col>
                      <Col>Date</Col>
                    </Row>
                    {userOrders.length > 0 ? (
                      userOrders.map((order) => {
                        return (
                          <div
                            key={order?.id}
                            style={{
                              border: "1px solid black",
                              padding: "2px",
                              borderRadius: "4px",
                            }}
                          >
                            <Row>
                              <Col
                                className="text-wrap"
                                style={{ wordBreak: "break-all" }}
                              >
                                {order?.id}
                              </Col>
                              <Col>{order?.newPrice}</Col>
                              <Col>{order?.expiration}</Col>
                            </Row>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ padding: "2px" }}>
                        <Row style={{ textAlign: "center" }}>
                          <Col> No previous orders</Col>
                        </Row>
                      </div>
                    )}
                  </Container>
                  </div>
                   : null}
                </Card>
              );
            })
          : "No registered users"}
      </Stack>
    </>
  );
};

export default AdminManageUsers;
