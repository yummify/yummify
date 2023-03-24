import React, { useState, useContext, useEffect } from "react";
import { fetchUserAsync } from "../components/User/userSlice";

import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const fetchUser = () => {
    console.log("+++entering fetchuser");
    if (auth?.currentUser?.uid) {
      console.log("+++before db");
      dispatch(fetchUserAsync(auth.currentUser.uid)).then((res) =>
        setUser(res.payload)
      );
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("AuthUser in useeffect:", authUser);
      if (authUser) {
        fetchUser()?.then((res) => {
          const data = res.payload;
          console.log("++++++++++ubsubs" + data);
          setUser(data);
        });
      }
    });
    return unsubscribe;
  }, []);

  const value = { user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
