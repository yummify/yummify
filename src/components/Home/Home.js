import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Image, Container, Row } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { fetchUserAsync, selectUser } from "../User/userSlice";
import { selectAuth } from "../Auth/authSlice";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const authUser = useSelector(selectAuth);
  //const user = useSelector(selectUser);
  //console.log("User:", user);
  console.log("AuthUser id:", authUser.userId);
  //const [loading, setLoading] = useState(true);
  //console.log("Auth User:", auth.currentUser.uid);
  const { user } = useAuth();
  console.log("User:", user);
  // console.log("User from auth context:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync(authUser.userId));
  }, [authUser.userId]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
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
                      src={user.image}
                      alt="image of user"
                      thumbnail
                      style={{ width: "100px", borderRadius: "10px" }}
                    />
                    <Button style={{ padding: "0.2rem", marginTop: "1rem" }}>
                      Upload Photo
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div
                    className="flex-grow-1 ms-3"
                    style={{ marginTop: "5rem" }}
                  >
                    <h1>{user?.name}</h1>
                    <p>Email :{user?.email}</p>
                    <p>PhoneNumber:{user?.phoneNumber}</p>
                    <p>Zipcode:{user.zipcode}</p>
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

export default Home;
