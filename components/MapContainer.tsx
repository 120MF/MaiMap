"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import Map from "@uiw/react-amap-map";
import APILoader from "@uiw/react-amap-api-loader";
import ScaleControl from "@uiw/react-amap-scale-control";
import ToolBarControl from "@uiw/react-amap-tool-bar-control";
import Marker from "@uiw/react-amap-marker";
import Circle from "@uiw/react-amap-circle";

import GeolocationButton from "@/components/GeolocationButton";
import { MapState, useMap } from "@/stores/useMap";

function MaiMap() {
  const cp = useMap((state: MapState) => state.centerPos);
  return (
    <div>
      {cp[0]}
      {cp[1]}
    </div>
  );
}

export default function MapContainer({}) {
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;

  return (
    // @ts-ignore
    // <APILoader version="2.0.5" akey={akey}>
    //   <div className="relative">
    //     <MaiMap />
    //     <GeolocationButton />
    //   </div>
    // </APILoader>
    <MaiMap />
  );
}
