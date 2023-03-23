import React, { useState, useContext, useEffect } from "react";
import { fetchUserAsync } from "../components/User/userSlice";
import { fetchRestaurantAsync } from "../components/Restaurant/restaurantSlice";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";

const AuthResContext = React.createContext();

export function useAuthRes() {
  return useContext(AuthResContext);
}

export function AuthResProvider({ children }) {
  //const [user, setUser] = useState();
  const [restaurant, setRestaurant] = useState();
  //const authUser = useSelector(selectUser);
  const dispatch = useDispatch();

  //   const fetchUser = () => {
  //     console.log("+++entering fetchuser");
  //     if (auth?.currentUser?.uid) {
  //       console.log("+++before db");
  //       dispatch(fetchUserAsync(auth.currentUser.uid)).then((res) =>
  //         setUser(res.payload)
  //       );
  //     }
  //   };

  const fetchRestaurant = () => {
    if (auth?.currentUser?.uid) {
      console.log("+++before db");
      dispatch(fetchRestaurantAsync(auth.currentUser.uid)).then((res) =>
        setRestaurant(res.payload)
      );
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("AuthRes in useeffect:", authUser);
      if (authUser) {
        // fetchUser()?.then((res) => {
        //   const data = res.payload;
        //   console.log("++++++++++ubsubs" + data);
        //   setUser(data);
        // });
        fetchRestaurant()?.then((res) => {
          const data = res.payload;
          console.log("++++++++++ubsubs" + data);
          setRestaurant(data);
        });
      }
    });
    return unsubscribe;
  }, []);

  const value = { restaurant };
  return (
    <AuthResContext.Provider value={value}>{children}</AuthResContext.Provider>
  );
}
