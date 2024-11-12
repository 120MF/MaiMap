import { create } from "zustand";
import { coord } from "@/types/map";

interface MapState {
  centerPos: coord;
  range: number;
  //   methods
  update_center: (coord: coord) => void;
  update_range: (range: number) => void;
}

const useMap = create<MapState>()((set) => ({
  centerPos: [116.397183, 39.909333],
  range: 40,
  update_center: (coord) => set({ centerPos: coord }),
  update_range: (range) => set({ range: range }),
}));

export { useMap };
export type { MapState };
