export default async function getCountryInfo(country) {
  try {
    if (!country) return {};
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
