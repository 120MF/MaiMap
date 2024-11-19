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
    const collection = db.collection("reviews");

    const reviews = await collection.find({ store_id: Number(id) }).toArray();

    const length = reviews.length;

    if (length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    for (let i = 0; i < length; i++) {
      reviews[i].rating = parseFloat(String(reviews[i].rating));
      reviews[i].coin_price = parseFloat(String(reviews[i].coin_price));
    }

    return new Response(JSON.stringify(reviews), {
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
