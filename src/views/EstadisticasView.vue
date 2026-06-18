<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Estadísticas Individuales</h1>
      <p class="text-secondary mb-3">Rendimiento de jugadores en el Torneo Apertura</p>
      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <small class="badge bg-success bg-opacity-25 text-neon border border-success rounded-pill px-3 py-2 fw-semibold">
          Última actualización: 26 de Mayo de 2026
        </small>
        <RouterLink v-if="esAdmin" to="/admin/dashboard" class="badge bg-danger bg-opacity-25 text-danger border border-danger rounded-pill px-3 py-2 fw-semibold text-decoration-none">
          📊 Ir al Dashboard Admin
        </RouterLink>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-4">
        <h4 class="text-neon mb-4 fw-bold text-center">⚽ Goleadores</h4>
        <div class="glass-card shadow">
          <ul class="list-group list-group-flush rounded-4">
            <li v-for="(stat, index) in goleadores" :key="stat.id" class="list-group-item bg-transparent text-white border-secondary border-opacity-25 d-flex align-items-center justify-content-between p-3">
              <div class="d-flex align-items-center gap-3">
                <span class="fw-bold" :class="index === 0 ? 'text-neon' : 'text-secondary'">{{ index + 1 }}</span>
                <img :src="obtenerEscudo(stat.equipo)" alt="Escudo" width="40" height="40" class="rounded-circle shadow" />
                <div>
                  <h6 class="mb-0 fw-bold text-white">{{ stat.jugador }}</h6>
                  <small class="text-secondary" style="font-size: 0.75rem;">{{ stat.equipo }}</small>
                </div>
              </div>
              <span class="badge bg-success bg-opacity-25 text-neon border border-success rounded-pill px-3 py-2 fs-6 fw-bold">{{ stat.cantidad }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <h4 class="text-info mb-4 fw-bold text-center">👟 Asistidores</h4>
        <div class="glass-card shadow">
          <ul class="list-group list-group-flush rounded-4">
            <li v-for="(stat, index) in asistidores" :key="stat.id" class="list-group-item bg-transparent text-white border-secondary border-opacity-25 d-flex align-items-center justify-content-between p-3">
              <div class="d-flex align-items-center gap-3">
                <span class="fw-bold" :class="index === 0 ? 'text-info' : 'text-secondary'">{{ index + 1 }}</span>
                <img :src="obtenerEscudo(stat.equipo)" alt="Escudo" width="40" height="40" class="rounded-circle shadow" />
                <div>
                  <h6 class="mb-0 fw-bold text-white">{{ stat.jugador }}</h6>
                  <small class="text-secondary" style="font-size: 0.75rem;">{{ stat.equipo }}</small>
                </div>
              </div>
              <span class="badge bg-info bg-opacity-25 text-info border border-info rounded-pill px-3 py-2 fs-6 fw-bold">{{ stat.cantidad }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <h4 class="text-warning mb-4 fw-bold text-center">🧤 Vallas Invictas</h4>
        <div class="glass-card shadow">
          <ul class="list-group list-group-flush rounded-4">
            <li v-for="(stat, index) in vallas" :key="stat.id" class="list-group-item bg-transparent text-white border-secondary border-opacity-25 d-flex align-items-center justify-content-between p-3">
              <div class="d-flex align-items-center gap-3">
                <span class="fw-bold" :class="index === 0 ? 'text-warning' : 'text-secondary'">{{ index + 1 }}</span>
                <img :src="obtenerEscudo(stat.equipo)" alt="Escudo" width="40" height="40" class="rounded-circle shadow" />
                <div>
                  <h6 class="mb-0 fw-bold text-white">{{ stat.jugador }}</h6>
                  <small class="text-secondary" style="font-size: 0.75rem;">{{ stat.equipo }}</small>
                </div>
              </div>
              <span class="badge bg-warning bg-opacity-25 text-warning border border-warning rounded-pill px-3 py-2 fs-6 fw-bold">{{ stat.cantidad }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerEquiposLigaArgentina } from '../services/footballApi'
import {
  crearMapaLogos,
  obtenerEscudoDesdeMapa
} from '../services/escudosService'
import {
  obtenerGoleadores,
  obtenerAsistidores,
  obtenerVallas
} from '../services/estadisticasService'

const goleadores = ref([])
const asistidores = ref([])
const vallas = ref([])
const logosEquipos = ref({})
const esAdmin = ref(false)

const cargarEstadisticas = () => {
  goleadores.value = obtenerGoleadores()
  asistidores.value = obtenerAsistidores()
  vallas.value = obtenerVallas()
}

const cargarEscudos = async () => {
  try {
    const equiposApi = await obtenerEquiposLigaArgentina()

    logosEquipos.value = crearMapaLogos(equiposApi)
  } catch (error) {
    console.error('Error al cargar escudos de estadísticas:', error)

    logosEquipos.value = {}
  }
}

const obtenerEscudo = (nombre) => {
  return obtenerEscudoDesdeMapa(logosEquipos.value, nombre)
}

const checkRol = () => {
  const userStr = localStorage.getItem('usuarioLogueado')
  if (userStr) {
    const user = JSON.parse(userStr)
    esAdmin.value = user.rol === 'admin'
  }
}

const cargarDatos = async () => {
  checkRol()
  cargarEstadisticas()
  await cargarEscudos()
}

onMounted(() => {
  cargarDatos()
})
</script>

<style scoped>
.list-group-item {
  transition: background-color 0.2s ease;
}

.list-group-item:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>