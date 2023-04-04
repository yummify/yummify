import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { placeBagInCartAsync } from "../Cart/cartBagSlice";
import { fetchOrderByStatusAsync, selectOrders } from "../Order/orderSlice";
import { selectUser } from "../User/userSlice";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Bag = (restaurant) => {
  const {
    id,

    newPrice,
    originalPrice,
    pickup,
    type,
  } = restaurant.bag;

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const orders = useSelector(selectOrders);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrderByStatusAsync(userInfo.userId, "shopping"));
  }, [dispatch, userInfo.userId]);

  const handleAdd = async () => {
    if (orders.length === 0) {
      await dispatch(
        placeBagInCartAsync({ ...restaurant.bag, userId: userInfo.userId })
      );
      dispatch(fetchOrderByStatusAsync(userInfo.userId, "shopping"));
      navigate("/cart");
    } else {
      return null;
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          <b>{type} Surprise Bag</b>
        </Card.Title>
        <Card.Text>
          <b>Pickup:</b> {pickup}
        </Card.Text>
        <Card.Text>
          <b>Price:</b> ${Number(newPrice).toFixed(2)} <br />
          <span style={{ fontSize: "12px" }}>
            <b>Original:</b> <s>${Number(originalPrice).toFixed(2)}</s>
          </span>
        </Card.Text>
        {orders.length > 0 ? (
          <p
            style={{
              backgroundColor: "lightgrey",
              borderRadius: "4px",
              border: "1px solid black",
            }}
          >
            <i>
              You can only reserve one surprise bag at a time. Click{" "}
              <Link to="/cart">here</Link> to see what's in your cart!
            </i>
          </p>
        ) : (
          <Button variant="primary" onClick={handleAdd}>
            Reserve
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Bag;
