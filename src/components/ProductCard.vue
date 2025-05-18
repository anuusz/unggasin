<template>
  <div class="Menu_card">
    <img class="Gambar_konten" :src="imageSrc" :alt="product.name">
    <div class="detil">
      <h1>{{ product.name }}<em>/kg</em></h1>
    </div>
    <p>{{ formattedPrice }}</p>
    <div class="bungkus_custom">
      <div class="Kuantitas">
        <button class="Custom_kuantitas" @click="decrement">-</button>
        <p>{{ quantity }}</p>
        <button class="Custom_kuantitas" @click="increment">+</button>
      </div>
      <button class="tambah_keranjang" @click="addToCart">Tambah</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const cartStore = useCartStore()
    const quantity = ref(1)

    const imageSrc = new URL(`/src/assets/images/${props.product.image}`, import.meta.url).href

    const formattedPrice = new Intl.NumberFormat('id-ID').format(props.product.price)

    const increment = () => {
      quantity.value++
    }

    const decrement = () => {
      if (quantity.value > 1) {
        quantity.value--
      }
    }

    const addToCart = () => {
      const productToAdd = {
        ...props.product,
        quantity: quantity.value
      }

      cartStore.addItem(productToAdd)

      // Feedback visual
      alert(`${props.product.name} ditambahkan ke keranjang!`)
      quantity.value = 1
    }

    return {
      quantity,
      imageSrc,
      formattedPrice,
      increment,
      decrement,
      addToCart
    }
  }
}
</script>

<style scoped>
/* CSS dari menu.css untuk Menu_card */
.Menu_card {
  padding: 2em;
  color: #2b5832;
  background: linear-gradient(135deg, rgba(255, 255,255,0.1),rgba(255, 255, 255,0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255,0.18);
  box-shadow: 0 5px 32px 0 rgba(0, 0, 0,0.35);
  border-radius: 2rem;
  width:20rem;
  height:25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.Kuantitas {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 2rem;
  background-color: white;
  height: 3rem;
  width: 7rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}

.Kuantitas p {
  margin-top: 0.5rem;
  min-width: 20px;
  text-align: center;
  margin-top: 0;
}

.Custom_kuantitas {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b5832;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.Custom_kuantitas:hover {
  background-color: #488351;
}

.tambah_keranjang {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  background-color: #2b5832;
  color: #ffffff;
  cursor: pointer;
  width: 6rem;
  height: 3rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
}

.tambah_keranjang:active {
  transform: scale(0.95);
}

.tambah_keranjang:hover {
  background-color: #488351;
}

.bungkus_custom {
  display: flex;
  gap: 3rem;
}

.Gambar_konten {
  padding: 0.5em;
  height: 17rem;
  margin-bottom: 3rem;
  border-radius: 2rem;
}

.detil {
  display: flex;
  gap: 2rem;
  margin-top: -2.5rem;
}

.detil h1 {
  font-size: 1.5rem;
  font-family: "Inter", sans-serif;
  font-weight: 800;
  text-align: left;
}

.Menu_card p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  text-align: left;
}

.detil em {
  font-size: 0.7rem;
  font-family: "Inter", sans-serif;
  font-weight: 600;
}
</style>
