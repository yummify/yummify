import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import UserSignUp from "../Auth/UserSignUp";
import UserStartPage from "./UserStartPage";
import Login from "../Auth/Login";
import EditUserProfile from "../User/EditUserProfile";
import Users from "../Users/Users";
import RestaurantProfile from "../Restaurant/RestaurantProfile";
import RestaurantSignUp from "../Auth/RestaurantSignUp";
import RestaurantStartPage from "./RestaurantStartPage";
import PrivateRestaurantRoute from "../Auth/PrivateRestaurantRoute";
import PrivateUserRoute from "../Auth/PrivateUserRoute";
import UserProfile from "../User/UserProfile";
import Bag from "../Bag/Bag";
import AddBagForm from "../Bag/AddBagForm";
import EditBagForm from "../Bag/EditBagForm";
import Map from "../Map/Map";
import Home from "../Home/Home";
import AdminHome from "../Admin/Admin";
import AdminManageRestaurants from "../Admin/AdminManageRestaurants";
import AdminManageUsers from "../Admin/AdminManageUsers";
import AdminOrderHistory from "../Admin/AdminOrderHistory";
import SingleRestaurant from "../SingleRestaurantUserView/SingleRestaurant";
import EditRestaurantProfile from "../Restaurant/EditRestaurantProfile";
import PrivateAdminRoute from "../Auth/PrivateAdminRoute";
import AdminProfile from "../Admin/AdminProfile";
import EditAdminProfile from "../Admin/EditAdminProfile";
import AuthorizationError from "../Auth/AuthorizationError";
import App from "./App";
import PrivacyPolicy from "../Footer/PrivacyPolicy";
import TermsAndConditions from "../Footer/TermsAndConditions";
//import ForgotPassword from "../Auth/ForgotPassword";
//import UpdatePassword from "../Auth/UpdatePassword";
import NavBar from "../NavBar/NavBar";
//import PrivateRoute from "../Auth/PrivateRoute";
import AllRestaurants from "../AllRestaurants/AllRestaurants";
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* All users access */}
        <Route path="/" element={<Home />} />
        <Route path="/userstart" element={<UserStartPage />} />
        <Route path="/restaurantstart" element={<RestaurantStartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/restaurantsignup" element={<RestaurantSignUp />} />
        <Route path="/authorizationerror" element={<AuthorizationError />} />
        {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
        {/* <Route
          path="/updatepassword"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/userprofile"
          element={
            <PrivateUserRoute>
              <UserProfile />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/edituserprofile"
          element={
            <PrivateUserRoute>
              <EditUserProfile />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/restaurants"
          element={
            <PrivateUserRoute>
              <AllRestaurants/>
            </PrivateUserRoute>
          }
        />
        <Route 
          path="/restaurant/:id" 
          element={
          <PrivateUserRoute>
            <SingleRestaurant />
          </PrivateUserRoute>
        } 
        />
  
        <Route path="/users" element={<Users />} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminHome />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/adminprofile"
          element={
            <PrivateAdminRoute>
              <AdminProfile />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/editadminprofile"
          element={
            <PrivateAdminRoute>
              <EditAdminProfile />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/manage-restaurants"
          element={
            <PrivateAdminRoute>
              <AdminManageRestaurants />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <PrivateAdminRoute>
              <AdminManageUsers />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/order-history"
          element={
            <PrivateAdminRoute>
              <AdminOrderHistory />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/editrestaurantprofile"
          element={
            <PrivateRestaurantRoute>
              <EditRestaurantProfile />
            </PrivateRestaurantRoute>
          }
        />
        <Route
          path="/restaurantprofile"
          element={
            <PrivateRestaurantRoute>
              <RestaurantProfile />
            </PrivateRestaurantRoute>
          }
        />
        <Route path="/bag" element={<Bag />} />
        <Route path="/bagform" element={<AddBagForm />} />
        <Route path="/bageditform" element={<EditBagForm />} />
        <Route path="/map" element={<Map />} />
        <Route path="/restaurant/:id" element={<SingleRestaurant />} />
        <Route
          path="/restaurants"
          element={
            <PrivateUserRoute>
              <AllRestaurants />
            </PrivateUserRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default AppRoutes;


// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { AuthProvider } from "../../contexts/AuthContext";
// import UserSignUp from "../Auth/UserSignUp";
// import UserStartPage from "./UserStartPage";
// import Login from "../Auth/Login";
// import EditUserProfile from "../User/EditUserProfile";
// import Users from "../Users/Users";
// import RestaurantProfile from "../Restaurant/RestaurantProfile";
// import RestaurantSignUp from "../Auth/RestaurantSignUp";
// import RestaurantStartPage from "./RestaurantStartPage";
// import PrivateRestaurantRoute from "../Auth/PrivateRestaurantRoute";
// import PrivateUserRoute from "../Auth/PrivateUserRoute";
// import UserProfile from "../User/UserProfile";
// import Bag from "../Bag/Bag";
// import AddBagForm from "../Bag/AddBagForm";
// import EditBagForm from "../Bag/EditBagForm";
// import Map from "../Map/Map";
// import Cart from "../Cart/Cart"


// import AdminHome from "../Admin/Admin";
// import AdminManageRestaurants from "../Admin/AdminManageRestaurants";
// import AdminManageUsers from "../Admin/AdminManageUsers";
// import AdminOrderHistory from "../Admin/AdminOrderHistory";

// import AllRestaurants from "../AllRestaurants/AllRestaurants";
// import SingleRestaurant from "../SingleRestaurantUserView/SingleRestaurant";
// import EditRestaurantProfile from "../Restaurant/EditRestaurantProfile";
// import PrivateAdminRoute from "../Auth/PrivateAdminRoute";
// import AdminProfile from "../Admin/AdminProfile";
// import EditAdminProfile from "../Admin/EditAdminProfile";
// import AuthorizationError from "../Auth/AuthorizationError";

// import PrivacyPolicy from "../Footer/PrivacyPolicy";
// import TermsAndConditions from "../Footer/TermsAndConditions";

// const AppRoutes = () => {
//   return (
//     <div>
//       <AuthProvider>
//         <Routes>
//           <Route path="/userstart" element={<UserStartPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/usersignup" element={<UserSignUp />} />
//           <Route path="/authorizationerror" element={<AuthorizationError />} />
//           <Route
//             path="/userprofile"
//             element={
//               <PrivateUserRoute>
//                 <UserProfile />
//               </PrivateUserRoute>
//             }
//           />
//           <Route
//             path="/edituserprofile"
//             element={
//               <PrivateUserRoute>
//                 <EditUserProfile />
//               </PrivateUserRoute>
//             }
//           />
//           <Route path="/users" element={<Users />} />
//           <Route path="/map" element={<Map />} />
//           <Route path="/admin" element={<AdminHome />} />
//           <Route
//             path="/adminprofile"
//             element={
//               <PrivateAdminRoute>
//                 <AdminProfile />
//               </PrivateAdminRoute>
//             }
//           />
//           <Route path="/cart" element={<Cart/>}/>
//           <Route
//             path="/editadminprofile"
//             element={
//               <PrivateAdminRoute>
//                 <EditAdminProfile />
//               </PrivateAdminRoute>
//             }
//           />
//           <Route
//             path="/admin/manage-restaurants"
//             element={<AdminManageRestaurants />}
//           />
//           <Route path="/admin/manage-users" element={<AdminManageUsers />} />
//           <Route path="/admin/order-history" element={<AdminOrderHistory />} />
//           <Route path="/restaurantstart" element={<RestaurantStartPage />} />
//           <Route path="/restaurantsignup" element={<RestaurantSignUp />} />
//           <Route
//             path="/editrestaurantprofile"
//             element={
//               <PrivateRestaurantRoute>
//                 <EditRestaurantProfile />
//               </PrivateRestaurantRoute>
//             }
//           />
//           <Route
//             path="/restaurantprofile"
//             element={
//               <PrivateRestaurantRoute>
//                 <RestaurantProfile />
//               </PrivateRestaurantRoute>
//             }
//           />
//           <Route path="/bag" element={<Bag />} />
//           <Route path="/bagform" element={<AddBagForm />} />
//           <Route path="/bageditform" element={<EditBagForm />} />
//           <Route path="/map" element={<Map />} />
//           <Route path="/restaurant/:id" element={<SingleRestaurant />} />
//           <Route path="/restaurants" element={<AllRestaurants />}/>

//           <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
//           <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>
//         </Routes>
//       </AuthProvider>
//     </div>
//   );
// };
// export default AppRoutes;
