<template>
  <div class="container py-5 text-center">
    <div class="glass-card p-5 shadow mx-auto" style="max-width: 650px;">
      <div class="mb-4" style="font-size: 5rem;">⚽</div>

      <h1 class="display-3 fw-bold text-white mb-3">404</h1>
      <h2 class="fw-bold text-neon mb-3">Página no encontrada</h2>

      <p class="text-secondary mb-4">
        La ruta que intentaste visitar no existe o fue movida.
      </p>

      <router-link to="/" class="btn btn-outline-success rounded-pill px-4 fw-bold">
        Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.text-neon {
  color: #00fa9a;
  text-shadow: 0 0 15px rgba(0, 250, 154, 0.5);
}
</style>