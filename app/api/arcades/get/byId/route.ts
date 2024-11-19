// byId api
import { RowDataPacket } from "mysql2";
import { type NextRequest } from "next/server";

import { pool } from "@/lib/db";
import { arcade } from "@/types/arcades";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
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
    WHERE store_id = ?
  `;

  try {
    const [results] = await pool.promise().query(query, [id]);
    const data = (results as RowDataPacket[])[0];

    const arcade: arcade = {
      store_lat: Number(data.store_lat),
      store_lng: Number(data.store_lng),
      store_id: Number(data.store_id),
      store_name: data.store_name,
      store_address: data.store_address,
      store_pos: data.store_pos,
      arcade_type: data.arcade_type,
      arcade_dead: data.arcade_dead,
      distance: 0,
    };

    return new Response(JSON.stringify(arcade), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Get arcade by Id failed." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
