import { create } from "zustand";

const initialState = {
  characterId: null,
};

const useCharacterDrawerStore = create((set) => ({
  ...initialState,
  closeCharacterDrawer: () => set({ characterId: null }),
  openCharacterDrawer: (characterId: string | null) => set({ characterId }),
}));

export default useCharacterDrawerStore;
