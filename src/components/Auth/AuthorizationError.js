import React, { useEffect } from "react";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
const AuthorizationError = () => {
  useEffect(() => {
    const logout = async () => await signOut(auth);
    logout();
  }, []);
  return (
    <div>
      <h1>You are not authorized to view this page</h1>
      <Link to={"/"}>Return to Home</Link>
    </div>
  );
};
export default AuthorizationError;
