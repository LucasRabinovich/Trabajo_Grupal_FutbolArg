<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top glass-navbar py-3" v-if="usuarioActual">
    <div class="container">
      <a class="navbar-brand text-neon text-uppercase tracking-wide" href="#">
        <span class="fs-4 fw-bold">📊 DataGol</span>
      </a>
      
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto fw-semibold gap-3 align-items-center">
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/">Partidos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/equipos">Equipos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/posiciones">Posiciones</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/estadisticas">Estadísticas</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-link" active-class="active-link" to="/mi-equipo">Mi Equipo</RouterLink>
          </li>
          
          <li class="nav-item ms-lg-3 d-flex align-items-center gap-3 border-start border-secondary ps-lg-3">
            <div class="text-end d-none d-lg-block">
              <span class="d-block text-white text-capitalize" style="font-size: 0.85rem;">{{ usuarioActual.username }}</span>
              <span class="badge" :class="usuarioActual.rol === 'admin' ? 'bg-danger' : 'bg-secondary'" style="font-size: 0.7rem;">
                {{ usuarioActual.rol === 'admin' ? 'Admin' : 'Usuario' }}
              </span>
            </div>
            <button @click="logout" class="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Salir</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const usuarioActual = ref(null)

const checkAuth = () => {
  let estadoLogueado = null
  const userStr = localStorage.getItem('usuarioLogueado')
  
  if (userStr !== null) {
    estadoLogueado = JSON.parse(userStr)
  }
  
  usuarioActual.value = estadoLogueado
}

watch(() => route.path, () => {
  checkAuth()
}, { immediate: true })

const logout = () => {
  localStorage.removeItem('usuarioLogueado')
  usuarioActual.value = null
  router.push('/login')
}
</script>

<style scoped>
.glass-navbar {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tracking-wide {
  letter-spacing: 1.5px;
}

.text-neon {
  text-shadow: 0 0 10px rgba(0, 250, 154, 0.6);
  color: #ffffff;
}

.custom-link {
  color: #a0aec0 !important;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem !important;
}

.custom-link:hover {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.active-link {
  color: #00fa9a !important;
  background: rgba(0, 250, 154, 0.1);
  box-shadow: inset 0 -2px 0 #00fa9a;
}
</style>