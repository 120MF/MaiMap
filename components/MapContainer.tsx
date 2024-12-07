"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Map } from "@uiw/react-amap-map";
import { APILoader } from "@uiw/react-amap-api-loader";
import { ToolBarControl } from "@uiw/react-amap-tool-bar-control";
import { Circle } from "@uiw/react-amap-circle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import GeolocationButton from "@/components/GeolocationButton";
import { MapState, useMap } from "@/stores/useMap";
import { ArcadesState, useArcades } from "@/stores/useArcades";
import TargetMarker from "@/components/MapComponents/TargetMarker";
import EditArcadeMarker from "@/components/MapComponents/EditArcadeMarker";
import ArcadeMarker from "@/components/MapComponents/ArcadeMarker";

function MaiMap() {
  const centerLat = useMap((state: MapState) => state.centerLat);
  const centerLng = useMap((state: MapState) => state.centerLng);
  const targetLat = useMap((state: MapState) => state.targetLat);
  const targetLng = useMap((state: MapState) => state.targetLng);
  const markLat = useMap((state: MapState) => state.markLat);
  const markLng = useMap((state: MapState) => state.markLng);
  const range = useMap((state: MapState) => state.range);
  const isEditing = useMap((state: MapState) => state.isEditing);
  const isMarking = useMap((state: MapState) => state.isMarking);
  const setIsMarking = useMap((state: MapState) => state.setIsMarking);
  const update_center = useMap((state: MapState) => state.update_center);
  const update_mark = useMap((state: MapState) => state.update_mark);
  const nearbyArcades = useArcades(
    (state: ArcadesState) => state.nearbyArcades,
  );
  const arcadeId = useArcades((state: ArcadesState) => state.arcadeId);
  const detailArcade = useArcades((state) => state.detailArcade);
  const update_arcadeId = useArcades(
    (state: ArcadesState) => state.update_arcadeId,
  );
  const [pressedPosition, setPressedPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { theme } = useTheme();
  // 在<Map>的center属性中使用syncedCenter,而不是MapStore中的center
  // 避免修改机厅信息时，状态更新导致地图锁定在中心无法拖动
  const [syncedCenter, setSyncedCenter] = useState([centerLng, centerLat]);

  useEffect(() => {
    if (detailArcade) {
      setSyncedCenter([detailArcade.store_lng, detailArcade.store_lat]);
    } else {
      setSyncedCenter([targetLng, targetLat]);
    }
  }, [detailArcade]);

  useEffect(() => {
    if (!isMarking) {
      setSyncedCenter([centerLng, centerLat]);
    }
  }, [centerLat, centerLng]);

  // 修改机厅位置时，在地图上点击的回调函数，仅在移动端上被调用
  function onMapTouchStart(event: any) {
    if (isMarking) {
      setPressedPosition([event.pixel.x, event.pixel.y]);
    }
  }

  function onMapTouchEnd(event: any) {
    if (
      isMarking &&
      Math.abs(pressedPosition[0] - event.pixel.x) < 10 &&
      Math.abs(pressedPosition[1] - event.pixel.y) < 10
    ) {
      update_mark([event.lnglat.lat, event.lnglat.lng]);
      setIsMarking(false);
    }
  }
  // 修改机厅位置时，在地图上点击的回调函数，仅在桌面端网页被调用
  function onMapClick(event: any) {
    if (isMarking) {
      update_mark([event.lnglat.lat, event.lnglat.lng]);
      setIsMarking(false);
    }
  }

  function onArcadeMarkerClick(arcade) {
    const params = new URLSearchParams(searchParams);

    params.set("arcadeId", String(arcade.store_id));
    replace(`${pathname}?${params.toString()}`);
    update_center([arcade.store_lng, arcade.store_lat]);
    update_arcadeId(arcade.store_id);
  }

  // uiw Map组件配合Typescript使用时有Bug，导致各种 props type 无法正常传递，可使用@ts-ignore忽略报错

  return (
    <Map
      key={theme}
      // @ts-ignore
      center={syncedCenter}
      mapStyle={
        theme === "light" ? "amap://styles/normal" : "amap://styles/dark"
      }
      style={{ height: "90vh", width: "100vw" }}
      zoom={10}
      onClick={onMapClick}
      onTouchEnd={onMapTouchEnd}
      onTouchStart={onMapTouchStart}
    >
      {/*地图尺寸控件，放置在左下角*/}
      {/*@ts-ignore*/}
      <ToolBarControl offset={[10, 60]} position="LT" visible={true} />
      {/*半径圆，不能在编辑机厅位置时渲染，否则会遮挡图层*/}
      {!isEditing ? (
        <Circle
          key={range}
          // @ts-ignore
          center={[targetLng, targetLat]}
          fillOpacity={0.1}
          radius={range * 1000}
          strokeColor="#fff"
          strokeWeight={2}
          visible={true}
        />
      ) : null}

      {/*标定点的位置标记*/}
      <TargetMarker targetLat={targetLat} targetLng={targetLng} />
      {/*在编辑模式下显示用户标记的机厅位置*/}
      {isEditing && markLat !== 0 ? (
        <EditArcadeMarker markLat={markLat} markLng={markLng} />
      ) : null}
      {/*将范围内arcade渲染成Marker*/}
      {nearbyArcades.map((arcade, index) => (
        <ArcadeMarker
          key={index}
          arcade={arcade}
          currentArcadeId={arcadeId}
          onMarkerClick={onArcadeMarkerClick}
        />
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
