import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import IpContextProvider from "./contexts/IpContext";
import CountryContextProvider from "./contexts/CountryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <IpContextProvider>
    <CountryContextProvider>
      <App />
    </CountryContextProvider>
  </IpContextProvider>
  // </React.StrictMode>
);
