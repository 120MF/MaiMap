"use client";

import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Geolocation,
} from "@uiw/react-amap";

export default function MapContainer({ lat = 39.05, lng = 121.78 }) {
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;
  // if (!lat) lat = 39.05;
  // if (!lng) lng = 121.78;

  return (
    <APILoader version="2.0.5" akey={akey}>
      <Map style={{ height: "90vh", width: "100vw" }} center={[lng, lat]}></Map>
    </APILoader>
  );
}
