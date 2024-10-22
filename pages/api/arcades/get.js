import fs from "fs";
import path from "path";

import { LL2Distance } from "@/app/_lib/LL2Distance";

export default async function handler(req, res) {
  const { query } = req;
  const { lat, lng, range } = query;

  if (!lat || !lng || !range) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude and range are required" });
  }

  const filePath = path.join(
    process.cwd(),
    "pages",
    "api",
    "arcades",
    "arcades.json",
  );
  fs.readFile(filePath, "utf8", (err, fileContents) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    try {
      const arcades = JSON.parse(fileContents);
      const filteredArcades = arcades.filter((arcade) => {
        const [arcadeLat, arcadeLng] = arcade.pos;
        return Math.abs(LL2Distance(arcadeLng, arcadeLat, lng, lat)) <= range;
      });

      res.status(200).json(filteredArcades);
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });
}
