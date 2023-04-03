import React, { useEffect } from "react";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

// This component is used to display authorization error message and also enabled force logout for protecting route access to respective user types: user,admin or restaurant owner
const AuthorizationError = () => {
  useEffect(() => {
    const logout = async () => await signOut(auth);
    logout();
  }, []);
  return (
    <div>
    <Container>
      <h1 className="mx-3">You are not authorized to view this page</h1>
      <Link to={"/"} className="mx-3">Return to Home</Link>
      </Container>
    </div>
  );
};
export default AuthorizationError;
