// lib/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  value: [], // Initial value
  setValue: (newValue) => set((state) => ({ value: [...state.value, ...newValue] })), // Add new values to the existing state
}));

export default useStore;
