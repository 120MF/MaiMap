import type { NextRequest } from "next/server";

import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const password = searchParams.get("password");
  const hash = searchParams.get("hash");

  try {
    if (await bcrypt.compare(password, hash)) {
      return new Response(JSON.stringify({ match: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ match: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Hash password failed.", error: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
