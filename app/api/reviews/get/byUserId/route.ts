import { type NextRequest } from "next/server";
import { ObjectId } from "mongodb";

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

    const reviews = await collection
      .find({ user_id: new ObjectId(id) })
      .project({ email: 0 })
      .toArray();

    const length = reviews.length;

    if (length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    for (let i = 0; i < length; i++) {
      reviews[i].rating = parseFloat(String(reviews[i].rating));
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
