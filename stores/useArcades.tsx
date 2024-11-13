import { arcade } from "@/types/arcades";
import { create } from "zustand";

export enum SortMethod {
  DistanceAscending,
  DistanceDescending,
  PinyinAscending,
  PinyinDescending,
  Default,
}

export function sortMethodToChineseString(method: SortMethod) {
  switch (method) {
    case SortMethod.DistanceAscending:
      return "按距离升序";
    case SortMethod.DistanceDescending:
      return "按距离降序";
    case SortMethod.PinyinAscending:
      return "按拼音升序";
    case SortMethod.PinyinDescending:
      return "按拼音降序";
    case SortMethod.Default:
    default:
      return "默认";
  }
}

export function chineseStringToSortMethod(string: string) {
  switch (string) {
    case "按距离升序":
      return SortMethod.DistanceAscending;
    case "按距离降序":
      return SortMethod.DistanceDescending;
    case "按拼音升序":
      return SortMethod.PinyinDescending;
    case "按拼音降序":
      return SortMethod.PinyinDescending;
    case "默认":
    default:
      return SortMethod.Default;
  }
}

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
      `/arcades/get/nearby?lat=${lat}&lng=${lng}&range=${range}&sortMethod=${methodString}`,
    );

    if (res.status === 500) {
      return;
    }
    const data: arcade[] = await res.json();

    set({ nearbyArcades: data });
  },
  fetch_detailArcade: async (id) => {
    const res = await fetch(`arcades/get/byId?id=${id}`);

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
