import { create } from "zustand";

type UserStoreState = {
  userId: string;
  email: string;
  profileUrl?: string;
  displayName?: string;
};

type UserStoreActions = {
  setUserId: (arg: string) => void;
  setEmail: (arg: string) => void;
  setUser: (user: any | null) => void;
  clearStore: () => void;
};

type UserStore = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStore>((set) => ({
  userId: "",
  email: "",
  setUser: (user) => {
    if (!user) return;

    set(() => ({
      userId: user.id,
      email: user.email,
      profileUrl: user?.user_metadata?.avatar_url ?? "",
      displayName: user?.user_metadata?.fullName ?? "",
    }));
  },
  setUserId: (id: string) =>
    set((state) => ({
      ...state,
      userId: id,
    })),
  setEmail: (email: string) =>
    set((state) => ({
      ...state,
      email,
    })),
  clearStore: () => set({ userId: "", email: "" }),
}));
