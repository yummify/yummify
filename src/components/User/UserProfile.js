import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Image,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
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
import { fetchRestaurantAsync } from "../Restaurant/restaurantSlice";

// This component is used to display the User profile page
const UserProfile = () => {
  const [fileUrl, setFileUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const authuser = useSelector(selectUser);

  const { user, loading } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let orders = useSelector(selectOrders);

  const [orderHistory, setOrderHistory] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  const restaurants = [];

  // This will load the UserProfile details and User's order history on mount
  useEffect(() => {
    if (user?.userId) dispatch(fetchUserAsync(user?.userId));
    const orderHis = [];
    dispatch(fetchUserOrdersAsync(user.userId)).then(async (res) => {
      const orders = res.payload;
      for (const order of orders) {
        const res = await dispatch(
          fetchRestaurantAsync(order.order.restaurantId)
        );
        restaurants.push(res.payload);
      }
      for (const order of orders) {
        for (const restaurant of restaurants) {
          if (
            restaurant &&
            restaurant?.restaurantId === order?.order?.restaurantId
          ) {
            orderHis.push({ order, restaurant });
            break;
          }
        }
      }
      setOrderHistory(orderHis);
    });
  }, [dispatch, user?.userId, fileUrl]);

  const handleImage = async (event) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `users/${imageFile.name}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      setImgLoading(true);
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        setImgLoading(false);
        dispatch(editUserImageAsync({ userId, url })).then(() => {});
      });
    });
    const userId = user.userId;
    setUpload(false);
  };

  return (
    <div>
      {user?.userId && (
        <div>
          <Container className="my-3 border">
            <Row>
              <Col
                style={{
                  border: "3px solid #41ead4",
                }}
                className="text-center my-3 mx-3"
              >
                <h1 className="my-3">{authuser?.name}</h1>
                <Col className="text-center my-3 mx-3 border">
                  {imgLoading ? (
                    <div>
                      Loading...
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <Image
                      fluid
                      src={fileUrl ? fileUrl : authuser.image}
                      alt="image of user"
                      thumbnail
                      className="my-3"
                      style={{ width: "150px", borderRadius: "10px" }}
                    />
                  )}
                  {!upload && (
                    <Button
                      onClick={() => setUpload(true)}
                      className="d-block my-3 mx-auto"
                    >
                      Upload Photo
                    </Button>
                  )}
                  {upload && (
                    <Col className="my-3 text-center">
                      <input
                        type="file"
                        onChange={(event) =>
                          setImageFile(event.target.files[0])
                        }
                      />
                      <div>
                        <Button className="my-3" onClick={handleImage}>
                          Add Photo
                        </Button>
                        <Button
                          className="mx-3"
                          onClick={() => setUpload(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  )}
                </Col>
                <p>
                  <span style={{ fontWeight: "700" }}>Email: </span>
                  {authuser?.email}
                </p>
                <p>
                  <span style={{ fontWeight: "700" }}>Phone Number: </span>
                  {authuser?.phoneNumber}
                </p>
                <p>
                  <span style={{ fontWeight: "700" }}>Zipcode: </span>
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
              {/* </Col> */}
            </Row>
            <Row>
              <Col>
                <h2>Order History</h2>

                {orderHistory?.length > 0 ? (
                  <Table striped bordered hover responsive="sm">
                    <thead >
                      <tr>
                        <th>Order #</th>
                        <th>Restaurant Name</th>
                        <th>Expiration</th>
                        <th>Price</th>
                        <th>Pickup</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderHistory.map((hist) => {
                        return (
                          <tr key={hist?.order?.orderId}>
                            <td>{hist?.order?.orderId}</td>
                            <td>{hist?.restaurant?.restaurantName}</td>
                            <td>{hist?.order?.order?.expiration}</td>
                            <td>
                              {(
                                hist?.order?.order?.newPrice +
                                hist?.order?.order?.newPrice * 0.0875
                              ).toFixed(2)}
                            </td>
                            <td>{hist?.order?.order?.pickup}</td>
                            <td>{hist?.order?.order?.quantity}</td>
                            <td>{hist?.order?.order?.status}</td>
                            <td>{hist?.order?.order?.type}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <p>There are no orders associated with this user</p>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
