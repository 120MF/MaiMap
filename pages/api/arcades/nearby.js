import pool from "@/app/_lib/db";

export default function handler(req, res) {
  const { lat, lng, distance } = req.query;

  if (!lat || !lng || !distance) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const query = `
    SELECT *,
           ST_Distance_Sphere(
               store_pos,
               ST_GeomFromText(CONCAT('POINT(', ?, ' ', ?, ')'))
           ) AS distance
    FROM arcades
    WHERE ST_Distance_Sphere(
              store_pos,
              ST_GeomFromText(CONCAT('POINT(', ?, ' ', ?, ')'))
          ) <= ? * 1000;
  `;

  pool.query(query, [lng, lat, lng, lat, distance], (error, results) => {
    if (error) {
      console.error("an error occurs", error);
      return res.status(500).json({ error: error.message });
    }
    const arcades = results.map((result) => ({
      ...result,
      store_lat: Number(result.store_lat),
      store_lng: Number(result.store_lng),
      id: Number(result.id),
    }));

    return res.status(200).json(arcades);
  });
}
