import React, { useState, useContext, useEffect } from "react";
import { fetchUserAsync } from "../components/User/userSlice";

import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// This component uses useContext to provide authenticated user object that can be accessible by all the children of this component
export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUser = () => {
   
    if (auth?.currentUser?.uid) {
   
      dispatch(fetchUserAsync(auth.currentUser.uid)).then((res) => {
        setUser(res.payload);
        setLoading(false);
      });
    }
  };

  // This will listen to onAuthStateChanged() event listener of the firebase to get the authenticated user and set it in the local user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
   
      if (authUser) {
        setTimeout(fetchUser(),2000);
      } else {
        setUser();
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = { user, loading };

  // This will provide the values(authenticated users and loading states)to all the children components. 
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
