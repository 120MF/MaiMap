import type { NextRequest } from "next/server";

import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const originalPassword = searchParams.get("password");

  try {
    const hashedPassword = await bcrypt.hash(originalPassword, 10);

    return new Response(JSON.stringify(hashedPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
