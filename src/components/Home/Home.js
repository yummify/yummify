import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { fetchUserAsync, selectUser } from "../User/userSlice";
import { selectAuth } from "../Auth/authSlice";
//import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const authUser = useSelector(selectAuth);
  const user = useSelector(selectUser);
  //console.log("User:", user);
  //console.log("AuthUser id:", authUser.userId);
  //const [loading, setLoading] = useState(true);
  //console.log("Auth User:", auth.currentUser.uid);
  // const { fetchUser, user } = useAuth();
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
          <h1>Welcome {user?.name}</h1>
          <p>Email :{user?.email}</p>
        </div>
      )}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Home;
