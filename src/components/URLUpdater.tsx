"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useMap, MapState } from "@/stores/useMap";
import { ArcadesState, useArcades } from "@/stores/useArcades";
import { useReviews } from "@/stores/useReviews";
import { useTags } from "@/stores/useTags";

function URLUpdater() {
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

  const update_currentReviews = useReviews(
    (state) => state.update_currentReviews,
  );
  const fetch_currentReviews = useReviews(
    (state) => state.fetch_currentReviews,
  );
  const fetch_currentTags = useTags((state) => state.fetch_currentTags);

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
    if (arcadeId) {
      update_arcadeId(arcadeId);
      fetch_detailArcade(arcadeId);
      fetch_currentReviews(arcadeId);
      fetch_currentTags(arcadeId);
    } else {
      update_arcadeId(-1);
      update_detailArcade(null);
      update_currentReviews([]);
    }
  }, [arcadeId]);

  return <></>;
}

export default URLUpdater;
