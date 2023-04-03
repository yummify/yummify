import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Container, Row,Spinner } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  fetchUserAsync,
  editUserImageAsync,
  selectUser,
} from "../User/userSlice";

import { useAuth } from "../../contexts/AuthContext";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const AdminProfile = () => {
  const [fileUrl, setFileUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const authuser = useSelector(selectUser);

  const { user } = useAuth();
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) dispatch(fetchUserAsync(user?.userId));
  }, [dispatch, user?.userId, fileUrl]);

 

  const handleImage = async (event) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `users/${imageFile.name}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      setImgLoading(true);
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        setImgLoading(false);
        dispatch(editUserImageAsync({ userId, url })).then(() => {
          
        });
      });
    });
    const userId = user.userId;
    setUpload(false);
  };

  return (
    <div>
      {user?.userId && (
        <div>
          <Container className="border my-3">
            <Row>
              <Col className="text-center my-3 mx-3 border">
              {imgLoading ? <div>
          Loading...
          <Spinner animation="border" />
        </div> :
                <Image
                  fluid
                  src={fileUrl ? fileUrl : authuser.image}
                  alt="image of user"
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
                  <Col className="my-3 text-center">
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
              <Col className="border my-3 mx-3 text-center">
                <h1 className="my-3">{authuser?.name}</h1>
                <p><span style={{fontWeight : "700"}}>Email: </span>{authuser?.email}</p>
                <p><span style={{fontWeight : "700"}}>PhoneNumber: </span>{authuser?.phoneNumber}</p>
                <p><span style={{fontWeight : "700"}}>Zipcode: </span>{authuser.zipcode}</p>
                <Button
                  className="mx-3"
                  onClick={() => navigate("/editadminprofile")}
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
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
