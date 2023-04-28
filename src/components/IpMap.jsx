import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { IpContext } from "../contexts/IpContext";
import { CountryContext } from "../contexts/CountryContext";
import { useContext } from "react";
import CountryInfoCard from "./CountryInfoCard";

export default function IpMap() {
  const { ipData } = useContext(IpContext);
  const { countryInfo } = useContext(CountryContext);
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <MapContainer
      className="leaflet-container"
      center={[ipData.location.lat - 0.08, ipData.location.lng + 0.16]}
      zoom={11}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        key={`${ipData.location.lat}${ipData.location.lng}`}
        position={[ipData.location.lat, ipData.location.lng]}
      >
        <Popup>
          <p>IP: {ipData.ip}</p>
          <p>Country: {regionNamesInEnglish.of(ipData.location.country)}</p>
          <p>City: {ipData.location.city}</p>
        </Popup>
      </Marker>
      {Object.keys(countryInfo).length > 0 && <CountryInfoCard />}
    </MapContainer>
  );
}
