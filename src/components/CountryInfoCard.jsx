import "./CountryInfoCard.css";
import { useContext } from "react";
import { CountryContext } from "../contexts/CountryContext";
import { NewCountryContext } from "../contexts/NewCountryContext";
import { DateTime } from "luxon";
import { useMap } from "react-leaflet";

export default function CountryInfoCard() {
  const map = useMap();

  const { countryInfo, neighbours, setCountryName } =
    useContext(CountryContext);
  const country = countryInfo[0];

  const { isNewCountry, setIsNewCountry, setLatLng } =
    useContext(NewCountryContext);

  if (!country) return <h1>Not found</h1>;
  if (Object.keys(country).length === 0) return <h1>Not found</h1>;
  const officialName = country.name.official;
  const flag = country.flags.svg;
  const population = +`${(country.population / 1000000).toFixed(2)}`;
  const femaleCitizens = country.demonyms.eng.f;
  const maleCitizens = country.demonyms.eng.m;
  const people =
    femaleCitizens === maleCitizens
      ? femaleCitizens
      : `${femaleCitizens}s and ${maleCitizens}s`;
  const driveSide = country.car.side === "right" ? "🛣🚗" : "🚗🛣";
  const giniInd = country?.gini[Object.keys(country?.gini).at(-1)];
  // console.log(countryInfo);
  // Time

  const timezone = +country.timezones[0]?.split("+" || "-")[1]?.split(":")[0];
  let time;
  if (country.timezones[0].includes("+")) {
    time = DateTime.local().setZone(
      Number.isFinite(timezone) ? `UTC+${timezone + 1}` : "UTC"
    );
  } else if (country.timezones[0].includes("+")) {
    time = DateTime.local().setZone(
      Number.isFinite(timezone) ? `UTC-${timezone + 1}` : "UTC"
    );
  } else {
    time = DateTime.local().setZone("UTC+1");
  }
  const timeArr = time.toISOTime().split(":");
  const displayTime = `${timeArr[0]}:${timeArr[1]}`;

  const handleCountryClick = (neigbour) => {
    setCountryName(neigbour?.name.common);
    if (!isNewCountry) setIsNewCountry(true);
    setLatLng(neigbour.capitalInfo.latlng);
    map.panTo([
      neigbour.capitalInfo.latlng[0] - 0.17,
      neigbour.capitalInfo.latlng[1] + 0.5,
    ]);
  };

  return (
    <div className="CountryInfoCard">
      <img
        className="country__flag"
        src={flag}
        alt={`Flag of ${officialName}`}
      />
      <h1 className="country__name">{officialName}</h1>
      <ul className="country__facts">
        <li>
          Home of {population}mio {people}
        </li>
        <li>Driving Side: {driveSide}</li>
        <li>Gini Index: {giniInd} (the lower the more equality)</li>
        <li>Local Time: {displayTime}</li>
        <li>
          Neighbours: <br />
          {neighbours.length === 0
            ? null
            : neighbours?.map((neigbour) => (
                <span
                  className="country__neighbour"
                  key={neigbour?.flags.svg}
                  onClick={() => handleCountryClick(neigbour)}
                >
                  <img
                    className="country__neighbour-flag"
                    src={neigbour?.flags.svg}
                    alt={neigbour?.name.common}
                  />
                  <div
                    className="hover"
                    onClick={() => setCountryName(neigbour?.name.common)}
                  >
                    <p>{neigbour?.name.common}</p>
                  </div>
                </span>
              ))}
        </li>
      </ul>
    </div>
  );
}
