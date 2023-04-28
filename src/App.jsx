import { useContext } from "react";
import "./App.css";
import { IpContext } from "./contexts/IpContext";
import { CountryContext } from "./contexts/CountryContext";
import "leaflet/dist/leaflet.css";
import IpMap from "./components/IpMap";

function App() {
  const { ipData } = useContext(IpContext);
  const { countryInfo } = useContext(CountryContext);

  // console.log(countryInfo);
  return (
    <div className="App">{Object.keys(ipData).length > 0 && <IpMap />}</div>
  );
}

export default App;
