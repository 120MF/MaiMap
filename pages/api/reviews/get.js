import pool from "@/app/_lib/db";

export default function handler(req, res) {
  const { store_id } = req.query;
  if (!store_id) {
    return res
      .status(400)
      .json({ error: "Missing required parameter: store_id" });
  }

  const query = `
    SELECT *
    FROM reviews
    WHERE store_id = ?
  `;

  pool.query(query, [store_id], (error, results) => {
    if (error) {
      console.error("An error occurred", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(results);
  });
}
