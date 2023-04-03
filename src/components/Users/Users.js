import React, { useEffect } from "react";
import { fetchUsersAsync, selectUsers } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);
};

export default Users;
