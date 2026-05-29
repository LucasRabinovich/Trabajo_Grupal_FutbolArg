<template>
  <NavBar />
  <main class="main-content">
    <RouterView />
  </main>
</template>

<script setup>
import NavBar from './components/navBar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

body {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  margin: 0;
  background-attachment: fixed;
}

.glass-card {
  background: rgba(25, 30, 36, 0.7) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 1rem;
}

.text-neon {
  color: #00fa9a !important;
  text-shadow: 0 0 10px rgba(0, 250, 154, 0.5);
}
</style>