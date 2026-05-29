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

const zonaA = ref([])
const zonaB = ref([])
const libertadores = ref([])
const sudamericana = ref([])

const fetchPosiciones = () => {
  const baseStats = { puntos: 0, pj: 0, pg: 0, pe: 0, pp: 0, dif: 0 }
  
  zonaA.value = [
    { id: 23, nombre: 'River Plate', ...baseStats },
    { id: 16, nombre: 'Independiente', ...baseStats },
    { id: 25, nombre: 'San Lorenzo', ...baseStats },
    { id: 24, nombre: 'Rosario Central', ...baseStats },
    { id: 11, nombre: 'Estudiantes de La Plata', ...baseStats },
    { id: 27, nombre: 'Talleres (Córdoba)', ...baseStats },
    { id: 2, nombre: 'Argentinos Juniors', ...baseStats },
    { id: 4, nombre: 'Banfield', ...baseStats },
    { id: 15, nombre: 'Huracán', ...baseStats },
    { id: 18, nombre: 'Instituto', ...baseStats },
    { id: 21, nombre: 'Platense', ...baseStats },
    { id: 26, nombre: 'Sarmiento (Junín)', ...baseStats },
    { id: 3, nombre: 'Atlético Tucumán', ...baseStats },
    { id: 5, nombre: 'Barracas Central', ...baseStats },
    { id: 10, nombre: 'Deportivo Riestra', ...baseStats }
  ]

  zonaB.value = [
    { id: 7, nombre: 'Boca Juniors', ...baseStats },
    { id: 22, nombre: 'Racing Club', ...baseStats },
    { id: 6, nombre: 'Belgrano', ...baseStats },
    { id: 20, nombre: 'Newell\'s Old Boys', ...baseStats },
    { id: 9, text: 'Defensa y Justicia', nombre: 'Defensa y Justicia', ...baseStats },
    { id: 19, nombre: 'Lanús', ...baseStats },
    { id: 28, nombre: 'Tigre', ...baseStats },
    { id: 14, nombre: 'Gimnasia y Esgrima La Plata', ...baseStats },
    { id: 29, nombre: 'Unión (Santa Fe)', ...baseStats },
    { id: 30, nombre: 'Vélez Sarsfield', ...baseStats },
    { id: 8, nombre: 'Central Córdoba (Santiago del Estero)', ...baseStats },
    { id: 1, nombre: 'Aldosivi', ...baseStats },
    { id: 17, nombre: 'Independiente Rivadavia', ...baseStats },
    { id: 12, nombre: 'Estudiantes de Río Cuarto', ...baseStats },
    { id: 13, nombre: 'Gimnasia y Esgrima (Mendoza)', ...baseStats }
  ]

  libertadores.value = [
    { id: 100, nombre: 'Boca Juniors', puntos: 9, pj: 3, pg: 3, pe: 0, pp: 0, dif: 5 },
    { id: 101, nombre: 'Palmeiras', puntos: 6, pj: 3, pg: 2, pe: 0, pp: 1, dif: 2 },
    { id: 102, nombre: 'Colo Colo', puntos: 3, pj: 3, pg: 1, pe: 0, pp: 2, dif: -1 },
    { id: 103, nombre: 'Alianza Lima', puntos: 0, pj: 3, pg: 0, pe: 0, pp: 3, dif: -6 }
  ]

  sudamericana.value = [
    { id: 200, nombre: 'River Plate', puntos: 7, pj: 3, pg: 2, pe: 1, pp: 0, dif: 4 },
    { id: 201, nombre: 'LDU Quito', puntos: 5, pj: 3, pg: 1, pe: 2, pp: 0, dif: 1 },
    { id: 202, nombre: 'Peñarol', puntos: 4, pj: 3, pg: 1, pe: 1, pp: 1, dif: 0 },
    { id: 203, nombre: 'Nacional', puntos: 0, pj: 3, pg: 0, pe: 0, pp: 3, dif: -5 }
  ]
}

const obtenerEscudo = (nombre) => {
  let nombreLimpio = String(nombre).toLowerCase().replace(/ /g, '-').replace(/[()]/g, '').replace(/'/g, '')
  let urlLocal = new URL(`../assets/escudos/${nombreLimpio}.png`, import.meta.url).href
  return urlLocal
}

onMounted(() => {
  fetchPosiciones()
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