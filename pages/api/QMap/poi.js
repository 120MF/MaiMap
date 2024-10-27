export default async function handler(req, res) {
  const { query } = req;
  const { lat, lng } = query;
  const key = process.env.NEXT_PUBLIC_QMAP_API_KEY;
  const URL = "https://apis.map.qq.com/ws/geocoder/v1?";
  try {
    const data = await (
      await fetch(`${URL}location=${lat},${lng}&key=${key}&get_poi=0`)
    ).json();
    const address = data.result.formatted_addresses.standard_address;
    res.status(200).json(address);
  } catch (err) {
    console.error("POI failed: ", err);
    res.status(400).json({ error: "POI failed" });
  }
}
