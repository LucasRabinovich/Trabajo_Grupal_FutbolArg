<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Estadísticas Individuales</h1>
      <p class="text-secondary mb-3">Rendimiento de jugadores en el Torneo Apertura</p>
      <small class="badge bg-success bg-opacity-25 text-neon border border-success rounded-pill px-3 py-2 fw-semibold">
        Última actualización: 26 de Mayo de 2026
      </small>
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

const goleadores = ref([])
const asistidores = ref([])
const vallas = ref([])

const fetchEstadisticas = () => {
  goleadores.value = [
    { id: 1, jugador: 'Gabriel Ávalos', equipo: 'Independiente', cantidad: 10 },
    { id: 2, jugador: 'Jordy Caicedo', equipo: 'Huracán', cantidad: 8 },
    { id: 3, jugador: 'Cristian Tarragona', equipo: 'Unión (Santa Fe)', cantidad: 8 },
    { id: 4, jugador: 'Fabrizio Sartori', equipo: 'Independiente Rivadavia', cantidad: 7 },
    { id: 5, jugador: 'David Romero', equipo: 'Tigre', cantidad: 7 }
  ]

  asistidores.value = [
    { id: 1, jugador: 'Sebastián Villa', equipo: 'Independiente Rivadavia', cantidad: 6 },
    { id: 2, jugador: 'Tiago Palacios', equipo: 'Unión (Santa Fe)', cantidad: 6 },
    { id: 3, jugador: 'Diego Valdés', equipo: 'Vélez Sarsfield', cantidad: 5 },
    { id: 4, jugador: 'Lucas Passerini', equipo: 'Belgrano', cantidad: 5 },
    { id: 5, jugador: 'Facundo Lencioni', equipo: 'Gimnasia y Esgrima (Mendoza)', cantidad: 5 }
  ]

  vallas.value = [
    { id: 1, jugador: 'Fernando Muslera', equipo: 'Estudiantes de La Plata', cantidad: 10 },
    { id: 2, jugador: 'Santiago Beltrán', equipo: 'River Plate', cantidad: 8 },
    { id: 3, jugador: 'Agustín Marchesín', equipo: 'Boca Juniors', cantidad: 8 },
    { id: 4, jugador: 'Javier Burrai', equipo: 'Sarmiento (Junín)', cantidad: 7 },
    { id: 5, jugador: 'Facundo Sanguinetti', equipo: 'Banfield', cantidad: 6 }
  ]
}

const obtenerEscudo = (nombre) => {
  let nombreLimpio = String(nombre).toLowerCase().replace(/ /g, '-').replace(/[()]/g, '').replace(/'/g, '')
  let urlLocal = new URL(`../assets/escudos/${nombreLimpio}.png`, import.meta.url).href
  return urlLocal
}

onMounted(() => {
  fetchEstadisticas()
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