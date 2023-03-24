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
import { selectAuth } from "../Auth/authSlice";
import { useAuth } from "../../contexts/AuthContext";
import { app } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const UserProfile = () => {
  //const authUser = useSelector(selectAuth);
  const [fileUrl, setFileUrl] = useState();
  const [imageFile, setImageFile] = useState(null);
  const authuser = useSelector(selectUser);
  console.log("authuser:", authuser);
  //console.log("AuthUser id:", authUser.userId);
  //const [loading, setLoading] = useState(true);
  //console.log("Auth User:", auth.currentUser.uid);
  const { user } = useAuth();
  console.log("User from AuthContext:", user);
  // console.log("User from auth context:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) dispatch(fetchUserAsync(user?.userId));
  }, [user?.userId, fileUrl]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/userstart");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (event) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `users/${imageFile.name}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(editUserImageAsync({ userId, url })).then(() => {
          console.log("file updated");
          setFileUrl(url);
        });
      });
    });
    const userId = user.userId;
    setUpload(false);
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
