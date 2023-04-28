import { createContext } from "react";
import { useState, useEffect } from "react";
import data from "./ip_data.json";
import getIP from "../clients/getIP";

export const IpContext = createContext();

export default function IpContextProvider({ children }) {
  const [ipData, setIpData] = useState({});

  // useEffect(() => {
  //   getIP().then((data) => setIpData(data));
  // }, []);

  useEffect(() => {
    setIpData(data);
  }, []);

  // console.log(ipData);
  return <IpContext.Provider value={{ ipData }}>{children}</IpContext.Provider>;
}
