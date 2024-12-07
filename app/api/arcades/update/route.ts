import { type NextRequest } from "next/server";

import client from "@/lib/db";
import { auth } from "@/auth";
import { ArcadeFormInput } from "@/components/DrawerBoxComponents/EditArcadeForm";

export async function POST(request: NextRequest) {
  const form: ArcadeFormInput = await request.json();

  if (!form) {
    return new Response(JSON.stringify({ error: "Missing request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = await auth();

  if (!session) {
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
    const collection = db.collection("arcades");

    const result = await collection.updateOne(
      { store_id: form.arcadeId },
      {
        $set: {
          arcade_dead: form.arcadeDead,
          store_name: form.arcadeName,
          store_address: form.arcadeAddress,
          store_lat: parseFloat(String(form.arcadeLat)),
          store_lng: parseFloat(String(form.arcadeLng)),
          store_arcade_count: form.arcadeCount,
          store_pc_coin_count: form.arcadePcPrice,
          store_coin_price: form.arcadeCoinPrice,
          store_pos: {
            type: "Point",
            coordinates: [
              parseFloat(String(form.arcadeLng)),
              parseFloat(String(form.arcadeLat)),
            ],
          },
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
