const URL = "https://restapi.amap.com/v3/place/text?";
const key = process.env.NEXT_PUBLIC_AMAP_API_KEY;

export async function getPOI(keywords) {
  const res = await fetch(
    `${URL}key=${key}&keywords=${keywords}&types=&city=&children=1&offset=10&page=1&extensions=base`,
  );
  const data = await res.json();
  console.log(data);
  const result = data.pois;
  console.log(result);
  return result;
}
