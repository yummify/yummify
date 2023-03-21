import React, { useEffect, useState } from "react";
import {
  fetchAllRestaurants,
  selectRestaurants,
} from "../AllRestaurants/allRestaurantsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ListGroup, Stack, Button, Alert, Accordion } from "react-bootstrap";

const AdminManageRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);

  const pendingRestaurants = [];
  for (const rest of restaurants) {
    if (rest.status === "pending") {
      pendingRestaurants.push(rest);
    }
  }

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  // TODO:
  // functions for edit & suspend
  // admin able to see previous orders!!!
  // CHANGE 'EDIT RESTAURANT' TO 'MESSAGE RESTAURANT'?

  return (
    <>
      <h2>Manage Restaurants</h2>
      <Alert variant={"warning"}>
        <Accordion defaultActiveKey="0">
          <h2>
            {pendingRestaurants.length} restuarant(s) are waiting for approval.
          </h2>
          {pendingRestaurants.length > 0
            ? pendingRestaurants.map((rest) => {
                return (
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{rest.name}</Accordion.Header>
                    <Accordion.Body>
                      <p>EIN: {rest.ein}</p>
                      <p>Address: {rest.address}</p>
                      <p>
                        Hours of Operation: {rest.open} - {rest.close}
                      </p>
                      <p>Cuisine: {rest.cuisine}</p>
                      <p>Phone: {rest.phone}</p>
                      <p>Description: {rest.description}</p>
                      <div>
                        <Button variant="success">Approve</Button>
                        <Button variant="danger">Deny</Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })
            : null}
        </Accordion>
      </Alert>
      <ListGroup>
        {restaurants.length > 0
          ? restaurants.map((rest) => {
              if (rest.status === "approved") {
                return (
                  <div>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                      <Stack direction="horizontal" gap={4}>
                        <div className="ms-2 me-auto">
                          <div
                            className="fw-bold"
                            style={{ fontSize: "1.5rem" }}
                          >
                            {rest.name}
                          </div>
                          <h5>{rest.cuisine}</h5>
                          <h6>{rest.address}</h6>
                          <p>{rest.phone}</p>
                        </div>
                        <div>
                          <Button>Edit Restaurant</Button>
                          <div className="vr" />
                          <Button>Suspend Restaurant</Button>
                        </div>
                      </Stack>
                    </ListGroup.Item>
                  </div>
                );
              }
            })
          : "No restaurants registered"}
      </ListGroup>
    </>
  );
};

export default AdminManageRestaurants;
