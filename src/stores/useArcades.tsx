import { create } from 'zustand';

import type { Arcade } from '@/types/arcades';
import { SortMethod } from '@/types/arcades';
import type { ApiResponse } from '@/types/response.ts';

const url = process.env.BACKEND_URL;

interface ArcadesState {
  nearbyArcades: Arcade[];
  detailArcade: Arcade | null;
  arcadeId: number;
  sortMethod: SortMethod;
  //   methods
  update_nearby: (items: Arcade[]) => void;
  update_arcadeId: (id: number) => void;
  fetch_nearby_arcade: (lat: number, lng: number, range: number) => void;
  fetch_detailArcade: (id: number) => void;
  update_detailArcade: (arcade: Arcade | null) => void;
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
      `${url}arcades?lat=${lat}&lng=${lng}&range=${range}&sort=${methodString}`,
    );

    if (res.status !== 200) {
      return;
    }

    const response: ApiResponse<Arcade[]> = await res.json();
    const arcades = response.data;

    set({ nearbyArcades: arcades });
  },
  fetch_detailArcade: async (id) => {
    const res = await fetch(`/api/arcades/get/byId?id=${id}`);

    if (res.status === 500) {
      set({ detailArcade: null });

      return;
    }
    const data: Arcade = await res.json();

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
