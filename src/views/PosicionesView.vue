<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Tabla de Posiciones</h1>
      <p class="text-neon fw-semibold tracking-wide">TORNEO CLAUSURA Y COPAS INTERNACIONALES 2026</p>
    </div>

    <div class="row g-5 mb-5">
      <div class="col-12 col-xl-6">
        <h4 class="text-neon mb-4 fw-bold text-center">LIGA PROFESIONAL - ZONA A</h4>
        <div class="glass-card table-responsive shadow">
          <table class="table table-dark table-hover mb-0 align-middle bg-transparent">
            <thead>
              <tr class="border-bottom border-secondary">
                <th scope="col" class="text-center py-3">Pos</th>
                <th scope="col" class="py-3">Equipo</th>
                <th scope="col" class="text-center py-3">Pts</th>
                <th scope="col" class="text-center py-3">PJ</th>
                <th scope="col" class="text-center py-3">PG</th>
                <th scope="col" class="text-center py-3">PE</th>
                <th scope="col" class="text-center py-3">PP</th>
                <th scope="col" class="text-center py-3">DIF</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(equipo, index) in zonaA" :key="equipo.id" class="border-bottom border-secondary border-opacity-25">
                <th scope="row" class="text-center" :class="index < 4 ? 'text-neon' : 'text-secondary'">
                  {{ index + 1 }}
                </th>
                <td class="fw-semibold">
                  <div class="d-flex align-items-center gap-3">
                    <img :src="obtenerEscudo(equipo.nombre)" alt="Escudo" width="35" height="35" class="rounded-circle shadow" />
                    <span class="text-white">{{ equipo.nombre }}</span>
                  </div>
                </td>
                <td class="text-center fw-bold text-neon">{{ equipo.puntos }}</td>
                <td class="text-center text-light">{{ equipo.pj }}</td>
                <td class="text-center text-light">{{ equipo.pg }}</td>
                <td class="text-center text-light">{{ equipo.pe }}</td>
                <td class="text-center text-light">{{ equipo.pp }}</td>
                <td class="text-center text-light">{{ equipo.dif }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-12 col-xl-6">
        <h4 class="text-neon mb-4 fw-bold text-center">LIGA PROFESIONAL - ZONA B</h4>
        <div class="glass-card table-responsive shadow">
          <table class="table table-dark table-hover mb-0 align-middle bg-transparent">
            <thead>
              <tr class="border-bottom border-secondary">
                <th scope="col" class="text-center py-3">Pos</th>
                <th scope="col" class="py-3">Equipo</th>
                <th scope="col" class="text-center py-3">Pts</th>
                <th scope="col" class="text-center py-3">PJ</th>
                <th scope="col" class="text-center py-3">PG</th>
                <th scope="col" class="text-center py-3">PE</th>
                <th scope="col" class="text-center py-3">PP</th>
                <th scope="col" class="text-center py-3">DIF</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(equipo, index) in zonaB" :key="equipo.id" class="border-bottom border-secondary border-opacity-25">
                <th scope="row" class="text-center" :class="index < 4 ? 'text-neon' : 'text-secondary'">
                  {{ index + 1 }}
                </th>
                <td class="fw-semibold">
                  <div class="d-flex align-items-center gap-3">
                    <img :src="obtenerEscudo(equipo.nombre)" alt="Escudo" width="35" height="35" class="rounded-circle shadow" />
                    <span class="text-white">{{ equipo.nombre }}</span>
                  </div>
                </td>
                <td class="text-center fw-bold text-neon">{{ equipo.puntos }}</td>
                <td class="text-center text-light">{{ equipo.pj }}</td>
                <td class="text-center text-light">{{ equipo.pg }}</td>
                <td class="text-center text-light">{{ equipo.pe }}</td>
                <td class="text-center text-light">{{ equipo.pp }}</td>
                <td class="text-center text-light">{{ equipo.dif }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row g-5">
      <div class="col-12 col-xl-6">
        <h4 class="text-warning mb-4 fw-bold text-center">COPA LIBERTADORES - GRUPO D</h4>
        <div class="glass-card table-responsive shadow">
          <table class="table table-dark table-hover mb-0 align-middle bg-transparent">
            <thead>
              <tr class="border-bottom border-secondary">
                <th scope="col" class="text-center py-3">Pos</th>
                <th scope="col">Equipo</th>
                <th scope="col" class="text-center py-3">Pts</th>
                <th scope="col" class="text-center py-3">PJ</th>
                <th scope="col" class="text-center py-3">PG</th>
                <th scope="col" class="text-center py-3">PE</th>
                <th scope="col" class="text-center py-3">PP</th>
                <th scope="col" class="text-center py-3">DIF</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(equipo, index) in libertadores" :key="equipo.id" class="border-bottom border-secondary border-opacity-25">
                <th scope="row" class="text-center" :class="index < 2 ? 'text-warning' : 'text-secondary'">
                  {{ index + 1 }}
                </th>
                <td class="fw-semibold">
                  <div class="d-flex align-items-center gap-3">
                    <img :src="obtenerEscudo(equipo.nombre)" alt="Escudo" width="35" height="35" class="rounded-circle shadow" />
                    <span class="text-white">{{ equipo.nombre }}</span>
                  </div>
                </td>
                <td class="text-center fw-bold text-warning">{{ equipo.puntos }}</td>
                <td class="text-center text-light">{{ equipo.pj }}</td>
                <td class="text-center text-light">{{ equipo.pg }}</td>
                <td class="text-center text-light">{{ equipo.pe }}</td>
                <td class="text-center text-light">{{ equipo.pp }}</td>
                <td class="text-center text-light">{{ equipo.dif }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-12 col-xl-6">
        <h4 class="text-info mb-4 fw-bold text-center">COPA SUDAMERICANA - GRUPO A</h4>
        <div class="glass-card table-responsive shadow">
          <table class="table table-dark table-hover mb-0 align-middle bg-transparent">
            <thead>
              <tr class="border-bottom border-secondary">
                <th scope="col" class="text-center py-3">Pos</th>
                <th scope="col">Equipo</th>
                <th scope="col" class="text-center py-3">Pts</th>
                <th scope="col" class="text-center py-3">PJ</th>
                <th scope="col" class="text-center py-3">PG</th>
                <th scope="col" class="text-center py-3">PE</th>
                <th scope="col" class="text-center py-3">PP</th>
                <th scope="col" class="text-center py-3">DIF</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(equipo, index) in sudamericana" :key="equipo.id" class="border-bottom border-secondary border-opacity-25">
                <th scope="row" class="text-center" :class="index === 0 ? 'text-info' : 'text-secondary'">
                  {{ index + 1 }}
                </th>
                <td class="fw-semibold">
                  <div class="d-flex align-items-center gap-3">
                    <img :src="obtenerEscudo(equipo.nombre)" alt="Escudo" width="35" height="35" class="rounded-circle shadow" />
                    <span class="text-white">{{ equipo.nombre }}</span>
                  </div>
                </td>
                <td class="text-center fw-bold text-info">{{ equipo.puntos }}</td>
                <td class="text-center text-light">{{ equipo.pj }}</td>
                <td class="text-center text-light">{{ equipo.pg }}</td>
                <td class="text-center text-light">{{ equipo.pe }}</td>
                <td class="text-center text-light">{{ equipo.pp }}</td>
                <td class="text-center text-light">{{ equipo.dif }}</td>
              </tr>
            </tbody>
          </table>
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
  obtenerZonaA,
  obtenerZonaB,
  obtenerLibertadores,
  obtenerSudamericana
} from '../services/posicionesService'

const zonaA = ref([])
const zonaB = ref([])
const libertadores = ref([])
const sudamericana = ref([])
const logosEquipos = ref({})

const cargarEscudos = async () => {
  try {
    const equiposApi = await obtenerEquiposLigaArgentina()

    logosEquipos.value = crearMapaLogos(equiposApi)
  } catch (error) {
    console.error('Error al cargar escudos de posiciones:', error)

    logosEquipos.value = {}
  }
}

const cargarPosiciones = () => {
  zonaA.value = obtenerZonaA()
  zonaB.value = obtenerZonaB()
  libertadores.value = obtenerLibertadores()
  sudamericana.value = obtenerSudamericana()
}

const cargarDatos = async () => {
  await cargarEscudos()
  cargarPosiciones()
}

const obtenerEscudo = (nombre) => {
  return obtenerEscudoDesdeMapa(logosEquipos.value, nombre)
}

onMounted(() => {
  cargarDatos()
})
</script>

<style scoped>
.table {
  background-color: transparent !important;
}

.table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

.tracking-wide {
  letter-spacing: 2px;
}
</style>