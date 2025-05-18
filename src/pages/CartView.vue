<template>
  <div>
    <NavbarComponent />
    <main>
      <section class="cart-container">
        <h1 class="cart-title">Keranjang Belanja</h1>

        <div class="cart-items">
          <div v-if="cart.length === 0" class="empty-cart">
            <i data-feather="shopping-cart"></i>
            <p>Keranjang Anda kosong</p>
            <router-link to="/menu" class="btn-belanja">Belanja Sekarang</router-link>
          </div>

          <div v-else>
            <div v-for="(item, index) in cart" :key="index" class="cart-item">
              <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image" />
              <div class="cart-item-details">
                <h3 class="cart-item-name">{{ item.name }}</h3>
                <p class="cart-item-price">Rp {{ formatPrice(item.price) }}</p>
              </div>
              <div class="cart-item-controls">
                <div class="cart-item-quantity">
                  <button @click="updateQuantity(index, -1)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(index, 1)">+</button>
                </div>
              </div>
              <div class="cart-item-total">Rp {{ formatPrice(item.total) }}</div>
              <button @click="removeItem(index)" class="cart-item-remove">
                <i data-feather="trash-2"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-if="cart.length > 0" class="cart-summary">
          <div class="summary-details">
            <h3>Ringkasan Belanja</h3>
            <div class="summary-row">
              <span>Total Harga</span>
              <span>Rp {{ formatPrice(totalPrice) }}</span>
            </div>
            <button class="btn-checkout" @click="showCheckoutModal">Checkout</button>
          </div>
        </div>
      </section>
    </main>

    <!-- Checkout Modal -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-modal" @click="closeModal">&times;</span>
        <h2>Checkout</h2>
        <form @submit.prevent="handleCheckout">
          <div class="form-group">
            <label for="namaPenerima">Nama Penerima</label>
            <input type="text" id="namaPenerima" v-model="checkoutData.namaPenerima" required />
          </div>
          <div class="form-group">
            <label for="alamat">Alamat Lengkap</label>
            <textarea id="alamat" rows="3" v-model="checkoutData.alamat" required></textarea>
          </div>
          <div class="form-group">
            <label for="noHP">Nomor HP</label>
            <input type="tel" id="noHP" v-model="checkoutData.noHP" required />
          </div>

          <h3>Metode Pembayaran</h3>
<div class="payment-method">
  <div class="payment-option active">
    <i data-feather="credit-card"></i>
    <span>QRIS</span>
  </div>

  <!-- Tambahkan bagian QRIS barcode -->
  <div class="qris-container">
    <p class="qris-instruction">Scan QR code berikut untuk pembayaran:</p>
    <img
      src="@/assets/images/qris.jpg"
      alt="QRIS Payment Code"
      class="qris-code"
    />
    <p class="qris-amount">Total: Rp {{ formatPrice(totalPrice) }}</p>
    <p class="qris-note">*Pembayaran akan diproses otomatis setelah scan</p>
  </div>
</div>

          <div class="summary-checkout">
            <h4>Ringkasan Pesanan</h4>
            <div class="summary-item" v-for="item in cart" :key="item.id">
              <span>{{ item.name }} ({{ item.quantity }}x)</span>
              <span>Rp {{ formatPrice(item.total) }}</span>
            </div>
            <div class="summary-total">
              <span>Total Pembayaran</span>
              <span>Rp {{ formatPrice(totalPrice) }}</span>
            </div>
          </div>

          <button type="submit" class="btn-confirm-payment">Konfirmasi Pembayaran</button>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal" @click.self="closeSuccessModal">
      <div class="modal-content success-content">
        <i data-feather="check-circle"></i>
        <h2>Pembayaran Berhasil!</h2>
        <p>Pesanan Anda sedang diproses. Terima kasih telah berbelanja di Unggasin.</p>
        <p>
          No. Order: <strong>{{ lastOrderNumber }}</strong>
        </p>
        <router-link to="/menu" class="btn-back-home"> Kembali ke Menu </router-link>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import FooterComponent from '@/components/Footer.vue'
import { useCartStore } from '@/stores/cartStore'
import { ref, onMounted } from 'vue'
import qrisCode from '@/assets/images/qris.jpg';

