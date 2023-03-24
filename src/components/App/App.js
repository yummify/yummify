import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getSelected, changeForm } from "./appSlice";
import { useDispatch } from "react-redux";
import AppRoutes from "./AppRoutes";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeForm());
  }, [dispatch]);
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
