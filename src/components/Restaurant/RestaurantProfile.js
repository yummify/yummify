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
          <Container className="border my-3">
            <Row>
              <Col className="text-center my-3 mx-3 border">
                <Image
                  fluid
                  src={fileUrl ? fileUrl : authRestaurant.image}
                  alt="image of restaurant"
                  thumbnail
                  className="my-3"
                  style={{ width: "150px", borderRadius: "10px" }}
                />

                {!upload && (
                  <Button
                    onClick={() => setUpload(true)}
                    style={{ padding: "0.2rem", marginTop: "1rem" }}
                    className="d-block my-3"
                  >
                    Upload Photo
                  </Button>
                )}

                {upload && (
                  <Col className="my-3 d-block">
                    <input
                      type="file"
                      onChange={(event) => setImageFile(event.target.files[0])}
                    />
                    <Button className="my-3" onClick={handleImage}>
                      Add Photo
                    </Button>
                  </Col>
                )}
              </Col>
              <Col className="border my-3 mx-3 text-center">
                <h1 className="my-3">{authRestaurant?.restaurantName}</h1>
                <p>Email :{authRestaurant?.email}</p>
                <p>Cuisine :{authRestaurant?.cuisine}</p>
                <p>Description :{authRestaurant?.description}</p>
                <p>Address :{authRestaurant?.address}</p>
                <p>Open :{authRestaurant?.open}</p>
                <p>Close :{authRestaurant?.close}</p>
                <p>EIN :{authRestaurant?.EIN}</p>
                <p>
                  Status :
                  {authRestaurant?.status === "pending" ||
                  authRestaurant?.status === "editpending"
                    ? "Request sent to Admin for approval"
                    : "Restaurant got added/updated in Yummify"}
                </p>
                <p>PhoneNumber :{authRestaurant?.phoneNumber}</p>
                <p>Zipcode :{authRestaurant.zipcode}</p>
                <Button
                  className="mx-3"
                  onClick={() => navigate("/editrestaurantprofile")}
                >
                  Edit Restaurant Profile
                </Button>
                <Button
                  className="mx-3 my-3"
                  onClick={() => navigate("/updatepassword")}
                >
                  Update password
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfile;
