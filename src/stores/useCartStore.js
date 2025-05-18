import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0
  }),
  actions: {
    addItem(item) {
      this.items.push(item)
      this.calculateTotal()
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.calculateTotal()
    },
    calculateTotal() {
      this.total = this.items.reduce((sum, item) => sum + item.price, 0)
    }
  },
  getters: {
    itemCount: (state) => state.items.length
  }
})
