import { arcade } from "@/types/arcades";
import { create } from "zustand";
interface ArcadesState {
  nearbyArcades: arcade[];
  arcadeId: number;
  //   methods
  update_nearby: (items: arcade[]) => void;
  update_arcadeId: (id: number) => void;
  fetch_nearby_arcade: (lat: number, lng: number, range: number) => void;
}

const useArcades = create<ArcadesState>()((set) => ({
  nearbyArcades: [],
  arcadeId: -1,
  update_arcadeId: (id) => set({ arcadeId: id }),
  update_nearby: (items) => set({ nearbyArcades: items }),
  fetch_nearby_arcade: async (lat, lng, range) => {
    const res = await fetch("/arcades/get/nearby", {
      method: "POST",
      body: JSON.stringify({ lat, lng, range }),
    });

    if (res.status === 500) {
      return;
    }
    const data: arcade[] = await res.json();

    set({ nearbyArcades: data });
  },
}));

export type { ArcadesState };
export { useArcades };
