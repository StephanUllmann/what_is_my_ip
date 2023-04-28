export default async function getIP() {
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPAPI}`
  );
  const data = await res.json();
  return data;
}
