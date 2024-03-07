import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { IpContext } from '../contexts/IpContext';
import { CountryContext } from '../contexts/CountryContext';
import { NewCountryContext } from '../contexts/NewCountryContext';
import { useContext } from 'react';
import CountryInfoCard from './CountryInfoCard';

export default function IpMap() {
  const { ipData } = useContext(IpContext);
  const { countryInfo } = useContext(CountryContext);
  const { latLng } = useContext(NewCountryContext);
  // console.log(countryInfo);
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const center = latLng.length
    ? [latLng[0] - 0.17, latLng[1] + 0.5]
    : [ipData.location.lat - 0.17, ipData.location.lng + 0.5];
  const markerPos = latLng.length ? [latLng[0], latLng[1]] : [ipData.location.lat, ipData.location.lng];

  return (
    <MapContainer className='leaflet-container' center={center} zoom={9} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker key={`marker`} position={markerPos}>
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
