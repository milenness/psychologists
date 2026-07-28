import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: User | null;
  favorites: string[];
  setUser: (user: User | null) => void;
  clearUser: () => void;
  toggleFavorite: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      favorites: [],
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null, favorites: [] });
        localStorage.removeItem("auth-storage");
      },
      toggleFavorite: (id: string) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((favId) => favId !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
