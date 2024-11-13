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

  // useEffect(() => {
  //   const state_lng = state.urlPos[0];
  //   const state_lat = state.urlPos[1];
  //
  //   if (lng !== state_lng || lat !== state_lat) {
  //     dispatch({
  //       type: "url/pos_update",
  //       payload: [lng, lat],
  //     });
  //   }
  //   if (range !== state.range) {
  //     dispatch({
  //       type: "url/range_update",
  //       payload: range,
  //     });
  //   }
  //
  //   async function fetchArcades() {
  //     try {
  //       const res = await fetch(
  //         `/api/arcades/nearby?lat=${lat}&lng=${lng}&distance=${range}`,
  //       );
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       const result = await res.json();
  //       dispatch({ type: "nearby/update", payload: result });
  //     } catch (error) {
  //       console.error("Failed to fetch arcades:", error);
  //     }
  //   }
  //   if (lng !== state_lng || lat !== state_lat || range !== state.range) {
  //     fetchArcades();
  //   }
  // }, [lat, lng, range, state.urlPos, state.range]);
  //
  // useEffect(() => {
  //   dispatch({ type: "detailId/update", payload: detailId });
  //   if (detailId && state.nearbyArcades.length > 0) {
  //     const detailArcade = state.nearbyArcades.find(
  //       (element) => Number(element.store_id) === Number(detailId),
  //     );
  //     if (detailArcade)
  //       dispatch({
  //         type: "center/update",
  //         payload: [detailArcade.store_lng, detailArcade.store_lat],
  //       });
  //   } else {
  //     if (state.hasParams)
  //       dispatch({ type: "center/update", payload: state.urlPos });
  //   }
  // }, [detailId, state.hasParams, state.nearbyArcades, state.urlPos]);

  return <></>;
}

export default Updater;
