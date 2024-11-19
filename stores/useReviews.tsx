import { create } from "zustand";

import { review } from "@/types/reviews";

async function getArcadeReviews(id: number) {
  const res = await fetch(`/api/reviews/get/byId?id=${id}`);

  if (res.status !== 200) {
    throw new Error("fetch reviews failed");
  }

  return await res.json();
}

export interface ReviewsState {
  currentReviews: review[];
  fetch_currentReviews: (id: number) => void;
  update_currentReviews: (review: review[]) => void;
}

export const useReviews = create<ReviewsState>()((set) => ({
  currentReviews: [],
  fetch_currentReviews: async (id) => {
    const reviews = await getArcadeReviews(id);

    set({ currentReviews: reviews });
  },
  update_currentReviews: (review) => {
    set({ currentReviews: review });
  },
}));
