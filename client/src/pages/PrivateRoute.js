import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Not logged in. Navigating to home.");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Render children if logged in
  return isLoggedIn ? children : null;
};

export default PrivateRoute;
