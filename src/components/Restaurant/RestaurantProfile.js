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
import { selectAuth } from "../Auth/authSlice";
//import { useAuth } from "../../contexts/AuthContext";
import { useAuthRes } from "../../contexts/AuthResContext";
import { app } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const RestaurantProfile = () => {
  //const authUser = useSelector(selectAuth);
  const [fileUrl, setFileUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const authRestaurant = useSelector(selectRestaurant);
  console.log("authrestaurant:", authRestaurant);
  //console.log("AuthUser id:", authUser.userId);
  //const [loading, setLoading] = useState(true);
  //console.log("Auth User:", auth.currentUser.uid);
  const { restaurant } = useAuthRes();
  console.log("restaurant from AuthContext:", restaurant);
  // console.log("User from auth context:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurant?.restaurantId)
      dispatch(fetchRestaurantAsync(restaurant?.restaurantId));
  }, [restaurant?.restaurantId, fileUrl]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/restaurantstart");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (event) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `restaurants/${imageFile.name}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(editRestaurantImageAsync({ restaurantId, url })).then(() => {
          console.log("file updated");
          setFileUrl(url);
        });
      });
    });
    const restaurantId = restaurant.restaurantId;
    setUpload(false);
    //________________________________//
    // const file = event.target.files[0];
    // console.log("FileName:", file.name);
    // const storage = getStorage();
    // const storageRef = ref(storage, file.name);
    // const fileRef = storageRef.child(file.name);
    // await fileRef.put(file);
    // setFileUrl(await fileRef.getDownloadURL());
  };

  const [upload, setUpload] = useState(false);

  return (
    <div>
      {restaurant?.restaurantId && (
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
