import { type NextRequest } from "next/server";

import client from "@/lib/db";
import { auth } from "@/auth";

interface tagForm {
  user_id: string;
  name: string;
  store_id: number;
}

export async function POST(request: NextRequest) {
  const formTag: tagForm = await request.json();

  if (!formTag) {
    return new Response(JSON.stringify({ error: "Missing request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = await auth();

  if (!session || session.user.id !== formTag.user_id) {
    return new Response(JSON.stringify({ error: "You must sign in first." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const tagDocument = {
    ...formTag,
    created_at: new Date(),
    vote: 0,
  };

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("tags");

    if ((await collection.countDocuments()) > 0) {
      const sameNameTag = await collection.findOne({ name: formTag.name });

      if (sameNameTag) {
        return new Response(
          JSON.stringify({ error: "当前机厅已有相同标签存在" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    const result = await collection.insertOne(tagDocument);

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
