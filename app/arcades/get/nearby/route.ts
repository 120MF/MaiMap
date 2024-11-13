// nearby api
import { RowDataPacket } from "mysql2";
import { type NextRequest } from "next/server";

import { pool } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const range = searchParams.get("range");
  const sortMethod = searchParams.get("sortMethod");

  if (!lat || !lng || !range) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  let order: string;

  switch (sortMethod) {
    case "DistanceAscending":
      order = "ORDER BY distance;";
      break;
    case "DistanceDescending":
      order = "ORDER BY distance DESC;";
      break;
    case "PinyinAscending":
      order = "ORDER BY CONVERT(store_name USING gbk);";
      break;
    case "PinyinDescending":
      order = "ORDER BY CONVERT(store_name USING gbk) DESC;";
      break;
    case "Default":
    default:
      order = ";";
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
          ) <= ? * 1000 ${order}
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
