import type { NextRequest } from "next/server";

import { ObjectId } from "mongodb";

import client from "@/lib/db";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const { value } = await request.json();
  const session = await auth();

  if (session) {
    try {
      await client.connect();
      const db = client.db("maimap");
      const collection = db.collection("users");
      const result = await collection.updateOne(
        { _id: new ObjectId(session.user.id) },
        { $set: { name: value } },
      );

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Error uploading username.",
          error: error,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "You must login first." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
