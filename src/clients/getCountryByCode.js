export default async function getCountryByCode(code) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
