const URL = "/api/qmap/suggestion";
const key = process.env.NEXT_PUBLIC_QMAP_API_KEY;

export async function getSuggestion(keywords: string) {
  try {
    const res = await fetch(`${URL}?keyword=${keywords}&key=${key}`);
    const data = await res.json();

    return data.data;
  } catch (error) {
    throw error;
  }
}
