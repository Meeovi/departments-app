import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[],
  }),
  actions: {
    addToCart(product: any) {
      const existing = this.items.find(i => i.id === product.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        this.items.push({ ...product, qty: 1 });
      }
    },
    removeFromCart(id: string) {
      this.items = this.items.filter(i => i.id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
});
