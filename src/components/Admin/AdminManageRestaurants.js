import React, { useEffect, useState } from "react";
import {
  fetchAllRestaurants,
  selectRestaurants,
} from "../AllRestaurants/allRestaurantsSlice";
import { approveStatusRestaurantAsync } from "../SingleRestaurantUserView/singleRestaurantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ListGroup, Stack, Button, Alert, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminManageRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);
  const navigate = useNavigate();

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
  // function to delete restaurant
  // admin able to see previous orders!!!
  // use different method for counting # of restaurants pending?

  const handleSuspend = async () => {

  };

  const handleApprove = async (restaurantId) => {
    await dispatch(approveStatusRestaurantAsync(restaurantId));
    navigate('/')
  };

  return (
    <>
      <h2>Manage Restaurants</h2>
      <Alert variant={"warning"}>
        <Accordion defaultActiveKey="0">
          <h2>
            {pendingRestaurants.length} restuarant(s) are waiting for approval.
          </h2>
          {restaurants.length > 0
          ? restaurants.map((rest) => { 
            let key = 0;
            if (rest.status === 'pending') {
              return (
                  <Accordion.Item eventKey={`${restaurants.indexOf(rest)}`}>
                    <Accordion.Header>{rest.restaurantName}</Accordion.Header>
                    <Accordion.Body>
                      <p>Address: {rest.address}</p>
                      <p>Cuisine: {rest.cuisine}</p>
                      <p>Phone: {rest.phoneNumber}</p>
                      <p>Description: {rest.description}</p>
                      <p>EIN: {rest.EIN}</p>
                      <div>
                        <Button variant="success" onClick={() => handleApprove(rest.id)}>Approve</Button>
                        <Button variant="danger">Deny</Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );}
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
                            {rest.restaurantName}
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
      <Alert variant={"danger"}>
        <Accordion defaultActiveKey="0">
          <h2>
            Suspended Restaurants:
          </h2>
          {restaurants.length > 0
          ? restaurants.map((rest) => { 
            if (rest.status === 'suspended') {
              return (
                  <Accordion.Item eventKey={`${restaurants.indexOf(rest)}`}>
                    <Accordion.Header>{rest.restaurantName}</Accordion.Header>
                    <Accordion.Body>
                      <p>EIN: {rest.EIN}</p>
                      <p>Phone: {rest.phoneNumber}</p>
                      <p>Description: {rest.description}</p>
                      <div>
                        <Button variant="success">Un-suspend</Button>
                        <Button variant="danger">Delete Restaurant</Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );}
              })
            : null}
        </Accordion>
      </Alert>
    </>
  );
};

export default AdminManageRestaurants;
