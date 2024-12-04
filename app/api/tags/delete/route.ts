import { type NextRequest } from "next/server";
import { ObjectId } from "mongodb";

import client from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(request: NextRequest) {
  const _id: string = await request.json();

  if (!_id) {
    return new Response(JSON.stringify({ error: "Missing request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "You must sign in first." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("tags");
    const result = await collection.deleteOne({
      _id: new ObjectId(_id),
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
