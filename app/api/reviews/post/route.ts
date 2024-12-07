import { type NextRequest } from "next/server";
import { ObjectId } from "mongodb";

import client from "@/lib/db";
import { review } from "@/types/reviews";

export async function POST(request: NextRequest) {
  const formReview: review = await request.json();

  if (!formReview) {
    return new Response(JSON.stringify({ error: "Missing request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const reviewDocument = {
    ...formReview,
    user_id: new ObjectId(formReview.user_id),
    created_at: new Date(),
    vote: 0,
  };

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("reviews");

    const result = await collection.insertOne(reviewDocument);

    return new Response(JSON.stringify(result), {
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
