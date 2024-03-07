import { createContext } from 'react';
import { useState, useEffect } from 'react';
import getIP from '../clients/getIP';

export const IpContext = createContext();

export default function IpContextProvider({ children }) {
  const [ipData, setIpData] = useState(null);
  // if (ipData) console.log('API call: ', ipData);
  useEffect(() => {
    getIP().then((data) => setIpData(data));
  }, []);

  return <IpContext.Provider value={{ ipData }}>{children}</IpContext.Provider>;
}
