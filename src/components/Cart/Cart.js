import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Alert, Card, Stack, Button, Badge } from "react-bootstrap";
import {
  fetchUserOrdersAsync,
  selectOrders,
  deleteOrderAsync,
  markComplete,
} from "../Order/orderSlice";
import { editBagQuantityAsync } from "../Bag/bagSlice";
import {
  fetchAllRestaurants,
  selectRestaurants,
} from "../AllRestaurants/allRestaurantsSlice";

const Cart = () => {
  //const [confirmation, setConfirmation] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get id of logged-in user
  const { user } = useAuth();
  const userId = user.userId;

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(userId));
    dispatch(fetchAllRestaurants());
  }, [dispatch, userId]);

  const allorders = useSelector(selectOrders);
  const restaurants = useSelector(selectRestaurants);

  //calculate NYC sales tax and find total price
  const totalPrice = (price) => {
    let tax = price * 0.0875;
    return (tax + price).toFixed(2);
  };

  //calculate savings
  const savings = (oldPrice, newPrice) => {
    let savings = oldPrice - newPrice;
    return savings.toFixed(2);
  };

  const handleCheckout = async (orderId, bagId) => {
    await dispatch(markComplete(orderId));
    await dispatch(editBagQuantityAsync(bagId));
    navigate("/checkout");
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await dispatch(deleteOrderAsync(orderId));
      dispatch(fetchUserOrdersAsync(userId));
    } catch (err) {}
  };

  const orders = allorders.filter((order) => order.status === "shopping");

  return (
    <>
      <Alert variant={"warning"}>
        Remember: the contents of this bag are a SURPRISE!
      </Alert>
      <Stack>
        {orders?.length > 0 &&
          orders.map((order, index) => {
            if (order.status === "shopping") {
              const restId = order.restaurantId;
              const rest = restaurants.find((rest) => rest.id === restId);

              return (
                <Card>
                  <Button
                    variant="outline-dark"
                    className="text-right"
                    style={{ textAlign: "right" }}
                    onClick={() => {
                      handleDeleteOrder(order.id);
                    }}
                  >
                    {" "}
                    Delete Bag{" "}
                  </Button>
                  <Stack direction="horizontal">
                    <Card.Header>
                      <Card.Img
                        src="https://media.istockphoto.com/id/184395659/photo/brown-paper-bag-and-apple.jpg?s=612x612&w=0&k=20&c=MLpwawtbge0roehL_8LF638qGxBXrIWdDlItyrLxQ-s="
                        style={{ width: "20vw" }}
                      ></Card.Img>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        {order.type} SuperBag @ {rest?.restaurantName}{" "}
                      </Card.Title>
                      <Card.Text>
                        <span style={{ fontWeight: "700" }}>
                          Pickup Window:{" "}
                        </span>
                        {order.pickup}, {order.address}
                      </Card.Text>
                    </Card.Body>
                  </Stack>
                  <Card.Footer style={{ textAlign: "right" }}>
                    <Stack direction="horizontal">
                      <Card.Text style={{ margin: "5px" }}>
                        <s>Original Price: ${order.originalPrice.toFixed(2)}</s>
                      </Card.Text>
                      <Card.Text style={{ margin: "5px" }}>
                        New Price: ${order.newPrice.toFixed(2)}
                      </Card.Text>
                    </Stack>
                  </Card.Footer>
                  <Alert variant={"danger"}>
                    Note: This app is a Capstone Project. Orders will not
                    actually be sent to these restaurants, and credit cards will
                    not actually be charged.{" "}
                  </Alert>
                  <Card style={{ width: "100%" }}>
                    <Card.Header style={{width: "100%", backgroundColor: "lightgray", textAlign: "center"}}>Prices</Card.Header>
                    
                    <p>
                      <span style={{ fontWeight: "700" }}>Total Savings: </span>
                      ${savings(order.originalPrice, order.newPrice)}
                    </p>
                    <div></div>
                    <p>
                      <span style={{ fontWeight: "700" }}>Price: </span>$
                      {(order.newPrice).toFixed(2)}
                    </p>
                    <div></div>
                    <p>
                      <span style={{ fontWeight: "700" }}>Taxes: </span>$
                      {(order.newPrice * 0.0875).toFixed(2)}
                    </p>
                    <div></div>
                    <p>
                      <Button
                        onClick={() => {
                          handleCheckout(order.id, order.bagId);
                        }}
                      >
                        Checkout: ${totalPrice(order.newPrice)}
                      </Button>
                    </p>
                  </Card>
                </Card>
              );
            }
          })}

        {orders?.length === 0 && (
          <Card>
            <p>Your cart is empty</p>{" "}
            <Card.Link href="/restaurants">Return to Browse</Card.Link>
          </Card>
        )}
      </Stack>
    </>
  );
};

export default Cart;
