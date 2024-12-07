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
    const collection = db.collection("tags");

    const tags = await collection.find({ store_id: Number(id) }).toArray();

    if (!tags) {
      return new Response(JSON.stringify({ error: "Tag not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(tags), {
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
