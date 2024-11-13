import { create } from "zustand";
import { coord } from "@/types/map";

interface MapState {
  centerLat: number;
  centerLng: number;
  targetLat: number;
  targetLng: number;
  range: number;
  //   methods
  update_center: (coord: coord) => void;
  update_target: (coord: coord) => void;
  update_range: (range: number) => void;
}

const useMap = create<MapState>()((set) => ({
  centerLat: 39.909333,
  centerLng: 116.397183,
  targetLat: 39.909333,
  targetLng: 116.397183,
  range: 40,
  update_center: (coord) => {
    if (coord[0] < coord[1]) {
      coord.reverse();
    }
    set({ centerLat: coord[1], centerLng: coord[0] });
  },
  update_target: (coord) => {
    if (coord[0] < coord[1]) {
      coord.reverse();
    }
    set({ targetLat: coord[1], targetLng: coord[0] });
  },
  update_range: (range) => set({ range: range }),
}));

export { useMap };
export type { MapState };
