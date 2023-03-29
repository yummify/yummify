import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { fetchUserAsync, selectUser } from "../User/userSlice";
import { selectAuth } from "../Auth/authSlice";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useAuth();

  useEffect(() => {
    dispatch(fetchUserAsync(authUser?.user?.userId));
  }, [authUser?.user?.userId]);

  return <div>Home</div>;
};

export default Home;
