<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Jugadores</h1>
      <p class="text-neon fw-semibold tracking-wide">PLANTEL DE LA LIGA PROFESIONAL</p>
    </div>

    <div v-if="esAdmin" class="text-end mb-4">
      <RouterLink to="/admin/jugadores" class="btn btn-outline-success rounded-pill px-4 fw-bold py-2">
        ⚙️ Gestionar Jugadores
      </RouterLink>
    </div>

    <div v-if="jugadores.length === 0" class="glass-card p-5 text-center shadow">
      <p class="text-secondary fs-5 mb-0">No hay jugadores registrados aún.</p>
    </div>

    <div v-else class="row g-4">
      <div v-for="jugador in jugadores" :key="jugador.id" class="col-12 col-md-6 col-lg-4">
        <div class="glass-card h-100 player-card">
          <div class="p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h4 class="fw-bold text-white mb-1">{{ jugador.nombre }}</h4>
                <span class="badge bg-success bg-opacity-25 text-neon border border-success rounded-pill px-3 py-1 fw-semibold">
                  #{{ jugador.numero || '-' }}
                </span>
              </div>
              <div class="text-end">
                <span class="badge bg-primary bg-opacity-25 text-info border border-info rounded-pill px-3 py-1 fs-6">
                  {{ jugador.posicion }}
                </span>
              </div>
            </div>

            <div class="glass-inner rounded-4 p-3 mb-3">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-secondary" style="font-size: 0.85rem;">Equipo</span>
                <span class="text-white fw-semibold">{{ jugador.equipo }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-secondary" style="font-size: 0.85rem;">Edad</span>
                <span class="text-white fw-semibold">{{ jugador.edad || '-' }} años</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-secondary" style="font-size: 0.85rem;">Nacionalidad</span>
                <span class="text-white fw-semibold">{{ jugador.nacionalidad || 'Argentina' }}</span>
              </div>
            </div>

            <div class="d-flex justify-content-around text-center">
              <div>
                <h5 class="text-neon fw-bold mb-0">{{ jugador.goles || 0 }}</h5>
                <small class="text-secondary">Goles</small>
              </div>
              <div>
                <h5 class="text-info fw-bold mb-0">{{ jugador.asistencias || 0 }}</h5>
                <small class="text-secondary">Asist.</small>
              </div>
              <div>
                <h5 class="text-white fw-bold mb-0">{{ jugador.partidos || 0 }}</h5>
                <small class="text-secondary">Part.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerJugadores } from '../services/jugadoresService'

const jugadores = ref([])
const cargando = ref(true)
const error = ref('')
const esAdmin = ref(false)

const cargarJugadores = async () => {
  cargando.value = true
  error.value = ''
  try {
    jugadores.value = await obtenerJugadores()
  } catch (e) {
    error.value = 'No se pudieron cargar los jugadores. Verificá la configuración de mockapi.io en el archivo .env'
    console.error(e)
  } finally {
    cargando.value = false
  }
}

const checkRol = () => {
  const userStr = localStorage.getItem('usuarioLogueado')
  if (userStr) {
    const user = JSON.parse(userStr)
    esAdmin.value = user.rol === 'admin'
  }
}

onMounted(() => {
  checkRol()
  cargarJugadores()
})
</script>

<style scoped>
.player-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.player-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 250, 154, 0.15) !important;
  border-color: rgba(0, 250, 154, 0.3) !important;
}

.glass-inner {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tracking-wide {
  letter-spacing: 2px;
}
</style>
