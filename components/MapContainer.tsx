"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Map } from "@uiw/react-amap-map";
import { APILoader } from "@uiw/react-amap-api-loader";
import { ScaleControl } from "@uiw/react-amap-scale-control";
import { ToolBarControl } from "@uiw/react-amap-tool-bar-control";
import { Marker } from "@uiw/react-amap-marker";
import { Circle } from "@uiw/react-amap-circle";
import { useTheme } from "next-themes";

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
  const update_arcadeId = useArcades(
    (state: ArcadesState) => state.update_arcadeId,
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { theme } = useTheme();

  // @ts-ignore
  return (
    <Map
      center={[centerLng, centerLat]}
      mapStyle={
        theme === "light" ? "amap://styles/light" : "amap://styles/dark"
      }
      style={{ height: "95vh", width: "100vw" }}
    >
      <ScaleControl offset={[20, 10]} position="LB" visible={true} />
      <ToolBarControl offset={[10, 70]} position="RT" visible={true} />
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
        <Marker
          key={index}
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
          {arcadeId === arcade.store_id ? (
            <Image
              alt="arcade"
              height={50}
              src="/nail-arcade-selected.png"
              width={30}
            />
          ) : (
            <Image alt="arcade" height={50} src="/nail-arcade.png" width={30} />
          )}
        </Marker>
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