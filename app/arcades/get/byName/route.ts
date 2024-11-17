// byName api
import { RowDataPacket } from "mysql2";
import { type NextRequest } from "next/server";

import { pool } from "@/lib/db";
import { arcade } from "@/types/arcades";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  if (!name) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const query = `
    SELECT *
    FROM arcades
    WHERE store_name = ?
  `;

  try {
    const [results] = await pool.promise().query(query, [name]);
    const data = (results as RowDataPacket[])[0];

    const arcade: arcade = {
      store_lat: data.store_lat,
      store_lng: data.store_lng,
      store_id: data.store_id,
      store_name: data.store_name,
      store_address: data.store_address,
      store_pos: data.store_pos,
      arcade_type: data.arcade_type,
      distance: 0,
    };

    return new Response(JSON.stringify(arcade), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Get arcade by name failed." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
