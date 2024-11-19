// POST Review byId api
import { pool } from "@/lib/db";
import { review } from "@/types/reviews";

export async function POST(request: Request) {
  const formReview: review = await request.json();

  if (String(formReview.coin_price) === "") formReview.coin_price = null;

  if (!formReview) {
    return new Response(JSON.stringify({ error: "Missing request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const query = `
      INSERT INTO reviews (
          store_id, username, email, rating,
          arcade_count, coin_price, pc_coin_count, 
          comment, created_at, vote, show_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
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

  const values = [
    formReview.store_id,
    formReview.username,
    formReview.email,
    formReview.rating,
    formReview.arcade_count,
    formReview.coin_price,
    formReview.pc_coin_count,
    formReview.comment,
    timestamp,
    0,
    formReview.show_email,
  ];

  try {
    const [results] = await pool.promise().query(query, values);

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error, values }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