export default {
  name: 'CartView',
  components: {
    NavbarComponent,
    FooterComponent,
  },
  setup() {
  const qrisImage = ref(qrisCode);
    const cartStore = useCartStore()
    const showModal = ref(false)
    const showSuccessModal = ref(false)
    const lastOrderNumber = ref('')
    const checkoutData = ref({
      namaPenerima: '',
      alamat: '',
      noHP: '',
      paymentMethod: 'QRIS',
    })

    const getImageUrl = (imageName) => {
      return new URL(`/src/assets/images/${imageName}`, import.meta.url).href
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price)
    }

    const showCheckoutModal = () => {
      if (cartStore.cart.length === 0) {
        alert('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.')
        return
      }
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    const closeSuccessModal = () => {
      showSuccessModal.value = false
    }

    const removeItem = (index) => {
      if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
        cartStore.removeItem(index)
      }
    }

    const updateQuantity = (index, change) => {
      cartStore.updateQuantity(index, change)
    }

    const handleCheckout = () => {
      const orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000)

      cartStore.checkout({
        ...checkoutData.value,
        orderNumber,
      })

      lastOrderNumber.value = orderNumber
      showModal.value = false
      showSuccessModal.value = true

      checkoutData.value = {
        namaPenerima: '',
        alamat: '',
        noHP: '',
        paymentMethod: 'QRIS',
      }
    }

    onMounted(() => {
      if (window.feather) {
        window.feather.replace()
      }
    })

    return {
      cart: cartStore.cart,
      totalPrice: cartStore.totalPrice,
      showModal,
      showSuccessModal,
      lastOrderNumber,
      checkoutData,
      getImageUrl,
      formatPrice,
      showCheckoutModal,
      closeModal,
      closeSuccessModal,
      removeItem,
      updateQuantity,
      handleCheckout,
      qrisImage
    }
  },
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 6rem auto 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: calc(100vh - 300px);
}

.cart-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #0d4d36;
  text-align: center;
  margin-bottom: 1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  background-color: #f8f8f8;
  border-radius: 1rem;
  text-align: center;
}

.empty-cart i {
  width: 48px;
  height: 48px;
  color: #ccc;
}

.empty-cart p {
  font-family: 'Inter', sans-serif;
  color: #666;
}

.btn-belanja {
  padding: 0.75rem 1.5rem;
  background-color: #0d4d36;
  color: white;
  border-radius: 2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-belanja:hover {
  background-color: #1a6b4b;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 1rem;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: white;
  padding: 0.5rem;
}

.cart-item-details {
  flex: 1;
}

.cart-item-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #333;
}

.cart-item-price {
  font-family: 'Inter', sans-serif;
  color: #666;
  margin-top: 0.25rem;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  padding: 0.5rem;
  border-radius: 2rem;
}

.cart-item-quantity button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #0d4d36;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
}

.cart-item-quantity span {
  min-width: 20px;
  text-align: center;
}

.cart-item-total {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #0d4d36;
  min-width: 100px;
  text-align: right;
}

.cart-item-remove {
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  padding: 0.5rem;
}

.cart-item-remove:hover {
  color: #cc0000;
}

.cart-summary {
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-top: 1rem;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-details h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
}

.btn-checkout {
  padding: 0.75rem;
  background-color: #0d4d36;
  color: white;
  border-radius: 2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn-checkout:hover {
  background-color: #1a6b4b;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
}

.form-group textarea {
  resize: vertical;
}

.payment-method {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.payment-option {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-option.active {
  border-color: #0d4d36;
  background-color: rgba(13, 77, 54, 0.1);
}

.summary-checkout {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.summary-checkout h4 {
  margin-bottom: 15px;
  color: #0d4d36;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  font-weight: bold;
}

.btn-confirm-payment {
  width: 100%;
  padding: 0.75rem;
  background-color: #0d4d36;
  color: white;
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-confirm-payment:hover {
  background-color: #1a6b4b;
}

.success-content {
  text-align: center;
  padding: 3rem 2rem;
}

.success-content i {
  width: 64px;
  height: 64px;
  color: #0d4d36;
  margin-bottom: 1rem;
}

.success-content h2 {
  color: #0d4d36;
  margin-bottom: 1rem;
}

.success-content p {
  margin-bottom: 1rem;
  color: #666;
}

.btn-back-home {
  padding: 0.75rem 1.5rem;
  background-color: #0d4d36;
  color: white;
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
}

.btn-back-home:hover {
  background-color: #1a6b4b;
}

.qris-container {
  margin-top: 1rem;
  text-align: center;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
}

.qris-code {
  width: 200px;
  height: 200px;
  margin: 1rem auto;
  display: block;
  border: 1px solid #ddd;
  padding: 10px;
  background: white;
}

.qris-instruction {
  font-family: 'Inter', sans-serif;
  color: #333;
  margin-bottom: 0.5rem;
}

.qris-amount {
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  color: #0d4d36;
  margin: 0.5rem 0;
}

.qris-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 1rem;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
