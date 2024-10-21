const URL = "/api/qmap";
const key = process.env.NEXT_PUBLIC_QMAP_API_KEY;

export async function getPOI(keywords) {
  const res = await fetch(`${URL}?keyword=${keywords}&key=${key}`);
  const data = await res.json();
  const result = data.data;
  // console.log(result);
  return result;
}
