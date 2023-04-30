import { useContext } from "react";
import "./App.css";
import { IpContext } from "./contexts/IpContext";
import "leaflet/dist/leaflet.css";
import IpMap from "./components/IpMap";

function App() {
  const { ipData } = useContext(IpContext);

  return (
    <div className="App">
      {Object.keys(ipData).length > 0 && (
        <>
          <IpMap />
          <h4>Your IP-Address: {ipData.ip}</h4>
        </>
      )}
    </div>
  );
}

export default App;
