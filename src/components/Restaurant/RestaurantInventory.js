import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchGroupBagByRestAsync,
  selectBag,
  deleteBagAsync,
} from "../Bag/bagSlice";
import { fetchRestaurantAsync, selectRestaurant } from "./restaurantSlice";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { ListGroup } from "react-bootstrap";

import AddBagForm from "../Bag/AddBagForm";
import EditBagForm from "../Bag/EditBagForm";

const RestaurantInventory = () => {
  const restaurant = useSelector(selectRestaurant);
  const { user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) dispatch(fetchGroupBagByRestAsync(user?.userId));
    if (user?.userId) dispatch(fetchRestaurantAsync(user?.userId));
  }, [dispatch, user?.userId]);

  const restaurantId = user?.userId;

  const deletethisbag = async (bagId) => {
    try {
      await dispatch(deleteBagAsync(bagId));
      dispatch(fetchGroupBagByRestAsync(restaurantId));
    } catch (err) {}
  };

  const bags = useSelector(selectBag);

  const checkActive = (expir, quant) => {
    const parts = expir.split("-");
    const expdate = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = new Date();
    if (expdate.getTime() >= today.getTime() && quant > 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(fetchGroupBagByRestAsync(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <Card
      style={{
        width: "90%",
        padding: "10px",
        border: "3px solid #41ead4",
        marginBottom: "8px",
      }}
    >
      <Card.Title style={{ fontWeight: "700", textAlign: "center" }}>
        {restaurant.restaurantName} - Inventory
      </Card.Title>
      <Card.Text>
        Welcome to {restaurant.restaurantName} @ {restaurant.address}!
      </Card.Text>
      <Card.Text>
        If you need to change your restaurant's information, please visit{" "}
        <Card.Link href="/restaurantprofile">
          {" "}
          your restaurant profile{" "}
        </Card.Link>
        .
      </Card.Text>

      <AddBagForm restaurant={restaurantId} />

      <Card style={{ padding: "10px" }}>
        <Card.Title style={{ fontWeight: "700" }}>Active Bags</Card.Title>

        <ListGroup>
          {bags.length > 0
            ? bags.map((bag) => {
                if (checkActive(bag.expiration, bag.quantity) === true) {
                  return (
                    <ListGroup.Item
                      style={{
                        border: ".8px solid black",
                        margin: "10px",
                        padding: "10px",
                        width: "90%",
                      }}
                      eventKey={`${bag.id}`}
                    >
                      <b>{bag.type}</b> SuperBag ~ <b>Expires:</b>{" "}
                      {bag.expiration} ~ <b>Quantity:</b> {bag.quantity} ~{" "}
                      <b>Pickup:</b> {bag.pickup} ~ <b>Price:</b> $
                      {bag.newPrice} ~ <b>Original Price:</b> $
                      {bag.originalPrice}
                      <Accordion>
                        <Accordion.Item eventKey="active-0">
                          <Accordion.Header>Edit Bag </Accordion.Header>
                          <Accordion.Body>
                            <EditBagForm bag={bag} />
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="active-1">
                          <Accordion.Header>Delete Bag </Accordion.Header>
                          <Accordion.Body>
                            <Button
                              onClick={() => {
                                let id = bag.id;
                                deletethisbag(id);
                              }}
                            >
                              Delete Bag
                            </Button>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </ListGroup.Item>
                  );
                } else {
                  return null;
                }
              })
            : "No active bags"}
        </ListGroup>
        <div></div>
      </Card>

      <Card style={{ padding: "10px", backgroundColor: "lightgray" }}>
        <Card.Title style={{ fontWeight: "700" }}> Inactive Bags</Card.Title>
        <ListGroup>
          {bags.length > 0
            ? bags.map((bag) => {
                if (checkActive(bag.expiration, bag.quantity) === false) {
                  return (
                    <ListGroup.Item
                      style={{
                        border: ".8px solid black",
                        margin: "10px",
                        padding: "10px",
                        width: "90%",
                      }}
                      eventKey={`${bag.id}`}
                    >
                      <b>{bag.type}</b> SuperBag ~ <b>Expires:</b>{" "}
                      {bag.expiration} ~ <b>Quantity:</b> {bag.quantity} ~{" "}
                      <b>Pickup:</b> {bag.pickup} ~ <b>Price:</b> $
                      {bag.newPrice} ~ <b>Original Price:</b> $
                      {bag.originalPrice}
                      <Accordion>
                        <Accordion.Item eventKey="inactive-0">
                          <Accordion.Header>Edit Bag </Accordion.Header>
                          <Accordion.Body>
                            <EditBagForm bag={bag} />
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="inactive-1">
                          <Accordion.Header>Delete Bag </Accordion.Header>
                          <Accordion.Body>
                            <Button
                              onClick={() => {
                                let id = bag.id;
                                deletethisbag(id);
                              }}
                            >
                              Delete Bag
                            </Button>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </ListGroup.Item>
                  );
                } else {
                  return null;
                }
              })
            : "No inactive bags"}
        </ListGroup>
      </Card>
    </Card>
  );
};

export default RestaurantInventory;
