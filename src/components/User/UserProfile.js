import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Container, Row } from "react-bootstrap";
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

const UserProfile = () => {
  const [fileUrl, setFileUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const authuser = useSelector(selectUser);
  console.log("authuser:", authuser);
  const { user } = useAuth();
  console.log("User from AuthContext:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) dispatch(fetchUserAsync(user?.userId));
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
                      src={fileUrl ? fileUrl : authuser.image}
                      alt="image of user"
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
                    <h1>{authuser?.name}</h1>
                    <p>Email :{authuser?.email}</p>
                    <p>PhoneNumber:{authuser?.phoneNumber}</p>
                    <p>Zipcode:{authuser.zipcode}</p>
                    <Button onClick={() => navigate("/edituserprofile")}>
                      Edit User Profile
                    </Button>
                    <Button onClick={() => navigate("/updatepassword")}>
                      Update password
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

export default UserProfile;
