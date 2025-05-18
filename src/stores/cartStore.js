// src/stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
  const orders = ref(JSON.parse(localStorage.getItem('orders')) || []) // Tambahkan ini

  // Total harga semua item di cart
  const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.total, 0)
  })

  // Tambah item ke cart
  const addItem = (product) => {
    const existingItem = cart.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += product.quantity
      existingItem.total = existingItem.price * existingItem.quantity
    } else {
      cart.value.push({
        ...product,
        total: product.price * product.quantity,
      })
    }
    saveToLocalStorage()
  }

  // Hapus item dari cart
  const removeItem = (index) => {
    cart.value.splice(index, 1)
    saveToLocalStorage()
  }

  // Update quantity item
  const updateQuantity = (index, change) => {
    const newQuantity = cart.value[index].quantity + change

    if (newQuantity < 1) {
      removeItem(index) // Perbaikan: hapus 'this.'
      return
    }

    cart.value[index].quantity = newQuantity
    cart.value[index].total = cart.value[index].price * newQuantity
    saveToLocalStorage()
  }

  // Simpan ke localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  const checkout = (orderData) => {
    const order = {
      ...orderData,
      items: [...cart.value],
      total: totalPrice.value,
      orderDate: new Date().toISOString(),
      status: 'pending',
    }

    // Tambahkan ke riwayat order
    orders.value.push(order)
    localStorage.setItem('orders', JSON.stringify(orders.value))

    // Kosongkan cart setelah checkout
    cart.value = []
    localStorage.setItem('cart', JSON.stringify(cart.value))

    return order
  }

  return {
    cart,
    orders, // Sekarang orders sudah terdefinisi
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    checkout,
  }
})
