<template>
  <footer class="footer">
    <div class="footer-brand">
      <h2>Unggasin</h2>
      <p>Copyright 2025</p>
    </div>

    <div class="footer-contact">
      <p><strong>Contact</strong><br>089637287240</p>
      <p><strong>Email</strong><br>sales@unggasin.com</p>
    </div>

    <div class="footer-address">
      <p><strong>Alamat</strong><br>Jl Lorem Ipsum No 123</p>
      <p><strong>Ikuti Kami</strong></p>
      <a href="http://instagram.com">@Unggasin_Aja</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #104e3b;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.footer-brand {
  margin-left: 10rem;
}

.footer-brand h2 {
  font-size: 3rem;
  font-family: "Satisfy", cursive;
  font-weight: 200;
}

.footer-brand p {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 1rem;
}

.footer-contact, .footer-address {
  text-align: right;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  text-align: left;
}

.footer-contact p, .footer-address p, .footer-address a {
  margin: 5px 0;
  color: #ffffff;
}
</style>
