import { type NextRequest } from "next/server";

import client from "@/lib/db";

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

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("arcades");

    const arcades = await collection
      .find({ store_name: { $regex: name, $options: "i" } })
      .project({ store_pos: 0, _id: 0 })
      .toArray();

    for (let i = 0; i < arcades.length; i++) {
      arcades[i].store_lat = parseFloat(arcades[i].store_lat.toString());
      arcades[i].store_lng = parseFloat(arcades[i].store_lng.toString());
    }

    return new Response(JSON.stringify(arcades), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Get arcades by name failed.", error: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
