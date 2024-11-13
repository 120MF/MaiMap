import { arcade } from "@/types/arcades";
import { create } from "zustand";

export enum SortMethod {
  DistanceAscending,
  DistanceDescending,
  PinyinAscending,
  PinyinDescending,
  Default,
}

interface ArcadesState {
  nearbyArcades: arcade[];
  arcadeId: number;
  sortMethod: SortMethod;
  //   methods
  update_nearby: (items: arcade[]) => void;
  update_arcadeId: (id: number) => void;
  fetch_nearby_arcade: (lat: number, lng: number, range: number) => void;
  update_sortMethod: (newMethod: SortMethod) => void;
}

const useArcades = create<ArcadesState>()((set, get) => ({
  nearbyArcades: [],
  arcadeId: -1,
  sortMethod: SortMethod.Default,
  update_arcadeId: (id) => set({ arcadeId: id }),
  update_nearby: (items) => set({ nearbyArcades: items }),
  fetch_nearby_arcade: async (lat, lng, range) => {
    const { sortMethod } = get();
    const methodString = SortMethod[sortMethod];
    const res = await fetch(
      `/arcades/get/nearby?lat=${lat}&lng=${lng}&range=${range}&sortMethod=${methodString}`,
    );

    if (res.status === 500) {
      return;
    }
    const data: arcade[] = await res.json();

    set({ nearbyArcades: data });
  },
  update_sortMethod: (newMethod) => set({ sortMethod: newMethod }),
}));

export type { ArcadesState };
export { useArcades };
