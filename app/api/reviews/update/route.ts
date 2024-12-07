import { type NextRequest } from "next/server";
import { ObjectId } from "mongodb";

import client from "@/lib/db";
import { auth } from "@/auth";

type UpdateForm = {
  _id: string;
  user_id: ObjectId;
  comment: string;
  rating: number;
};

export async function POST(request: NextRequest) {
  const form: UpdateForm = await request.json();

  if (!form) {
    return new Response(JSON.stringify({ error: "Missing request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = await auth();

  if (!session || session.user.id !== String(form.user_id)) {
    return new Response(
      JSON.stringify({ error: "You must sign in to update review." }),
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

    const result = await collection.updateOne(
      { _id: new ObjectId(form._id) },
      {
        $set: {
          comment: form.comment,
          rating: form.rating,
          created_at: new Date(),
        },
      },
    );

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
