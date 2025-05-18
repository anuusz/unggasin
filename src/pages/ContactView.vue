<template>
  <div>
    <NavbarComponent />
    <main>
      <div class="bungkus_konten">
        <div class="penjelasan">
          <h1>Ada <em>kendala?</em> Kami Siap Melayani Anda !</h1>

          <p class="Info_kontak">
            Hubungi kami jika terdapat kendala terkait pembelian, kesalahan pembayaran, atau jika
            Anda memiliki kritik dan masukan. Kami akan melayani Anda dengan sepenuh hati pada jam
            operasional kami. Anda juga dapat meninggalkan pesan melalui WhatsApp kami.
          </p>

          <p class="Wkt_opr">Waktu operasional kami : Senin - Jum'at, 9.00 - 19.00 WIB</p>

          <button class="button open-button" @click="openModal">Hubungi kami</button>
        </div>
      </div>

      <dialog ref="modal" class="modal">
        <div class="modal_content">
          <p>Gunakan salah satu kontak di bawah ini:</p>
          <ul>
            <li>📞 089637287240 (Telepon/WA)</li>
            <li>📧 unggasin@gmail.com</li>
            <li>🗺️ Jl Ayam Kampung No 123, Jakarta</li>
          </ul>
          <button class="button close-button" @click="closeModal">Kembali</button>
        </div>
      </dialog>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import FooterComponent from '@/components/Footer.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'ContactView',
  components: {
    NavbarComponent,
    FooterComponent,
  },
  setup() {
    const modal = ref(null)

    const openModal = () => {
      modal.value.showModal()
    }

    const closeModal = () => {
      modal.value.close()
    }

    onMounted(() => {})

    return {
      modal,
      openModal,
      closeModal,
    }
  },
}
</script>

<style scoped>
/* Background dan konten utama */
.bungkus_konten {
  background-image: url('@/assets/images/ayam_background.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
}

.bungkus_konten::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Konten teks */
.Info_kontak {
  margin-top: 2%;
  max-width: 600px;
  text-align: center;
  color: white;
}

.Wkt_opr {
  margin-top: 1rem;
  text-align: center;
  color: white;
}

.penjelasan {
  position: relative;
  z-index: 2;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #ffffff;
  text-align: center;
}

.penjelasan h1 {
  font-size: 2rem;
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

/* Modal styles */
.modal {
  position: relative;
  z-index: 2;
  background-image: url('@/assets/images/image.png');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  max-width: 50ch;
  box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
  border-radius: 2rem;
  border: none;
}

.modal_content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 5px 32px 0 rgba(0, 0, 0, 0.35);
  border-radius: 2rem;
  padding: 2rem;
}

.modal_content p {
  color: #2b5832;
  font-size: 2rem;
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.modal_content ul {
  color: #2b5832;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  margin-top: 1rem;
  list-style: none;
}

.modal::backdrop {
  background: rgb(0 0 0 / 0.4);
}

/* Button styles */
.open-button {
  background: none;
  border: solid 3px white;
  cursor: pointer;
  background-color: none;
  color: white;
  font-weight: 700;
  padding: 1em 1em;
  border-radius: 2rem;
  margin-top: 2rem;
}

.open-button:hover {
  color: #2b5832;
  background-color: white;
}

.close-button {
  background: none;
  border: solid 3px #2b5832;
  cursor: pointer;
  background-color: none;
  color: #2b5832;
  font-weight: 700;
  padding: 1em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  margin: 2rem auto 0 auto;
  border-radius: 2rem;
}

.close-button:hover {
  border: solid 3px #2b5832;
  background: #2b5832;
  color: white;
}

/* Text emphasis */
h1 em {
  color: rgb(255, 236, 110);
  font-style: normal;
}
</style>
