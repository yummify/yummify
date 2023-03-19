import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../Auth/authSlice";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { selectUser, fetchUserAsync } from "../User/userSlice";

const Home = () => {
  const authUser = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser.userId) {
      dispatch(fetchUserAsync(authUser.userId));
    }
  }, [dispatch]);

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
      {authUser?.userId && (
        <div>
          <h1>Welcome {user?.name}</h1>
          <p>Email :{user.email}</p>
        </div>
      )}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Home;
