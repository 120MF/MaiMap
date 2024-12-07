import { create } from "zustand";

import { tag } from "@/types/tags";

async function getArcadeTag(id: number): Promise<tag[]> {
  const res = await fetch(`/api/tags/get/byStoreId?id=${id}`);

  if (res.status !== 200) {
    throw new Error("fetch tags failed");
  }

  return await res.json();
}

export interface TagsState {
  currentTags: tag[];
  fetch_currentTags: (id: number) => void;
}

export const useTags = create<TagsState>()((set) => ({
  currentTags: [],
  fetch_currentTags: async (id) => {
    const tags = await getArcadeTag(id);

    set({ currentTags: tags });
  },
}));
