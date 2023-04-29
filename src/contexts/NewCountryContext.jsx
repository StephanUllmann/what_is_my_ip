import { createContext, useState } from "react";

export const NewCountryContext = createContext();

export default function NewCountryContextProvider({ children }) {
  const [isNewCountry, setIsNewCountry] = useState(false);
  const [latLng, setLatLng] = useState([]);

  return (
    <NewCountryContext.Provider
      value={{ isNewCountry, setIsNewCountry, latLng, setLatLng }}
    >
      {children}
    </NewCountryContext.Provider>
  );
}
