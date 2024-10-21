const URL = "https://restapi.amap.com/v3/place/text?";
const key = "f975155eaddc8881ba72c107d5cbd819";

export async function getPOI(keywords) {
  const res = await fetch(
    `${URL}key=${key}&keywords=${keywords}&types=&city=&children=1&offset=10&page=1&extensions=base`,
  );
  const data = await res.json();
  const result = data.pois;
  console.log(result);
  return result;
}
