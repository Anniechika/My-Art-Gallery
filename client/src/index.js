import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ArtworkProvider } from "./context/artwork_context";
import { UserProvider } from "./context/user_context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ArtworkProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ArtworkProvider>
);
