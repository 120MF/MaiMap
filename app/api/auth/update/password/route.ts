import type { NextRequest } from "next/server";

import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

import client from "@/lib/db";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const { value, token } = await request.json();
  const session = await auth();
  const userId = new ObjectId(session.user.id);
  //@ts-ignore
  if (session.sessionToken === token) {
    try {
      const hashedPassword = await bcrypt.hash(value, 10);

      await client.connect();
      const db = client.db("maimap");
      const collection = db.collection("users");
      const result = await collection.updateOne(
        { _id: userId },
        { $set: { passwordHash: hashedPassword } },
      );

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Error hashing and uploading password.",
          error: error,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Invalid token." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
