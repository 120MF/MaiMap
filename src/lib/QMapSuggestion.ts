const URL = '/api/map/ws/place/v1/suggestion';
const key = process.env.QMAP_KEY;
export async function getSuggestion(keywords: string) {
  const res = await fetch(`${URL}?keyword=${keywords}&key=${key}`);
  const data = await res.json();

  return data.data;
}
