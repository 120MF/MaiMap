"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMap, MapState } from "@/stores/useMap";

function Updater() {
  const searchParams = useSearchParams();

  const range = Number(searchParams.get("range")) || null;
  const lat = Number(searchParams.get("lat")) || null;
  const lng = Number(searchParams.get("lng")) || null;
  const arcadeId = Number(searchParams.get("arcadeId")) || null;

  const update_center = useMap((state: MapState) => state.update_center);
  const update_range = useMap((state: MapState) => state.update_range);

  useEffect(() => {
    if (lat && lng) update_center([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (range) update_range(range);
  }, [range]);

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
