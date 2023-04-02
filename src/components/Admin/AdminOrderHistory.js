import React, { useEffect } from "react";
import { fetchAllOrdersAsync, selectOrders } from "../Order/orderSlice";
import { fetchAllRestaurants } from "../AllRestaurants/allRestaurantsSlice";
import { selectRestaurants } from "../AllRestaurants/allRestaurantsSlice";
import { selectUsers, fetchUsersAsync } from "../Users/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ListGroup, Stack } from "react-bootstrap";

const AdminOrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const restaurants = useSelector(selectRestaurants);
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
    dispatch(fetchAllRestaurants());
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <>
      <h2 style={{ fontWeight: "700", textAlign: "center" }}>Order History</h2>
      <ListGroup
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {orders.map((order) => {
          const restId = order.restaurantId;
          const rest = restaurants.find((rest) => rest.id === restId);
          const userId = order.userId;
          const orderUser = users.find((user) => user.userId === userId);

          return (
            <ListGroup.Item
              style={{
                border: "2px solid #41ead4",
                margin: "10px",
                padding: "10px",
                width: "20rem",
                borderRadius: "5px",
              }}
              key={order.id}
            >
              <h4>
                <span style={{ fontWeight: "700" }}>Order </span>#{order.id}
              </h4>
              <h6>
                <span style={{ fontWeight: "700" }}>Restaurant: </span>
                {rest?.restaurantName}
              </h6>
              <p>
                <span style={{ fontWeight: "700" }}>Status: </span>
                {order.status}
              </p>
              <p>
                <span style={{ fontWeight: "700" }}>Ordered By: </span>
                {orderUser?.data.name}
              </p>
              <p>
                <span style={{ fontWeight: "700" }}>Pickup Time: </span>
                {order.pickup}, on {order.expiration}
              </p>
              <Stack direction="horizontal">
                <h6 style={{ textDecoration: "line-through" }}>
                  Original Price: ${order.originalPrice}
                </h6>
                <div style={{ margin: "5px" }}></div>
                <h6>
                  <span style={{ fontWeight: "700" }}> New Price: </span>$
                  {order.newPrice}
                </h6>
              </Stack>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default AdminOrderHistory;
