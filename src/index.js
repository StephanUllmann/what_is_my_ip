import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import IpContextProvider from "./contexts/IpContext";
import NewCountryContextProvider from "./contexts/NewCountryContext";
import CountryContextProvider from "./contexts/CountryContext";
import "@fontsource/nunito";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <IpContextProvider>
    <NewCountryContextProvider>
      <CountryContextProvider>
        <App />
      </CountryContextProvider>
    </NewCountryContextProvider>
  </IpContextProvider>
  // </React.StrictMode>
);
