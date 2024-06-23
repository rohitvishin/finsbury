// lib/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  value: [], // Initial value
  setValue: (newIds) => set((state) => ({
    value: [...new Set([...state.value, ...newIds])] // Add new IDs, avoiding duplicates
  }))
}));

export default useStore;
