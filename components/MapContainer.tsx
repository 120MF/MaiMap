"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Map } from "@uiw/react-amap-map";
import { APILoader } from "@uiw/react-amap-api-loader";
import { ScaleControl } from "@uiw/react-amap-scale-control";
import { ToolBarControl } from "@uiw/react-amap-tool-bar-control";
import { Marker } from "@uiw/react-amap-marker";
import { LabelMarker } from "@uiw/react-amap-label-marker";
import { Circle } from "@uiw/react-amap-circle";
import { useTheme } from "next-themes";
import { useEffect } from "react";

import GeolocationButton from "@/components/GeolocationButton";
import { MapState, useMap } from "@/stores/useMap";
import { ArcadesState, useArcades } from "@/stores/useArcades";

function MaiMap() {
  const centerLat = useMap((state: MapState) => state.centerLat);
  const centerLng = useMap((state: MapState) => state.centerLng);
  const targetLat = useMap((state: MapState) => state.targetLat);
  const targetLng = useMap((state: MapState) => state.targetLng);
  const range = useMap((state: MapState) => state.range);
  const update_center = useMap((state: MapState) => state.update_center);
  const nearbyArcades = useArcades(
    (state: ArcadesState) => state.nearbyArcades,
  );
  const arcadeId = useArcades((state: ArcadesState) => state.arcadeId);
  const detailArcade = useArcades((state) => state.detailArcade);
  const update_arcadeId = useArcades(
    (state: ArcadesState) => state.update_arcadeId,
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { theme } = useTheme();

  useEffect(() => {
    if (detailArcade)
      update_center([detailArcade.store_lat, detailArcade.store_lng]);
    else update_center([targetLat, targetLng]);
  }, [detailArcade]);

  // @ts-ignore
  return (
    <Map
      key={theme}
      center={[centerLng, centerLat]}
      mapStyle={
        theme === "light" ? "amap://styles/default" : "amap://styles/dark"
      }
      style={{ height: "90vh", width: "100vw" }}
      zoom={10}
    >
      <ScaleControl offset={[20, 40]} position="LB" visible={true} />
      <ToolBarControl offset={[10, 60]} position="LT" visible={true} />
      <Circle
        key={range}
        center={[targetLng, targetLat]}
        fillOpacity={0.1}
        radius={range * 1000}
        strokeColor="#fff"
        strokeWeight={2}
        visible={true}
      />

      <Marker
        offset={new AMap.Pixel(-15, -42)}
        position={[targetLng, targetLat]}
        title={"标定位置"}
        visible={true}
        zIndex={300}
      >
        <Image alt="target" height={50} src="/nail-target.png" width={30} />
      </Marker>

      {nearbyArcades.map((arcade, index) => (
        <div key={index}>
          <Marker
            offset={new AMap.Pixel(-15, -42)}
            position={[arcade.store_lng, arcade.store_lat]}
            title={arcade.store_name}
            visible={true}
            zIndex={arcadeId === arcade.store_id ? 200 : 100}
            onClick={() => {
              const params = new URLSearchParams(searchParams);

              params.set("arcadeId", String(arcade.store_id));
              replace(`${pathname}?${params.toString()}`);
              update_center([arcade.store_lng, arcade.store_lat]);
              update_arcadeId(arcade.store_id);
            }}
          >
            {/*分支一：被选中，机厅停业，显示nail-arcade-dead-selected.png*/}
            {/*分支二：被选中，机厅正常，显示nail-arcade-selected.png*/}
            {/*分支三：未被选中，机厅停业，显示nail-arcade-dead.png*/}
            {/*分支四：未被选中，机厅正常，显示nail-arcade.png*/}
            <Image
              alt="arcade"
              height={50}
              src={`${arcadeId === arcade.store_id ? (arcade.arcade_dead ? "/nail-arcade-dead-selected.png" : "/nail-arcade-selected.png") : arcade.arcade_dead ? "/nail-arcade-dead.png" : "/nail-arcade.png"}`}
              width={30}
            />
          </Marker>
          <LabelMarker
            icon={null}
            position={[arcade.store_lng, arcade.store_lat]}
            text={{
              content: arcade.store_name,
              direction: "top",
              offset: [0, 18],
              style: {
                strokeColor: "#ffffff",
                fontSize: 10,
                fillColor: "#60666E",
                strokeWidth: 4,
                backgroundColor: "rgba(0,0,0,0)",
              },
            }}
          />
        </div>
      ))}
    </Map>
  );
}

export default function MapContainer() {
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;

  return (
    // @ts-ignore
    <APILoader akey={akey} version="2.0.5">
      <div className="relative">
        <MaiMap />
        <GeolocationButton />
      </div>
    </APILoader>
  );
}
