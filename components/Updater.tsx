"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useMap, MapState } from "@/stores/useMap";
import { ArcadesState, useArcades } from "@/stores/useArcades";
import { arcade } from "@/types/arcades";

function Updater() {
  const searchParams = useSearchParams();

  const range = Number(searchParams.get("range")) || 40;
  const lat = Number(searchParams.get("lat")) || 39.909333;
  const lng = Number(searchParams.get("lng")) || 116.397183;
  const arcadeId = Number(searchParams.get("arcadeId")) || null;

  const update_center = useMap((state: MapState) => state.update_center);
  const update_arcadeId = useArcades(
    (state: ArcadesState) => state.update_arcadeId,
  );
  const update_target = useMap((state: MapState) => state.update_target);
  const update_range = useMap((state: MapState) => state.update_range);
  const fetch_nearby_arcades = useArcades(
    (state: ArcadesState) => state.fetch_nearby_arcade,
  );
  const fetch_detailArcade = useArcades((state) => state.fetch_detailArcade);
  const update_detailArcade = useArcades((state) => state.update_detailArcade);

  useEffect(() => {
    if (lat && lng) {
      update_center([lng, lat]);
      update_target([lng, lat]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (range) update_range(range);
  }, [range]);

  useEffect(() => {
    if (lat && lng && range) fetch_nearby_arcades(lat, lng, range);
  }, [lat, lng, range]);

  useEffect(() => {
    async function fetchArcade(id: number) {
      const res = await fetch(`/arcades/get/byId?id=${id}`);

      if (res.status !== 200) throw new Error("fetch Arcade by Id failed.");
      const data: arcade = await res.json();

      update_center([data.store_lng, data.store_lat]);
    }
    if (arcadeId) {
      update_arcadeId(arcadeId);
      fetchArcade(arcadeId);
    }
  }, []);
  useEffect(() => {
    if (arcadeId) fetch_detailArcade(arcadeId);
    else update_detailArcade(null);
  }, [arcadeId]);

  return <></>;
}

export default Updater;
