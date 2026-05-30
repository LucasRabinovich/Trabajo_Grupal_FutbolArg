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
              <img
                :src="obtenerEscudo(equipo)"
                alt="Escudo"
                width="90"
                height="90"
                class="mb-4 rounded-circle shadow"
              />

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

            <button
              class="btn btn-outline-success rounded-pill w-100 fw-bold py-2 custom-btn"
              @click="seleccionarFavorito(equipo.nombre)"
            >
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
import { obtenerEquiposLigaArgentina } from '../services/footballApi'
import { obtenerEquipos } from '../services/equiposService'
import {
  crearMapaLogos,
  obtenerLogoEquipo,
  obtenerEscudoDefault
} from '../services/escudosService'

const equipos = ref([])
const equiposLocales = obtenerEquipos()

const combinarEquiposConLogos = (logos) => {
  return equiposLocales.map((equipo) => ({
    ...equipo,
    logo: obtenerLogoEquipo(logos, equipo.nombre)
  }))
}

const cargarEquipos = async () => {
  try {
    const equiposApi = await obtenerEquiposLigaArgentina()
    const logos = crearMapaLogos(equiposApi)

    equipos.value = combinarEquiposConLogos(logos)
  } catch (error) {
    console.error('Error al cargar equipos:', error)

    equipos.value = equiposLocales.map((equipo) => ({
      ...equipo,
      logo: null
    }))
  }
}

const obtenerEscudo = (equipo) => {
  return equipo.logo || obtenerEscudoDefault()
}

const seleccionarFavorito = (nombre) => {
  localStorage.setItem('equipoFavorito', nombre)
  alert('Se seleccionó tu equipo favorito')
}

onMounted(() => {
  cargarEquipos()
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