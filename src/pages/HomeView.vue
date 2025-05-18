<template>
  <div>
    <NavbarComponent />
    <main>
      <section class="hero">
        <div class="Card_tambahan"></div>
        <div class="konten">
          <h1>Pesan <br />Unggas<br />Segar,</h1>
          <p>Antar ke Dapurmu!</p>
          <router-link to="/menu" class="cta_hero">Belanja Sekarang</router-link>
        </div>
        <img src="@/assets/images/ayam-port.png" alt="gambar ayam Unggasin" class="ayam_img" />
      </section>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import FooterComponent from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    NavbarComponent,
    FooterComponent,
  },
}
</script>

<style scoped>
.hero {
  background: url('@/assets/images/image.png');
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.Card_tambahan {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  height: 80%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 5px 32px 0 rgba(0, 0, 0, 0.35);
  border-radius: 2rem;
  z-index: 1;
}

.konten {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
  margin-top: 2rem;
  margin-left: -40rem;
}

.konten h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 5rem;
  font-weight: 800;
  line-height: 100%;
  color: #488351;
  margin-bottom: 1rem;
}

.konten p {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #488351;
  margin-bottom: 1rem;
}

.cta_hero {
  background-color: #2b5832;
  color: white;
  border-radius: 2rem;
  height: 4rem;
  width: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s ease;
}

.cta_hero:hover {
  background-color: #488351;
}

.ayam_img {
  position: absolute;
  right: 5%;
  bottom: 0;
  height: 40rem;
  z-index: 5;
}
</style>
