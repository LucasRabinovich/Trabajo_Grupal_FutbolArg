<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Dashboard Admin</h1>
      <p class="text-neon fw-semibold tracking-wide">REPORTES Y ESTADÍSTICAS DEL SISTEMA</p>
    </div>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-neon" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="error" class="glass-card p-5 text-center shadow">
      <p class="text-secondary fs-5 mb-3">{{ error }}</p>
    </div>

    <template v-else>
      <div class="row g-4 mb-5">
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="glass-card p-4 text-center shadow h-100">
            <h6 class="text-secondary text-uppercase fw-semibold tracking-wide mb-2">Total Jugadores</h6>
            <h2 class="text-neon fw-bold mb-0">{{ totalJugadores }}</h2>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="glass-card p-4 text-center shadow h-100">
            <h6 class="text-secondary text-uppercase fw-semibold tracking-wide mb-2">Equipos</h6>
            <h2 class="text-info fw-bold mb-0">{{ totalEquipos }}</h2>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="glass-card p-4 text-center shadow h-100">
            <h6 class="text-secondary text-uppercase fw-semibold tracking-wide mb-2">Total Goles</h6>
            <h2 class="text-warning fw-bold mb-0">{{ totalGoles }}</h2>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="glass-card p-4 text-center shadow h-100">
            <h6 class="text-secondary text-uppercase fw-semibold tracking-wide mb-2">Prom. Goles x Partido</h6>
            <h2 class="text-white fw-bold mb-0">{{ promedioGolesPartido }}</h2>
          </div>
        </div>
      </div>

      <div class="row g-4 mb-5">
        <div class="col-12 col-lg-6">
          <div class="glass-card p-4 shadow h-100">
            <h5 class="text-neon fw-bold mb-4 text-center">Jugadores por Posición</h5>
            <div v-for="item in porPosicion" :key="item.posicion" class="mb-3">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-white fw-semibold">{{ item.posicion }}</span>
                <span class="text-neon fw-bold">{{ item.cantidad }}</span>
              </div>
              <div class="progress" style="height: 8px; background: rgba(255,255,255,0.1);">
                <div
                  class="progress-bar"
                  :class="item.color"
                  role="progressbar"
                  :style="{ width: (item.porcentaje || 0) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="glass-card p-4 shadow h-100">
            <h5 class="text-info fw-bold mb-4 text-center">Jugadores por Equipo</h5>
            <div v-for="item in porEquipo" :key="item.equipo" class="mb-3">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-white fw-semibold">{{ item.equipo }}</span>
                <span class="text-info fw-bold">{{ item.cantidad }}</span>
              </div>
              <div class="progress" style="height: 8px; background: rgba(255,255,255,0.1);">
                <div
                  class="progress-bar bg-info"
                  role="progressbar"
                  :style="{ width: (item.porcentaje || 0) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card p-4 shadow mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="text-warning fw-bold mb-0">Top Goleadores</h5>
        </div>
        <div class="table-responsive">
          <table class="table table-dark table-hover mb-0 align-middle bg-transparent">
            <thead>
              <tr class="border-bottom border-secondary">
                <th class="py-3">#</th>
                <th class="py-3">Jugador</th>
                <th class="py-3">Equipo</th>
                <th class="py-3 text-center">Posición</th>
                <th class="py-3 text-center">Goles</th>
                <th class="py-3 text-center">Partidos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(jugador, index) in topGoleadores" :key="jugador.id" class="border-bottom border-secondary border-opacity-25">
                <td class="fw-bold" :class="index === 0 ? 'text-neon' : 'text-secondary'">{{ index + 1 }}</td>
                <td class="fw-semibold text-white">{{ jugador.nombre }}</td>
                <td>{{ jugador.equipo }}</td>
                <td class="text-center">{{ jugador.posicion }}</td>
                <td class="text-center text-neon fw-bold">{{ jugador.goles }}</td>
                <td class="text-center">{{ jugador.partidos || 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="glass-card p-4 shadow">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="text-neon fw-bold mb-0">Análisis con IA</h5>
          <button
            class="btn btn-outline-warning rounded-pill px-4 fw-bold"
            @click="generarIA"
            :disabled="analizando"
          >
            {{ analizando ? 'Analizando...' : 'Generar Análisis' }}
          </button>
        </div>

        <div v-if="analizando" class="text-center py-4">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Analizando...</span>
          </div>
          <p class="text-secondary mt-3">Procesando datos con IA...</p>
        </div>

        <div v-else-if="analisisIA" class="row g-4">
          <div class="col-12 col-md-4">
            <div class="glass-inner rounded-4 p-3 text-center h-100">
              <small class="text-secondary text-uppercase fw-semibold">Mejor Jugador</small>
              <h6 class="text-neon fw-bold mt-2 mb-0">{{ analisisIA.mejorJugador }}</h6>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="glass-inner rounded-4 p-3 text-center h-100">
              <small class="text-secondary text-uppercase fw-semibold">Equipo Destacado</small>
              <h6 class="text-info fw-bold mt-2 mb-0">{{ analisisIA.equipoDestacado }}</h6>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="glass-inner rounded-4 p-3 text-center h-100">
              <small class="text-secondary text-uppercase fw-semibold">Recomendación Táctica</small>
              <p class="text-white mt-2 mb-0" style="font-size: 0.85rem;">{{ analisisIA.recomendacionTactica }}</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-4">
          <p class="text-secondary mb-0">Presioná "Generar Análisis" para obtener insights con IA sobre los datos registrados.</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { obtenerJugadores } from '../services/jugadoresService'
import { generarAnalisisJugadores } from '../services/iaService'

const jugadores = ref([])
const cargando = ref(true)
const error = ref('')
const analizando = ref(false)
const analisisIA = ref(null)

const totalJugadores = computed(() => jugadores.value.length)

const totalEquipos = computed(() => {
  const equipos = new Set(jugadores.value.map(j => j.equipo))
  return equipos.size
})

const totalGoles = computed(() => {
  return jugadores.value.reduce((sum, j) => sum + (j.goles || 0), 0)
})

const promedioGolesPartido = computed(() => {
  const totalPartidos = jugadores.value.reduce((sum, j) => sum + (j.partidos || 0), 0)
  if (totalPartidos === 0) return '0.00'
  return (totalGoles.value / totalPartidos).toFixed(2)
})

const porPosicion = computed(() => {
  const conteo = { Delantero: 0, Mediocampista: 0, Defensor: 0, Arquero: 0 }
  jugadores.value.forEach(j => {
    if (conteo[j.posicion] !== undefined) {
      conteo[j.posicion]++
    }
  })
  const max = Math.max(...Object.values(conteo), 1)
  const colores = {
    Delantero: 'bg-success',
    Mediocampista: 'bg-info',
    Defensor: 'bg-warning',
    Arquero: 'bg-danger'
  }
  return Object.entries(conteo).map(([posicion, cantidad]) => ({
    posicion,
    cantidad,
    color: colores[posicion] || 'bg-secondary',
    porcentaje: (cantidad / max) * 100
  }))
})

const porEquipo = computed(() => {
  const conteo = {}
  jugadores.value.forEach(j => {
    conteo[j.equipo] = (conteo[j.equipo] || 0) + 1
  })
  const max = Math.max(...Object.values(conteo), 1)
  return Object.entries(conteo)
    .map(([equipo, cantidad]) => ({ equipo, cantidad, porcentaje: (cantidad / max) * 100 }))
    .sort((a, b) => b.cantidad - a.cantidad)
})

const topGoleadores = computed(() => {
  return [...jugadores.value]
    .sort((a, b) => (b.goles || 0) - (a.goles || 0))
    .slice(0, 5)
})

const generarIA = async () => {
  analizando.value = true
  analisisIA.value = null
  try {
    analisisIA.value = await generarAnalisisJugadores(jugadores.value)
  } catch (e) {
    console.error(e)
  } finally {
    analizando.value = false
  }
}

onMounted(async () => {
  cargando.value = true
  try {
    jugadores.value = await obtenerJugadores()
  } catch (e) {
    error.value = 'No se pudieron cargar los datos. Verificá mockapi.io en .env'
    console.error(e)
  } finally {
    cargando.value = false
  }
})
</script>

<style scoped>
.glass-inner {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tracking-wide {
  letter-spacing: 2px;
}

.progress-bar {
  transition: width 0.6s ease;
  border-radius: 4px;
}

.table {
  background-color: transparent !important;
}

.table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
