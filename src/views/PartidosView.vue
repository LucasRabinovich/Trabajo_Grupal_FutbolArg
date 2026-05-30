<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Próximos Partidos</h1>
      <p class="text-neon fw-semibold tracking-wide">TORNEO CLAUSURA 2026 - FECHA 1</p>
    </div>

    <div class="row justify-content-center g-4">
      <div v-for="partido in partidos" :key="partido.id" class="col-12 col-md-10 col-lg-8">
        <div class="glass-card scoreboard-card">
          <div class="p-4">
            <div class="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
              <span class="badge bg-success bg-opacity-25 text-neon px-3 py-2 rounded-pill fw-semibold border border-success">
                Liga Profesional
              </span>
              <span class="text-light fw-semibold">
                {{ partido.fecha }} - {{ partido.hora }}
              </span>
            </div>
            
            <div class="d-flex justify-content-between align-items-center text-center">
              <div class="d-flex align-items-center justify-content-end flex-grow-1 w-25 gap-3">
                <h4 class="mb-0 fw-bold text-white text-end d-none d-sm-block">{{ partido.local }}</h4>
                <img :src="obtenerEscudo(partido.local)" alt="Escudo" width="60" height="60" class="rounded-circle shadow" />
              </div>
              <div class="px-3 px-sm-4">
                <div class="vs-badge text-neon d-flex align-items-center justify-content-center fw-bold fs-4">
                  VS
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-start flex-grow-1 w-25 gap-3">
                <img :src="obtenerEscudo(partido.visitante)" alt="Escudo" width="60" height="60" class="rounded-circle shadow" />
                <h4 class="mb-0 fw-bold text-white text-start d-none d-sm-block">{{ partido.visitante }}</h4>
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
import { obtenerPartidos } from '../services/partidosService'
import { obtenerEquiposLigaArgentina } from '../services/footballApi'
import {
  crearMapaLogos,
  obtenerEscudoDesdeMapa
} from '../services/escudosService'

const partidos = ref([])
const logosEquipos = ref({})

const cargarEscudos = async () => {
  try {
    const equiposApi = await obtenerEquiposLigaArgentina()

    logosEquipos.value = crearMapaLogos(equiposApi)
  } catch (error) {
    console.error('Error al cargar escudos de partidos:', error)

    logosEquipos.value = {}
  }
}

const cargarPartidos = () => {
  partidos.value = obtenerPartidos()
}

const cargarDatos = async () => {
  cargarPartidos()
  await cargarEscudos()
}

const obtenerEscudo = (nombre) => {
  return obtenerEscudoDesdeMapa(logosEquipos.value, nombre)
}

onMounted(() => {
  cargarDatos()
})
</script>

<style scoped>
.scoreboard-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.scoreboard-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 250, 154, 0.15) !important;
  border-color: rgba(0, 250, 154, 0.3) !important;
}

.tracking-wide {
  letter-spacing: 2px;
}
</style>