import React from "react";
import Footer from "../Footer/Footer";
import AppRoutes from "./AppRoutes";

function App() {
  //const navigate = useNavigate();
  return (
    <div className="App">
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
