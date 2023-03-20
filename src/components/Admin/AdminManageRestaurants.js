import React, { useEffect } from "react";
import {
  fetchAllRestaurants,
  selectRestaurants,
} from "../AllRestaurants/allRestaurantsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ListGroup, Stack, Button } from "react-bootstrap";

const AdminManageRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);

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
      <ListGroup>
        {restaurants.length > 0
          ? restaurants.map((rest) => {
              return (
                
                  <div>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <Stack direction="horizontal" gap={4}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold" style={{ fontSize: "1.5rem" }}>
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
            })
          : "No restaurants registered"}
      </ListGroup>
    </>
  );
};

export default AdminManageRestaurants;
