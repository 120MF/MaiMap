"use client";

import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Geolocation,
} from "@uiw/react-amap";

export default function MapContainer() {
  const position = [51.505, -0.09];
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;
  return (
    <APILoader version="2.0.5" akey={akey}>
      <Map
        style={{ height: "90vh", width: "100vw" }}
        center={[121.78, 39.05]}
      ></Map>
    </APILoader>
  );
}
