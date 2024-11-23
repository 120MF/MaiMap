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

  const objId = new ObjectId(id);

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("users");

    let user = await collection.findOne({ _id: objId });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Can't find user by request ID" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    user.id = user._id;
    delete user._id;
    delete user.passwordHash;
    delete user.emailVerified;

    return new Response(JSON.stringify(user), {
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
