<template>
  <div class="about-page">
    <NavbarComponent />
    <main>
      <section class="about-hero">
        <div class="container">
          <h1 class="brand-title">Unggasin</h1>

          <div class="about-content">
            <div class="about-section">
              <h2>Tentang Kami</h2>
              <p>
                Kami adalah sebuah tim yang berdedikasi untuk memberikan layanan terbaik dengan
                mengutamakan kualitas, kenyamanan, dan kepercayaan pelanggan. Setiap produk dan
                layanan kami hadir melalui proses yang terencana dan penuh ketelitian, demi
                memastikan kepuasan pelanggan di setiap momen.
              </p>
            </div>

            <div class="about-section">
              <h2>Visi</h2>
              <p>
                Menjadi pilihan utama masyarakat dalam menyediakan solusi terbaik dan terpercaya di
                bidang kami. Kami berkomitmen untuk terus berinovasi, berkembang, dan memberikan
                manfaat nyata bagi pelanggan serta lingkungan sekitar.
              </p>
            </div>
          </div>

          <section class="why-choose-us">
            <h2>Kenapa Memilih Kami?</h2>
            <div class="benefits-grid">
              <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
                <img :src="getImageUrl(benefit.image)" :alt="benefit.title" />
                <p>{{ benefit.description }}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import FooterComponent from '@/components/Footer.vue'

export default {
  name: 'AboutView',
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      benefits: [
        {
          image: 'LOGO-PREMIUM-2.png',
          title: 'Ayam Segar',
          description: 'Ayam segar kualitas terbaik langsung dari peternak lokal.',
        },
        {
          image: 'no_BGoganic.png',
          title: 'Ayam Organik',
          description: 'Tanpa bahan pengawet dan bebas antibiotik.',
        },
        {
          image: 'Halal.png',
          title: 'Halal',
          description: 'Diproses dan dipotong secara halal sesuai syariat',
        },
      ],
    }
  },
  methods: {
    getImageUrl(imageName) {
      return new URL(`/src/assets/images/${imageName}`, import.meta.url).href
    },
  },
}
</script>

<style scoped>
.about-hero {
  background-size: cover;
  background-position: center;
  position: relative;
}

.about-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(72, 131, 81, 0.8);
  z-index: 0;
}

.about-hero .container {
  position: relative;
  z-index: 1;
}

.brand-title {
  padding-top: 1em;
  font-family: 'Satisfy', cursive;
  font-weight: 400;
  font-size: 5rem;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
}

.about-content {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  justify-content: center;
}

.about-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 5px 32px 0 rgba(0, 0, 0, 0.35);
  border-radius: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  color: white;
}

.about-section h2 {
  font-family: 'Satisfy', cursive;
  font-weight: 400;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
}

.about-section p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

.why-choose-us {
  /* background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)); */
  backdrop-filter: blur(10px);
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  /* box-shadow: 0 5px 32px 0 rgba(0, 0, 0, 0.35); */
  border-radius: 2rem;
  padding: 2rem;
  margin-top: 2rem;
}

.why-choose-us h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.benefit-card {
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
  width: 100%;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.benefit-card img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 50%;
}

.benefit-card p {
  font-family: 'Inter', sans-serif;
  color: #333;
  font-size: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .brand-title {
    font-size: 3.5rem;
  }

  .about-content {
    flex-direction: column;
    align-items: center;
  }

  .about-section {
    max-width: 100%;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
