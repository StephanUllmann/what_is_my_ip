import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { IpContext } from "../contexts/IpContext";
import { CountryContext } from "../contexts/CountryContext";
import { NewCountryContext } from "../contexts/NewCountryContext";
import { useContext, useEffect, useState } from "react";
import CountryInfoCard from "./CountryInfoCard";

export default function IpMap() {
  const { ipData } = useContext(IpContext);
  const { countryInfo } = useContext(CountryContext);
  const { isNewCountry, latLng } = useContext(NewCountryContext);

  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const [lat, setLat] = useState(ipData.location.lat);
  const [lng, setLng] = useState(ipData.location.lng);

  useEffect(() => {
    if (isNewCountry) {
      setLat(latLng[0]);
      setLng(latLng[1]);
    }
  }, [latLng, isNewCountry]);
  const center = [lat - 0.17, lng + 0.5];

  return (
    <MapContainer
      className="leaflet-container"
      center={center}
      zoom={9}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker key={`${lat}${lng}`} position={[lat, lng]}>
          {/* <Popup>
            <p>IP: {ipData.ip}</p>
            <p>Country: {regionNamesInEnglish.of(ipData.location.country)}</p>
            <p>City: {ipData.location.city}</p>
          </Popup> */}
      </Marker>
      {Object.keys(countryInfo).length > 0 && <CountryInfoCard />}
    </MapContainer>
  );
}
