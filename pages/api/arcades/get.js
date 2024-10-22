import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { query } = req;
  const { lat, lng } = query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
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
        return (
          Math.abs(arcadeLat - lat) <= 0.5 && Math.abs(arcadeLng - lng) <= 0.5
        );
      });
      console.log(filteredArcades);

      res.status(200).json(filteredArcades);
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  });
}
