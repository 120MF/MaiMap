// nearby api
import { RowDataPacket } from "mysql2";

import { pool } from "@/lib/db";

import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const range = searchParams.get("range");

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
