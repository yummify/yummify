import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Container, Row } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  fetchRestaurantAsync,
  selectRestaurant,
  editRestaurantImageAsync,
} from "./restaurantSlice";
import { useAuth } from "../../contexts/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const RestaurantProfile = () => {
  const [fileUrl, setFileUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);

  const authRestaurant = useSelector(selectRestaurant);
  console.log("authrestaurant:", authRestaurant);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) dispatch(fetchRestaurantAsync(user?.userId));
  }, [dispatch, user?.userId, fileUrl]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (event) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `restaurants/${imageFile.name}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        dispatch(editRestaurantImageAsync({ restaurantId, url })).then(() => {
          console.log("file updated");
        });
      });
    });
    const restaurantId = user?.userId;
    setUpload(false);
  };

  return (
    <div>
      {user?.userId && (
        <div>
          <Container>
            <Row>
              <div className="d-flex text-black">
                <Col>
                  <div
                    className="flex-shrink-0 d-flex flex-column"
                    style={{ marginTop: "5rem", marginLeft: "1rem" }}
                  >
                    <Image
                      fluid
                      src={fileUrl ? fileUrl : authRestaurant.image}
                      alt="image of restaurant"
                      thumbnail
                      style={{ width: "100px", borderRadius: "10px" }}
                    />
                    {!upload && (
                      <Button
                        onClick={() => setUpload(true)}
                        style={{ padding: "0.2rem", marginTop: "1rem" }}
                      >
                        Upload Photo
                      </Button>
                    )}
                    {upload && (
                      <div className="my-3 d-block">
                        <input
                          type="file"
                          onChange={(event) =>
                            setImageFile(event.target.files[0])
                          }
                        />
                        <Button className="my-3" onClick={handleImage}>
                          Add Photo
                        </Button>
                      </div>
                    )}
                  </div>
                </Col>
                <Col>
                  <div
                    className="flex-grow-1 ms-3"
                    style={{ marginTop: "5rem" }}
                  >
                    <h1>{authRestaurant?.restaurantName}</h1>
                    <p>Email :{authRestaurant?.email}</p>
                    <p>Cuisine :{authRestaurant?.cuisine}</p>
                    <p>Description :{authRestaurant?.description}</p>
                    <p>Address :{authRestaurant?.address}</p>
                    <p>Open :{authRestaurant?.open}</p>
                    <p>Close :{authRestaurant?.close}</p>
                    <p>EIN :{authRestaurant?.EIN}</p>
                    <p>Role :{authRestaurant?.role}</p>
                    <p>Status :{authRestaurant?.status}</p>
                    <p>PhoneNumber:{authRestaurant?.phoneNumber}</p>
                    <p>Zipcode:{authRestaurant.zipcode}</p>
                    <p>Terms :{authRestaurant?.terms}</p>
                    <Button onClick={() => navigate("/editrestaurantprofile")}>
                      Edit Restaurant Profile
                    </Button>
                  </div>
                </Col>
              </div>
            </Row>
          </Container>
        </div>
      )}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default RestaurantProfile;
