import { createContext, useContext, useEffect, useState } from "react";
import { IpContext } from "./IpContext";
import getCountryInfo from "../clients/getCountryInfo";
import getCountryByCode from "../clients/getCountryByCode";

export const CountryContext = createContext();

export default function CountryContextProvider({ children }) {
  const { ipData } = useContext(IpContext);
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  const countryAbbr = ipData.location?.country || "";
  const parsedName = regionNamesInEnglish.of(countryAbbr);
  const [countryName, setCountryName] = useState("");
  const [countryInfo, setCountryInfo] = useState({});
  const [neighbours, setNeighbours] = useState([]);
  useEffect(() => {
    if (!ipData) return;
    setCountryName(parsedName);
  }, [parsedName]);

  // console.log(countryName);
  useEffect(() => {
    if (!ipData) return;
    getCountryInfo(countryName)
      .then((data) => setCountryInfo(data))
      .catch((err) => console.log(err));
    setNeighbours([]);
  }, [countryName]);

  const borders = countryInfo[0]?.borders || [];
  useEffect(() => {
    if (borders.length === 0) return;
    borders.forEach((element) => {
      getCountryByCode(element)
        .then((data) => setNeighbours((prev) => [...prev, data[0]]))
        .catch((err) => console.log(err));
    });
  }, [borders]);

  return (
    <CountryContext.Provider
      value={{ countryInfo, neighbours, setCountryName }}
    >
      {children}
    </CountryContext.Provider>
  );
}
