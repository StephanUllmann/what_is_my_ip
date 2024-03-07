import { createContext, useContext, useEffect, useState } from 'react';
import { IpContext } from './IpContext';
import getCountryInfo from '../clients/getCountryInfo';

export const CountryContext = createContext();

export default function CountryContextProvider({ children }) {
  const { ipData } = useContext(IpContext);
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], {
    type: 'region',
  });
  // console.log(regionNamesInEnglish);
  const countryAbbr = ipData?.location?.country || 'en';
  const parsedName = regionNamesInEnglish.of(countryAbbr);
  const [countryName, setCountryName] = useState('');
  const [countryInfo, setCountryInfo] = useState({});
  const [neighbours, setNeighbours] = useState([]);

  useEffect(() => {
    if (!ipData) return;
    setCountryName(parsedName);
  }, [ipData, parsedName]);

  // console.log(countryName);
  useEffect(() => {
    if (!ipData) return;
    getCountryInfo(countryName)
      .then((data) => setCountryInfo(data))
      .catch((err) => console.log(err));
    setNeighbours([]);
  }, [ipData, countryName]);

  useEffect(() => {
    const borders = countryInfo[0]?.borders || [];
    if (borders.length === 0) return;
    // borders.forEach((element) => {
    //   getCountryByCode(element)
    //     .then((data) => setNeighbours((prev) => [...prev, data[0]]))
    //     .catch((err) => console.log(err));
    // });
    fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`)
      .then((res) => res.json())
      .then((data) => setNeighbours(data))
      .catch((err) => console.log(err));
  }, [countryInfo]);

  return (
    <CountryContext.Provider value={{ countryInfo, neighbours, setCountryName }}>{children}</CountryContext.Provider>
  );
}
