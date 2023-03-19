import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../Auth/authSlice";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const Home = () => {
  const authUser = useSelector(selectAuth);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {authUser?.userId} <h1>Welcome {authUser?.email}</h1>
      {authUser?.email} && <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Home;
