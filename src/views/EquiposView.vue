<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Equipos</h1>
      <p class="text-neon fw-semibold tracking-wide">LISTADO DE CLUBES Y FAVORITOS</p>
    </div>

    <div class="row g-4">
      <div v-for="equipo in equipos" :key="equipo.id" class="col-12 col-md-6 col-lg-4">
        <div class="glass-card h-100 team-card">
          <div class="p-4 text-center d-flex flex-column justify-content-between h-100">
            <div>
              <img :src="obtenerEscudo(equipo.nombre)" alt="Escudo" width="90" height="90" class="mb-4 rounded-circle shadow" />
              <h4 class="fw-bold text-white mb-4">{{ equipo.nombre }}</h4>
              
              <div class="p-3 glass-inner rounded-4 mb-4">
                <span class="text-light d-block mb-2 text-uppercase fw-bold" style="font-size: 0.75rem;">
                  Próximo Partido
                </span>
                <div class="d-flex flex-column align-items-center">
                  <span class="text-white fw-bold mb-2">{{ equipo.proximoRival }}</span>
                  <span class="badge bg-success bg-opacity-25 text-neon border border-success px-3 py-2 rounded-pill shadow-sm">
                    {{ equipo.fechaPartido }}
                  </span>
                </div>
              </div>
            </div>

            <button class="btn btn-outline-success rounded-pill w-100 fw-bold py-2 custom-btn" @click="seleccionarFavorito(equipo.nombre)">
              ⭐ Elegir Mi Equipo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const equipos = ref([])

const fetchEquipos = () => {
  equipos.value = [
    { id: 1, nombre: 'Aldosivi', proximoRival: 'vs Estudiantes de Río Cuarto', fechaPartido: '30 de Mayo' },
    { id: 2, nombre: 'Argentinos Juniors', proximoRival: 'vs River Plate', fechaPartido: '31 de Mayo' },
    { id: 3, nombre: 'Atlético Tucumán', proximoRival: 'vs Independiente Rivadavia', fechaPartido: '1 de Junio' },
    { id: 4, nombre: 'Banfield', proximoRival: 'vs Defensa y Justicia', fechaPartido: '31 de Mayo' },
    { id: 5, nombre: 'Barracas Central', proximoRival: 'vs Central Córdoba (SdE)', fechaPartido: '1 de Junio' },
    { id: 6, nombre: 'Belgrano', proximoRival: 'vs Rosario Central', fechaPartido: '31 de Mayo' },
    { id: 7, nombre: 'Boca Juniors', proximoRival: 'vs Talleres (Córdoba)', fechaPartido: '31 de Mayo' },
    { id: 8, nombre: 'Central Córdoba (Santiago del Estero)', proximoRival: 'vs Barracas Central', fechaPartido: '1 de Junio' },
    { id: 9, nombre: 'Defensa y Justicia', proximoRival: 'vs Banfield', fechaPartido: '31 de Mayo' },
    { id: 10, nombre: 'Deportivo Riestra', proximoRival: 'vs Gimnasia y Esgrima (Mendoza)', fechaPartido: '1 de Junio' },
    { id: 11, nombre: 'Estudiantes de La Plata', proximoRival: 'vs Unión (Santa Fe)', fechaPartido: '1 de Junio' },
    { id: 12, nombre: 'Estudiantes de Río Cuarto', proximoRival: 'vs Aldosivi', fechaPartido: '30 de Mayo' },
    { id: 13, nombre: 'Gimnasia y Esgrima (Mendoza)', proximoRival: 'vs Deportivo Riestra', fechaPartido: '1 de Junio' },
    { id: 14, nombre: 'Gimnasia y Esgrima La Plata', proximoRival: 'vs Racing Club', fechaPartido: '30 de Mayo' },
    { id: 15, nombre: 'Huracán', proximoRival: 'vs Tigre', fechaPartido: '1 de Junio' },
    { id: 16, nombre: 'Independiente', proximoRival: 'vs Vélez Sarsfield', fechaPartido: '30 de Mayo' },
    { id: 17, nombre: 'Independiente Rivadavia', proximoRival: 'vs Atlético Tucumán', fechaPartido: '1 de Junio' },
    { id: 18, nombre: 'Instituto', proximoRival: 'vs Sarmiento (Junín)', fechaPartido: '29 de Mayo' },
    { id: 19, nombre: 'Lanús', proximoRival: 'vs San Lorenzo', fechaPartido: '30 de Mayo' },
    { id: 20, nombre: "Newell's Old Boys", proximoRival: 'vs Platense', fechaPartido: '29 de Mayo' },
    { id: 21, nombre: 'Platense', proximoRival: 'vs Newell\'s Old Boys', fechaPartido: '29 de Mayo' },
    { id: 22, nombre: 'Racing Club', proximoRival: 'vs Gimnasia y Esgrima La Plata', fechaPartido: '30 de Mayo' },
    { id: 23, nombre: 'River Plate', proximoRival: 'vs Argentinos Juniors', fechaPartido: '31 de Mayo' },
    { id: 24, nombre: 'Rosario Central', proximoRival: 'vs Belgrano', fechaPartido: '31 de Mayo' },
    { id: 25, nombre: 'San Lorenzo', proximoRival: 'vs Lanús', fechaPartido: '30 de Mayo' },
    { id: 26, nombre: 'Sarmiento (Junín)', proximoRival: 'vs Instituto', fechaPartido: '29 de Mayo' },
    { id: 27, nombre: 'Talleres (Córdoba)', proximoRival: 'vs Boca Juniors', fechaPartido: '31 de Mayo' },
    { id: 28, nombre: 'Tigre', proximoRival: 'vs Huracán', fechaPartido: '1 de Junio' },
    { id: 29, nombre: 'Unión (Santa Fe)', proximoRival: 'vs Estudiantes de La Plata', fechaPartido: '1 de Junio' },
    { id: 30, nombre: 'Vélez Sarsfield', proximoRival: 'vs Independiente', fechaPartido: '30 de Mayo' }
  ]
}

const obtenerEscudo = (nombre) => {
  let nombreLimpio = String(nombre).toLowerCase().replace(/ /g, '-').replace(/[()]/g, '').replace(/'/g, '')
  let urlLocal = new URL(`../assets/escudos/${nombreLimpio}.png`, import.meta.url).href
  return urlLocal
}

const seleccionarFavorito = (nombre) => {
  localStorage.setItem('equipoFavorito', nombre)
  alert('Se seleccionó tu equipo favorito')
}

onMounted(() => {
  fetchEquipos()
})
</script>

<style scoped>
.team-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 250, 154, 0.15) !important;
  border-color: rgba(0, 250, 154, 0.3) !important;
}

.glass-inner {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.custom-btn {
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background-color: #00fa9a;
  color: #121212 !important;
  border-color: #00fa9a;
  box-shadow: 0 0 15px rgba(0, 250, 154, 0.4);
}

.tracking-wide {
  letter-spacing: 2px;
}
</style>