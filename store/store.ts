import { create } from "zustand";

type CartState = {
  items: { id: number; quantity: number }[];
  add: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
};

const useCart = create<CartState>((set) => ({
  items: [],
  add: (id, quantity) =>
    set((state) => ({ items: [...state.items, { id, quantity: quantity }] })),
  remove: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clear: () => set((state) => ({ items: [] })),
  increase: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decrease: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ),
    })),
}));

export default useCart;
