<template>
  <div>
    <NavbarComponent />
    <main>
      <section class="Menu_unggasin">
        <div class="Menu_desc">
          <h1>Selamat Datang Di Kios Kami!</h1>
          <P>Kami menyediakan berbagai pilihan produk unggas segar seperti ayam broiler, ayam kampung, bebek utuh, serta bagian potongan seperti dada, paha, dan sayap. Kami juga menawarkan telur unggas segar untuk kebutuhan dapur Anda. Semua produk kami dijamin segar, berkualitas, dan siap untuk diolah menjadi hidangan lezat bagi keluarga Anda.</P>
        </div>

        <div class="Konten_menu">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import FooterComponent from '@/components/Footer.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'MenuView',
  components: {
    NavbarComponent,
    FooterComponent,
    ProductCard
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Ayam Boiler', price: 38000, image: 'dagingAyam.png' },
        { id: 2, name: 'Bebek Utuh', price: 62000, image: 'Daging-bebek.png' },
        { id: 3, name: 'Paha Ayam', price: 35000, image: 'paha.png' },
        { id: 4, name: 'Dada Ayam', price: 25000, image: 'Dada-ayam.png' },
        { id: 5, name: 'Ayam Kampung', price: 65000, image: 'dagingAyam.png' },
        { id: 6, name: 'Telur Ayam', price: 27000, image: 'Telur-ayam.png' },
        { id: 7, name: 'Telur Bebek', price: 36000, image: 'telor-bebek.png' },
        { id: 8, name: 'Telur Ayam K', price: 45000, image: 'Telor-ayamKampung.png' }
      ]
    }
  }
}
</script>

<style scoped>
.Menu_unggasin {
  background-image: url('@/assets/images/WallpaperKrem.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
  text-align: center;
}

.Menu_desc {
  max-width: 800px;
  color: #2b5832;
}

.Menu_desc h1 {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.Menu_desc p {
  font-size: 1rem;
  line-height: 1.6;
  font-family: "Inter", sans-serif;
  font-weight: 400;
}

.Konten_menu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  justify-content: space-between;
  padding: 0 2rem;
  margin-top: 5rem;
  width: 90%;
  max-width: 1400px;
}

@media (max-width: 1024px) {
  .Konten_menu {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .Konten_menu {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .Konten_menu {
    grid-template-columns: 1fr;
  }
}
</style>
