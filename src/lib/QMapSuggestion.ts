const URL = '/api/qmap/suggestion';
const key = process.env.QMAP_API_KEY;
export async function getSuggestion(keywords: string) {
  const res = await fetch(`${URL}?keyword=${keywords}&key=${key}`);
  const data = await res.json();

  return data.data;
}
