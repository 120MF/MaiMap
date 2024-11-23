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

  const tagDocument = {
    ...formTag,
    created_at: timestamp,
    vote: 0,
  };

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("tags");

    const closestTag = await collection
      .aggregate([
        {
          $match: {
            $and: [
              { user_id: formTag.user_id },
              { store_id: formTag.store_id },
            ],
          },
        },
        {
          $addFields: {
            diff: {
              $abs: {
                $subtract: [{ $toDate: "$created_at" }, { $toDate: timestamp }],
              },
            },
          },
        },
        { $sort: { diff: 1 } },
        { $limit: 1 },
      ])
      .toArray();

    if (closestTag[0].diff / 1000 / 60 / 60 < 24) {
      return new Response(
        JSON.stringify({ error: "用户每日每机厅新增标签上限：1" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
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

    const result = await collection.insertOne(tagDocument);

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
