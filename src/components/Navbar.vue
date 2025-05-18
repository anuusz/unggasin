<template>
  <header>
    <nav class="navbar">
      <div class="navbar-left">
        <router-link to="/" class="navbar-logo">Unggasin</router-link>
      </div>
      <div class="navbar-center">
        <router-link to="/">Beranda</router-link>
        <router-link to="/kontak">Kontak</router-link>
        <router-link to="/tentang-kami">Tentang Kami</router-link>
        <router-link to="/menu">Menu</router-link>
      </div>
      <div class="navbar_icon">
        <router-link to="/cart">
          <i data-feather="shopping-cart"></i>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavbarComponent',
  mounted() {
    // Force replace icons after component mounts
    this.$nextTick(() => {
      if (this.$feather) {
        this.$feather.replace()
      }
    })
  },
}
</script>

<style scoped>
header {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d4d36;
  border-radius: 2rem;
  width: 45vw;
  height: 3rem;
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.navbar-left {
  position: absolute;
  left: 2rem;
}

.navbar-logo {
  font-size: 1.5rem;
  font-family: 'Satisfy', cursive;
  font-weight: 400;
  font-style: normal;
  color: white;
}

.navbar-center {
  display: flex;
  margin-left: 5rem;
  gap: 2rem;
}

.navbar-center a {
  color: white;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  position: relative;
}

.navbar-center a:hover {
  color: yellow;
}

.navbar-center a.router-link-exact-active {
  font-weight: bold;
  color: yellow;
}

.navbar_icon {
  display: flex;
  position: absolute;
  right: 32px;
  gap: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
}

.navbar_icon a {
  display: flex;
  width: 20px;
  height: 20px;
  color: white;
  font-size: 1.5rem;
}

.navbar_icon a:hover {
  color: yellow;
}

.navbar_icon i {
  width: 24px;
  height: 24px;
  stroke: currentColor;
}
</style>
