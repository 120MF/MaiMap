import { create } from "zustand";

import { coord } from "@/types/map";

interface MapState {
  centerLat: number;
  centerLng: number;
  targetLat: number;
  targetLng: number;
  markLat: number;
  markLng: number;
  range: number;
  isEditing: boolean;
  isMarking: boolean;
  //   methods
  update_center: (coord: coord) => void;
  update_target: (coord: coord) => void;
  update_mark: (coord: coord) => void;
  update_range: (range: number) => void;
  setIsEditing: (state: boolean) => void;
  setIsMarking: (state: boolean) => void;
}

const useMap = create<MapState>()((set) => ({
  centerLat: 39.909333,
  centerLng: 116.397183,
  targetLat: 39.909333,
  targetLng: 116.397183,
  markLat: 0,
  markLng: 0,
  range: 40,
  isEditing: false,
  isMarking: false,
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
  update_mark: (coord) => {
    if (coord[0] < coord[1]) {
      coord.reverse();
    }
    set({ markLat: coord[1], markLng: coord[0] });
  },
  update_range: (range) => set({ range: range }),
  setIsEditing: (state) => set({ isEditing: state }),
  setIsMarking: (state) => set({ isMarking: state }),
}));

export { useMap };
export type { MapState };
