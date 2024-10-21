"use client";

import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Geolocation,
  Marker,
} from "@uiw/react-amap";

export default function MapContainer({ lat = 39.05, lng = 121.78 }) {
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;
  const center = [lng, lat];
  return (
    <APILoader version="2.0.5" akey={akey}>
      <Map style={{ height: "90vh", width: "100vw" }} center={center}>
        <Marker
          title="中心"
          offset={new AMap.Pixel(-20, -30)}
          label={{
            // 设置文本标注偏移量
            // offset: new AMap.Pixel(20, 20),
            // 设置文本标注内容
            // content: "查询位置",
            // 设置文本标注方位
            direction: "right",
          }}
          position={center}
        >
          <div className={"flex w-12 text-xs text-amber-400"}>
            当前位置
          </div>
        </Marker>
      </Map>
    </APILoader>
  );
}
