import { arcade } from "@/types/arcades";
import { create } from "zustand";
interface Arcades {
  nearbyArcades: arcade[];
  arcadeId: number;
  //   methods
  update_nearby: (items: arcade[]) => void;
  update_arcadeId: (id: number) => void;
}

const useArcades = create<Arcades>()((set) => ({
  nearbyArcades: [],
  arcadeId: -1,
  update_arcadeId: (id) => set({ arcadeId: id }),
  update_nearby: (items) => set({ nearbyArcades: items }),
}));
