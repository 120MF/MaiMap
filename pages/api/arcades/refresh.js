export default async function handler(req, res) {
  // maybe do some scrapes here
  // url:http://wc.wahlap.net/maidx/location/index.html
  res.status(200).json({ message: "Data is already up-to-date" });
}
