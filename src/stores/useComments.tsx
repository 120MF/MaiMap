import type { Comment } from '@/types/comments';
import { create } from 'zustand';
const url = process.env.BACKEND_URL;

async function getArcadeReviews(id: number) {
  const res = await fetch(`${url}arcades/${id}/comments`);

  if (res.status !== 200) {
    throw new Error('fetch Comments failed');
  }

  return await res.json();
}

export interface CommentsState {
  currentComments: Comment[];
  fetch_current_comments: (id: number) => void;
  update_current_comments: (Comment: Comment[]) => void;
}

export const useComments = create<CommentsState>()((set) => ({
  currentComments: [],
  fetch_current_comments: async (id) => {
    const Comments = await getArcadeReviews(id);

    set({ currentComments: Comments });
  },
  update_current_comments: (Comment) => {
    set({ currentComments: Comment });
  },
}));
