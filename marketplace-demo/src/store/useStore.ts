import { create } from 'zustand';

interface StoreState {
  category: string;
  setCategory: (cat: string) => void;
  email: string;
  setEmail: (email: string) => void;
  message: string;
  setMessage: (msg: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  category: '',
  setCategory: (cat) => set({ category: cat }),
  email: '',
  setEmail: (email) => set({ email }),
  message: '',
  setMessage: (msg) => set({ message: msg }),
})); 