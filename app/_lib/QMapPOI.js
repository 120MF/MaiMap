const URL = "/api/qmap";
const key = process.env.NEXT_PUBLIC_QMAP_API_KEY;

export async function getPOI(keywords) {
  try {
    const res = await fetch(`${URL}?keyword=${keywords}&key=${key}`);
    const data = await res.json();
    const result = data.data;
    return result;
  } catch (error) {
    console.error("Search failed:", error);
  }
}
