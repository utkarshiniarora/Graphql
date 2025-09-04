import { create } from "zustand";

type UIState = {
  activeTab: "forYou" | "following" | "discover";
  setTab: (t: UIState["activeTab"]) => void;
  optimisticLikes: Record<string, number>;
  bumpLike: (id: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeTab: "forYou",
  setTab: (t) => set({ activeTab: t }),
  optimisticLikes: {},
  bumpLike: (id) =>
    set((s) => ({
      optimisticLikes: { ...s.optimisticLikes, [id]: (s.optimisticLikes[id] ?? 0) + 1 },
    })),
}));
