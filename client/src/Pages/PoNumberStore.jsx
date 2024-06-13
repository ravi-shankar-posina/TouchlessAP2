import create from "zustand";

const usePoNumberStore = create((set) => ({
  poNumber: "",
  setPoNumber: (value) => set({ poNumber: value }),
}));

export default usePoNumberStore;
