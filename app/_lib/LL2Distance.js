function getRad(d) {
  const PI = Math.PI;
  return (d * PI) / 180.0;
}

export function LL2Distance(lng1, lat1, lng2, lat2) {
  lng1 = Number(lng1);
  lat1 = Number(lat1);
  lng2 = Number(lng2);
  lat2 = Number(lat2);
  const f = getRad((lat1 + lat2) / 2);
  const g = getRad((lat1 - lat2) / 2);
  const l = getRad((lng1 - lng2) / 2);
  let sg = Math.sin(g);
  let sl = Math.sin(l);
  let sf = Math.sin(f);
  let s, c, w, r, d, h1, h2;
  const a = 6378137.0;
  const fl = 1 / 298.257;
  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;
  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;
  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  // if (s >= 1000 && s <= 99000) {
  //   const kilometer = s / 1000;
  //   s = kilometer.toFixed(1) + "km";
  // } else if (s > 99000) {
  //   s = ">99km";
  // } else {
  //   s = Math.round(s) + "m";
  // }

  s = s / 1000;
  s = s.toFixed(4);

  return s;
}
