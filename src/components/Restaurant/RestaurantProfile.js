import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Container, Row,Spinner } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
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
  const [imgLoading, setImgLoading] = useState(false);

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
      setImgLoading(true);
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        setImgLoading(false);
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
            <h1 className="my-3">{authRestaurant?.restaurantName}</h1>
            <Col className="text-center my-3 mx-3 border">
            {imgLoading ? <div>
          Loading...
          <Spinner animation="border" />
        </div> :
                <Image
                  fluid
                  src={
                    fileUrl
                      ? fileUrl
                      : authRestaurant?.image?.[0]
                  }
                  alt="image of restaurant"
                  thumbnail
                  className="my-3"
                  style={{ width: "150px", borderRadius: "10px" }}
                />}

                {!upload && (
                  <Button
                    onClick={() => setUpload(true)}
                    className="d-block my-3 mx-auto"
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
                    <div>
                    <Button className="my-3" onClick={handleImage}>
                      Add Photo
                    </Button>
                    <Button className="mx-3"onClick={() => setUpload(false)}>Cancel</Button>
                    </div>
                  </Col>

                )}
              </Col>
              {/* <Col className="border my-3 mx-3 text-center"> */}
                
                <p><span style={{fontWeight : "700"}}>Email: </span>{authRestaurant?.email}</p>
                <p><span  style={{fontWeight : "700"}}>Cuisine: </span>{authRestaurant?.cuisine}</p>
                <p><span  style={{fontWeight : "700"}}>Description: </span>{authRestaurant?.description}</p>
                <p><span  style={{fontWeight : "700"}}>Address: </span>{authRestaurant?.address}</p>
                <p><span  style={{fontWeight : "700"}}>EIN: </span>{authRestaurant?.EIN}</p>
                <p><span  style={{fontWeight : "700"}}>
                  Status: </span>
                  {authRestaurant?.status === "pending" ||
                  authRestaurant?.status === "editpending"
                    ? "Request sent to Admin for approval"
                    : "Restaurant got added/updated in Yummify"}
                </p>
                <p><span   style={{fontWeight : "700"}}>PhoneNumber: </span>{authRestaurant?.phoneNumber}</p>
                <p><span   style={{fontWeight : "700"}}>Zipcode: </span>{authRestaurant.zipcode}</p>
                <p><span   style={{fontWeight : "700"}}>
                  Website: </span><Link to={authRestaurant.website} target="_blank">{authRestaurant.website}</Link>
                </p>
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
