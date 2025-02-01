import { create } from "zustand";

interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  isAnonymous: boolean;
}

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

type DarkModeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const useDarkModeStore = create<DarkModeStore>((set) => ({
  isDarkMode: JSON.parse(localStorage.getItem("dark") || "false"),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem("dark", JSON.stringify(newMode));
      return { isDarkMode: newMode };
    }),
}));

type VolumeStore = {
  isMuted: boolean;
  toggleMute: () => void;
};

export const useVolumeStore = create<VolumeStore>((set) => ({
  isMuted: JSON.parse(localStorage.getItem("mute") || "false"),
  toggleMute: () =>
    set((state) => {
      const newMuteState = !state.isMuted;
      localStorage.setItem("mute", JSON.stringify(newMuteState));
      return { isMuted: newMuteState };
    }),
}));

type AIResponseStore = {
  isAIResponseEnabled: boolean;
  toggleAIResponse: () => void;
};

export const useAIResponseStore = create<AIResponseStore>((set) => ({
  isAIResponseEnabled: JSON.parse(localStorage.getItem("aiResponse") || "true"),
  toggleAIResponse: () =>
    set((state) => {
      const newAIState = !state.isAIResponseEnabled;
      localStorage.setItem("aiResponse", JSON.stringify(newAIState));
      return { isAIResponseEnabled: newAIState };
    }),
}));
