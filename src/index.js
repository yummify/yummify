import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Auth from "../src/features/auth/Auth";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Auth />} />
    </Routes>
  </Router>
);
