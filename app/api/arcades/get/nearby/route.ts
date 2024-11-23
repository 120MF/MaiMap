import { type NextRequest } from "next/server";

import client from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const range = searchParams.get("range");
  const sortMethod = searchParams.get("sortMethod");

  if (!lat || !lng || !range) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  let sort: any;
  let collation: any = null;

  switch (sortMethod) {
    case "DistanceAscending":
      sort = { distance: 1 };
      break;
    case "DistanceDescending":
      sort = { distance: -1 };
      break;
    case "PinyinAscending":
      sort = { store_name: 1 };
      collation = { locale: "zh" };
      break;
    case "PinyinDescending":
      sort = { store_name: -1 };
      collation = { locale: "zh" };
      break;
    case "Default":
    default:
      sort = { store_id: 1 };
  }

  try {
    await client.connect();
    const db = client.db("maimap");
    const collection = db.collection("arcades");

    const arcades = await collection
      .aggregate(
        [
          {
            $geoNear: {
              near: { type: "Point", coordinates: [Number(lng), Number(lat)] },
              distanceField: "distance",
              spherical: true,
              maxDistance: Number(range) * 1000,
            },
          },
          {
            $match: {
              distance: { $lte: Number(range) * 1000 }, // 过滤掉超出半径的点
            },
          },
          {
            $addFields: {
              store_lat: { $toDouble: "$store_lat" },
              store_lng: { $toDouble: "$store_lng" },
            },
          },
          {
            $project: {
              _id: 0,
              store_pos: 0,
            },
          },
          { $sort: sort },
        ],
        { collation },
      )
      .toArray();

    return new Response(JSON.stringify(arcades), {
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
