import type { NextRequest } from "next/server";

import { Readable } from "node:stream";

import { GridFSBucket, ObjectId } from "mongodb";

import client from "@/lib/db";
import { auth } from "@/auth";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// TODO: the above break down in next build

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: "You must login first." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await request.formData();
  const image = data.get("image") as File;
  const arrayBuffer = await image.arrayBuffer();

  const readableStream = new Readable();

  readableStream._read = () => {};
  readableStream.push(Buffer.from(arrayBuffer));
  readableStream.push(null);

  try {
    await client.connect();
    const db = client.db("maimap");
    const bucket = new GridFSBucket(db, { bucketName: "avatars" });

    const uploadStream = bucket.openUploadStream(image.name, {
      metadata: { user: new ObjectId(session.user.id) },
    });

    readableStream.pipe(uploadStream);

    return new Response(
      JSON.stringify({ message: "File uploaded successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error connecting to database.", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
