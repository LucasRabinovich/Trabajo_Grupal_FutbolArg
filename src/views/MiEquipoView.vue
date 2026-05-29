<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Mi Equipo</h1>
      <p class="text-neon fw-semibold tracking-wide" v-if="favorito">SEGUIMIENTO PERSONALIZADO PARA {{ favorito.toUpperCase() }}</p>
      <p class="text-secondary" v-else>Aún no seleccionaste tu equipo favorito</p>
    </div>

    <div v-if="!favorito" class="text-center py-5">
      <div class="glass-card p-5 d-inline-block shadow">
        <h5 class="text-white mb-4">Para ver tu calendario personalizado, debés elegir un club.</h5>
        <RouterLink to="/equipos" class="btn btn-outline-success rounded-pill px-4 fw-bold custom-btn py-2">
          Ir a Equipos
        </RouterLink>
      </div>
    </div>

    <div v-else>
      <h4 class="mb-4 fw-semibold text-white text-center">Próximos Compromisos</h4>
      
      <div v-if="partidosFiltrados.length === 0" class="glass-card p-4 text-center shadow">
        <p class="mb-0 text-secondary">No se encontraron partidos programados para {{ favorito }}.</p>
      </div>

      <div v-else class="row justify-content-center g-4">
        <div v-for="partido in partidosFiltrados" :key="partido.id" class="col-12 col-md-10 col-lg-8">
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
                  <h4 class="mb-0 fw-bold d-none d-sm-block text-end" :class="partido.local === favorito ? 'text-neon' : 'text-white'">
                    {{ partido.local }}
                  </h4>
                  <img :src="obtenerEscudo(partido.local)" alt="Escudo" width="60" height="60" class="rounded-circle shadow" />
                </div>
                <div class="px-3 px-sm-4">
                  <div class="vs-badge text-neon d-flex align-items-center justify-content-center fw-bold fs-4">
                    VS
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-start flex-grow-1 w-25 gap-3">
                  <img :src="obtenerEscudo(partido.visitante)" alt="Escudo" width="60" height="60" class="rounded-circle shadow" />
                  <h4 class="mb-0 fw-bold d-none d-sm-block text-start" :class="partido.visitante === favorito ? 'text-neon' : 'text-white'">
                    {{ partido.visitante }}
                  </h4>
                </div>
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

const favorito = ref('')
const partidosFiltrados = ref([])

const cargarDatos = () => {
  favorito.value = localStorage.getItem('equipoFavorito') || ''
  const todosLosPartidos = [
    { id: 1, local: 'Sarmiento (Junín)', visitante: 'Instituto', fecha: 'Viernes 29 de Mayo', hora: '19:00' },
    { id: 2, local: 'Platense', visitante: 'Newell\'s Old Boys', fecha: 'Viernes 29 de Mayo', hora: '21:15' },
    { id: 3, local: 'Aldosivi', visitante: 'Estudiantes de Río Cuarto', fecha: 'Sábado 30 de Mayo', hora: '15:30' },
    { id: 4, local: 'San Lorenzo', visitante: 'Lanús', fecha: 'Sábado 30 de Mayo', hora: '17:30' },
    { id: 5, local: 'Racing Club', visitante: 'Gimnasia y Esgrima La Plata', fecha: 'Sábado 30 de Mayo', hora: '19:45' },
    { id: 6, local: 'Vélez Sarsfield', visitante: 'Independiente', fecha: 'Sábado 30 de Mayo', hora: '22:00' },
    { id: 7, local: 'Defensa y Justicia', visitante: 'Banfield', fecha: 'Domingo 31 de Mayo', hora: '15:30' },
    { id: 8, local: 'Boca Juniors', visitante: 'Talleres (Córdoba)', fecha: 'Domingo 31 de Mayo', hora: '17:30' },
    { id: 9, local: 'Belgrano', visitante: 'Rosario Central', fecha: 'Domingo 31 de Mayo', hora: '19:45' },
    { id: 10, local: 'Argentinos Juniors', visitante: 'River Plate', fecha: 'Domingo 31 de Mayo', hora: '22:00' },
    { id: 11, local: 'Deportivo Riestra', visitante: 'Gimnasia y Esgrima (Mendoza)', fecha: 'Lunes 1 de Junio', hora: '17:00' },
    { id: 12, local: 'Estudiantes de La Plata', visitante: 'Unión (Santa Fe)', fecha: 'Lunes 1 de Junio', hora: '19:00' },
    { id: 13, local: 'Atlético Tucumán', visitante: 'Independiente Rivadavia', fecha: 'Lunes 1 de Junio', hora: '19:00' },
    { id: 14, local: 'Barracas Central', visitante: 'Central Córdoba (Santiago del Estero)', fecha: 'Lunes 1 de Junio', hora: '21:15' },
    { id: 15, local: 'Tigre', visitante: 'Huracán', fecha: 'Lunes 1 de Junio', hora: '21:15' }
  ]
  partidosFiltrados.value = todosLosPartidos.filter((p) => {
    const coincide = p.local === favorito.value || p.visitante === favorito.value
    return coincide
  })
}

const obtenerEscudo = (nombre) => {
  let nombreLimpio = String(nombre).toLowerCase().replace(/ /g, '-').replace(/[()]/g, '').replace(/'/g, '')
  let urlLocal = new URL(`../assets/escudos/${nombreLimpio}.png`, import.meta.url).href
  return urlLocal
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