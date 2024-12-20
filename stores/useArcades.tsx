import { create } from "zustand";

import { arcade, SortMethod } from "@/types/arcades";

interface ArcadesState {
  nearbyArcades: arcade[];
  detailArcade: arcade | null;
  arcadeId: number;
  sortMethod: SortMethod;
  //   methods
  update_nearby: (items: arcade[]) => void;
  update_arcadeId: (id: number) => void;
  fetch_nearby_arcade: (lat: number, lng: number, range: number) => void;
  fetch_detailArcade: (id: number) => void;
  update_detailArcade: (arcade: arcade | null) => void;
  update_sortMethod: (newMethod: SortMethod) => void;
}

const useArcades = create<ArcadesState>()((set, get) => ({
  nearbyArcades: [],
  detailArcade: null,
  arcadeId: -1,
  sortMethod: SortMethod.Default,
  update_arcadeId: (id) => set({ arcadeId: id }),
  update_nearby: (items) => set({ nearbyArcades: items }),
  fetch_nearby_arcade: async (lat, lng, range) => {
    const { sortMethod } = get();
    const methodString = SortMethod[sortMethod];
    const res = await fetch(
      `/api/arcades/get/nearby?lat=${lat}&lng=${lng}&range=${range}&sortMethod=${methodString}`,
    );

    if (res.status === 500) {
      return;
    }
    const data: arcade[] = await res.json();

    set({ nearbyArcades: data });
  },
  fetch_detailArcade: async (id) => {
    const res = await fetch(`/api/arcades/get/byId?id=${id}`);

    if (res.status === 500) {
      set({ detailArcade: null });

      return;
    }
    const data: arcade = await res.json();

    set({ detailArcade: data });
  },
  update_detailArcade: (arcade) => {
    set({ detailArcade: arcade });
  },
  update_sortMethod: (newMethod) => {
    set({ sortMethod: newMethod });
  },
}));

export type { ArcadesState };
export { useArcades };
