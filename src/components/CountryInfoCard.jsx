import "./CountryInfoCard.css";
import { useContext, useEffect, useState } from "react";
import { CountryContext } from "../contexts/CountryContext";
import { DateTime } from "luxon";

export default function CountryInfoCard() {
  // console.log("card mounted");
  // const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
  //   type: "region",
  // });
  const { countryInfo, neighbours, setCountryName } =
    useContext(CountryContext);
  const country = countryInfo[0];
  // const [neighboursComponent, setNeighboursComponent] = useState([]);

  // useEffect(() => {
  //   if (!neighbours) return;
  //   setNeighboursComponent(neighbours);
  // }, [neighbours]);

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
  const giniInd = country.gini[Object.keys(country.gini).at(-1)];
  console.log(countryInfo);
  // Time
  const timezone = +country.timezones[0].split("+" || "-")[1]?.split(":")[0];
  console.log(timezone);
  const time = DateTime.local().setZone(
    Number.isFinite(timezone) ? `UTC+${timezone}` : "UTC"
  );
  console.log(time.toISOTime());

  // console.log(neighbours.map((item) => item.flags.svg));

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
          Home of {population}mio {people}.
        </li>
        <li>Driving Side: {driveSide}</li>
        <li>Gini Index: {giniInd} (1-100 - the lower the more equality)</li>
        {/* <li>Local Time: {time}</li> */}
        <li>
          Neighbours: <br />
          {neighbours.length === 0
            ? null
            : neighbours?.map((neigbour) => (
                <span
                  className="country__neighbour"
                  key={neigbour?.flags.svg}
                  onClick={() => setCountryName(neigbour?.name.common)}
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
