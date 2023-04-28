export default async function getCountryInfo(country = "germany") {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  const data = await res.json();
  return data;
}
