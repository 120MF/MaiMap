import { create } from 'zustand';

export interface TagsState {
  theme: string;
  update_theme: (theme: string) => void;
}

export const useTheme = create<TagsState>()((set) => ({
  theme: 'light',
  update_theme: async (theme) => {
    set({ theme: theme });
  },
}));
