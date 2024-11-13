import { create } from "zustand";
import { coord } from "@/types/map";

interface MapState {
  centerPos: coord;
  targetPos: coord;
  range: number;
  //   methods
  update_center: (coord: coord) => void;
  update_target: (coord: coord) => void;
  update_range: (range: number) => void;
}

const useMap = create<MapState>()((set) => ({
  centerPos: [116.397183, 39.909333],
  targetPos: [116.397183, 39.909333],
  range: 40,
  update_center: (coord) => {
    if (coord[0] < coord[1]) {
      coord.reverse();
    }
    set({ centerPos: coord });
  },
  update_target: (coord) => {
    if (coord[0] < coord[1]) {
      coord.reverse();
    }
    set({ targetPos: coord });
  },
  update_range: (range) => set({ range: range }),
}));

export { useMap };
export type { MapState };
