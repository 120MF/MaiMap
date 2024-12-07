import { type NextRequest } from "next/server";

import client from "@/lib/db";

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

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("arcades");

    const arcade = await collection.findOne(
      { store_id: Number(id) },
      { projection: { store_pos: 0, _id: 0 } },
    );

    if (!arcade) {
      return new Response(JSON.stringify({ error: "Arcade not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    arcade.store_lat = parseFloat(arcade.store_lat.toString());
    arcade.store_lng = parseFloat(arcade.store_lng.toString());

    return new Response(JSON.stringify(arcade), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Get arcade by Id failed.", error: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
