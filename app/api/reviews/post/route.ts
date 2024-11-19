import { type NextRequest } from "next/server";

import client from "@/lib/db";
import { review } from "@/types/reviews";

export async function POST(request: NextRequest) {
  const formReview: review = await request.json();

  if (String(formReview.coin_price) === "") formReview.coin_price = null;

  if (!formReview) {
    return new Response(JSON.stringify({ error: "Missing request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const timestamp = new Date()
    .toLocaleString("en-CA", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/, /g, " ")
    .replace(/\//g, "-");

  const reviewDocument = {
    ...formReview,
    created_at: timestamp,
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
