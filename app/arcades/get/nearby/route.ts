// nearby api
import { RowDataPacket } from "mysql2";

import { pool } from "@/lib/db";

export async function POST(request: Request) {
  const { lat, lng, range } = await request.json();

  if (!lat || !lng || !range) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
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

  try {
    const [results] = await pool
      .promise()
      .query(query, [lng, lat, lng, lat, range]);
    const arcades = (results as RowDataPacket[]).map((result) => ({
      ...result,
      store_lat: Number(result.store_lat),
      store_lng: Number(result.store_lng),
      store_id: Number(result.store_id),
    }));

    return new Response(JSON.stringify(arcades), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
