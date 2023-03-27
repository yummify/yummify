import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>

  // <Provider store={store}>
  //   <Router>
  //     <Routes>
  //       <Route path="/*" element={<App />} />
  //     </Routes>
  //   </Router>
  // </Provider>
);

//const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Router>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </Router>
// );
