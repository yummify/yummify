import React, { useEffect, useState } from "react";
import {
  fetchAllRestaurants,
  selectRestaurants,
} from "../AllRestaurants/allRestaurantsSlice";
import {
  approveStatusRestaurantAsync,
  denyStatusRestaurantAsync,
  deleteRestaurantAsync
} from "../SingleRestaurantUserView/singleRestaurantSlice";
import { editRestaurantAsync } from "../Restaurant/restaurantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ListGroup,
  Stack,
  Button,
  Alert,
  Accordion,
  Modal,
  Form
} from "react-bootstrap";

const AdminManageRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);

  const [restaurantsList, setRestaurantsList] = useState(restaurants);
  const [showSuspend, setShowSuspend] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  //NOTE: check to see if open and closed are removed from DB.
  // if so, remove from thunk as well.
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [EIN, setEIN] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [website, setWebsite] = useState("");

  const pendingRestaurants = [];
  for (const rest of restaurants) {
    if (rest.status === "pending") {
      pendingRestaurants.push(rest);
    }
  }

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch, restaurantsList]);

  const handleCloseSuspend = () => setShowSuspend(false);
  const handleOpenSuspend = () => setShowSuspend(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleOpenDelete = () => setShowDelete(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleOpenEdit = () => setShowEdit(true);

  const handleSuspend = async (restaurantId) => {
    await dispatch(denyStatusRestaurantAsync(restaurantId));
    setRestaurantsList(restaurants);
    setShowSuspend(false);
  };

  const handleApprove = async (restaurantId) => {
    await dispatch(approveStatusRestaurantAsync(restaurantId));
    setRestaurantsList(restaurants);
  };

  const handleDelete = async (restaurantId) => {
    await dispatch(deleteRestaurantAsync(restaurantId));
    setRestaurantsList(restaurants);
    setShowDelete(false);
  };

  const editRestaurant = () => {
    const reqbody = {
      restaurantId: restaurantData.id,
      restaurantName: restaurantName
        ? restaurantName
        : restaurantData.restaurantName,
      cuisine: cuisine ? cuisine : restaurantData.cuisine,
      description: description ? description : restaurantData.description,
      address: address ? address : restaurantData.address,
      open: open ? open : restaurantData.open,
      close: close ? close : restaurantData.close,
      website: website ? website : restaurantData.website,
      EIN: EIN ? EIN : restaurantData.EIN,
      phoneNumber: phoneNumber ? phoneNumber : restaurantData.phoneNumber,
      zipcode: zipcode ? zipcode : restaurantData.zipcode,
    };
    dispatch(editRestaurantAsync(reqbody));
  };

  // NOTE: PAUSED EDIT RESTAURANT. WILL FINISH IF TIME OR DELETE IF NOT.

  const cancelEdit = () => {
    setRestaurantName(restaurantData.restaurantName);
    setCuisine(restaurantData.cuisine);
    setAddress(restaurantData.address);
    setDescription(restaurantData.description);
    setPhoneNumber(restaurantData.phoneNumber);
    setEIN(restaurantData.EIN);
    setZipcode(restaurantData.zipcode);
    setWebsite(restaurantData.website);
    handleCloseEdit();
  }

  return (
    <>
      <h2 id='title'>Manage Restaurants</h2>
      <Alert variant={"warning"}>
        <Accordion defaultActiveKey="0">
          <h2>
            {pendingRestaurants.length} restuarant(s) are waiting for approval.
          </h2>
          {restaurants.length > 0
            ? restaurants.map((rest) => {
                let key = 0;
                if (rest.status === "pending") {
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
                          <Button
                            variant="success"
                            onClick={() => handleApprove(rest.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleSuspend(rest.id)}
                          >
                            Deny
                          </Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                }
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
                          <Button onClick={() => {
                            setRestaurantData(rest);
                            console.log(restaurantData);
                            handleOpenEdit()
                          }}>Edit Restaurant</Button>
                          <Modal
                            show={showEdit}
                            onHide={handleCloseEdit}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Edit {restaurantData?.restaurantName}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               <Form>
                                {/*<Form.Group>
                                  <Form.Label>Restaurant Name: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.restaurantName}
                                    onChange={(event) => setRestaurantName(event.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Cuisine: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.cuisine}
                                    onChange={(event) => setCuisine(event.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Description: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.description}
                                    onChange={(event) => setDescription(event.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Address: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.address}
                                    onChange={(event) => setAddress(event.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Phone Number: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Zip Code: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.zipcode}
                                    onChange={(event) => setZipcode(event.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Website: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.website}
                                    onChange={(event) => setWebsite(event.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>EIN: </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder={restaurantData.EIN}
                                    onChange={(event) => setEIN(event.target.value)}
                                  />
                                </Form.Group>*/}
                                <Button onClick={editRestaurant}>Save</Button>
                                <Button onClick={cancelEdit}>Cancel</Button>
                              </Form> 
                            </Modal.Body>
                          </Modal>
                          <div className="vr" />
                          <Button onClick={() => {
                            setModalData(rest.id);
                            handleOpenSuspend()}}>
                            Suspend Restaurant
                          </Button>
                          <Modal
                              show={showSuspend}
                              onHide={handleCloseSuspend}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Suspend Restaurant</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Are you sure you want to suspend this
                                restaurant?
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleCloseSuspend}
                                >
                                  No, do not suspend.
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    handleSuspend(modalData)}}
                                >
                                  Yes, suspend.
                                </Button>
                              </Modal.Footer>
                            </Modal>
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
          <h2>Suspended Restaurants:</h2>
          {restaurants.length > 0
            ? restaurants.map((rest) => {
                if (rest.status === "suspended") {
                  return (
                    <Accordion.Item eventKey={`${restaurants.indexOf(rest)}`}>
                      <Accordion.Header>{rest.restaurantName}</Accordion.Header>
                      <Accordion.Body>
                        <p>EIN: {rest.EIN}</p>
                        <p>Phone: {rest.phoneNumber}</p>
                        <p>Description: {rest.description}</p>
                        <div>
                          <Button
                            variant="success"
                            onClick={() => handleApprove(rest.id)}
                          >
                            Un-suspend
                          </Button>
                          
                          <Button variant="danger" onClick={() => {
                            setModalData(rest.id);
                            handleOpenDelete();
                          }}>Delete Restaurant
                          </Button>
                          <Modal
                            show={showDelete}
                            onHide={handleCloseDelete}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Delete Restaurant</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delte this restaurant? This action cannot be undone.
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleCloseDelete}
                              >
                                No, do not delete.
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => {
                                  handleDelete(modalData)
                                }}
                              >
                                Yes, delete.
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                }
              })
            : null}
        </Accordion>
      </Alert>
    </>
  );
};

export default AdminManageRestaurants;
