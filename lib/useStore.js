// store/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  value: [],
  setValue: (newValue) => set({ value: newValue })
}));

export default useStore;
