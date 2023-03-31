import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Container, Row, Spinner } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  fetchUserAsync,
  editUserImageAsync,
  selectUser,
} from "../User/userSlice";
import { fetchUserOrdersAsync, selectOrders } from "./userOrdersSlice";

import { useAuth } from "../../contexts/AuthContext";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const UserProfile = () => {
  const [fileUrl, setFileUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const authuser = useSelector(selectUser);
  console.log("authuser:", authuser);
  const { user, loading } = useAuth();
  console.log("User from AuthContext:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log("Orders:", orders);
  console.log("Orderdata:", orders.length);

  useEffect(() => {
    if (user?.userId) dispatch(fetchUserAsync(user?.userId));
  }, [dispatch, user?.userId, fileUrl, orders]);

  const handleImage = async (event) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `users/${imageFile.name}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        dispatch(editUserImageAsync({ userId, url })).then(() => {
          console.log("file updated");
        });
      });
    });
    const userId = user.userId;
    setUpload(false);
  };

  const handleOrderHistory = () => {
    dispatch(fetchUserOrdersAsync(user.userId));
  };

  return (
    <div>
      {loading && (
        <div>
          Loading...
          <Spinner animation="border" />
        </div>
      )}
      {user?.userId && (
        <div>
          <Container className="border my-3">
            <Row>
              <Col className="text-center my-3 mx-3 border">
                <Image
                  fluid
                  src={fileUrl ? fileUrl : authuser.image}
                  alt="image of user"
                  thumbnail
                  className="my-3"
                  style={{ width: "150px", borderRadius: "10px" }}
                />
                {!upload && (
                  <Button
                    onClick={() => setUpload(true)}
                    style={{ padding: "0.2rem", marginTop: "1rem" }}
                    className="d-block my-3 mx-auto"
                  >
                    Upload Photo
                  </Button>
                )}
                <Button onClick={handleOrderHistory}>Order History</Button>
                {upload && (
                  <Col className="my-3 text-center">
                    <input
                      type="file"
                      onChange={(event) => setImageFile(event.target.files[0])}
                    />
                    <Button className="my-3 d-block" onClick={handleImage}>
                      Add Photo
                    </Button>
                  </Col>
                )}
              </Col>
              <Col className="border my-3 mx-3 text-center">
                <h1 className="my-3">{authuser?.name}</h1>
                <p>
                  <strong>Email: </strong>
                  {authuser?.email}
                </p>
                <p>
                  {" "}
                  <strong>Phone Number: </strong>
                  {authuser?.phoneNumber}
                </p>
                <p>
                  {" "}
                  <strong>Zipcode: </strong>
                  {authuser.zipcode}
                </p>
                <Button
                  className="mx-3"
                  onClick={() => navigate("/edituserprofile")}
                >
                  Edit User Profile
                </Button>
                <Button
                  className="mx-3 my-3"
                  onClick={() => navigate("/updatepassword")}
                >
                  Update password
                </Button>
              </Col>
              <Col>
                {orders.length > 0 &&
                  orders.map((order) => {
                    <Container>
                      <p>OrderId:{order.orderId}</p>
                      <p>Expiration:{order.data.expiration}</p>
                      <p>NewPrice:{order.data.newPrice}</p>
                      <p>Pickup:{order.data.pickup}</p>
                      <p>Quantity:{order.data.quantity}</p>
                      <p>Status:{order.data.status}</p>
                      <p>Type:{order.data.type}</p>
                    </Container>;
                  })}
              </Col>
            </Row>
            {/* <Row> */}
            {/* {orders.length >= 0 && orders.map((order) => { */}

            {/* })} */}
            {/* </Row> */}
          </Container>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
