<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-4 fw-bold text-white">Admin - Jugadores</h1>
        <p class="text-neon fw-semibold tracking-wide">ALTA BAJA MODIFICACIÓN</p>
      </div>

      <button class="btn btn-success rounded-pill px-4 fw-bold py-2" @click="abrirModal()">
        + Nuevo Jugador
      </button>
    </div>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-neon" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="jugadores.length === 0" class="glass-card p-5 text-center shadow">
      <p class="text-secondary fs-5 mb-3">No hay jugadores registrados. Creá el primero.</p>
      <button class="btn btn-outline-success rounded-pill px-4 fw-bold py-2" @click="abrirModal()">
        + Crear Jugador
      </button>
    </div>

    <template v-else>
      <div class="glass-card p-3 mb-4 shadow">
        <input
          v-model="busqueda"
          type="text"
          class="form-control bg-transparent text-white border-secondary"
          placeholder="Buscar jugador por nombre o equipo..."
        >
      </div>

      <div class="glass-card shadow">
        <div class="table-responsive">
          <table class="table table-dark table-hover mb-0 align-middle bg-transparent">
            <thead>
              <tr class="border-bottom border-secondary">
                <th class="py-3">Nombre</th>
                <th class="py-3">Posición</th>
                <th class="py-3">Equipo</th>
                <th class="py-3 text-center">N°</th>
                <th class="py-3 text-center">Goles</th>
                <th class="py-3 text-center">Asist.</th>
                <th class="py-3 text-center">Part.</th>
                <th class="py-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="jugador in jugadoresFiltrados"
                :key="jugador.id"
                class="border-bottom border-secondary border-opacity-25"
              >
                <td class="fw-semibold text-white">{{ jugador.nombre }}</td>
                <td>
                  <span class="badge bg-primary bg-opacity-25 text-info border border-info rounded-pill px-2 py-1">
                    {{ jugador.posicion }}
                  </span>
                </td>
                <td>{{ jugador.equipo }}</td>
                <td class="text-center">#{{ jugador.numero || '-' }}</td>
                <td class="text-center text-neon fw-bold">{{ jugador.goles || 0 }}</td>
                <td class="text-center text-info fw-bold">{{ jugador.asistencias || 0 }}</td>
                <td class="text-center">{{ jugador.partidos || 0 }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-outline-info me-2 rounded-pill px-3" @click="abrirModal(jugador)">
                    Editar
                  </button>
                  <button class="btn btn-sm btn-outline-danger rounded-pill px-3" @click="confirmarEliminar(jugador)">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-if="jugadoresFiltrados.length === 0" class="text-center text-secondary py-4 mb-0">
          No se encontraron jugadores para esa búsqueda.
        </p>
      </div>
    </template>

    <div v-if="mensaje" class="alert mt-4" :class="mensajeTipo" role="alert">
      {{ mensaje }}
    </div>

    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.7);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content bg-dark text-white border border-secondary">
          <div class="modal-header border-secondary">
            <h5 class="modal-title fw-bold">{{ editando ? 'Editar Jugador' : 'Nuevo Jugador' }}</h5>
            <button type="button" class="btn-close btn-close-white" @click="cerrarModal"></button>
          </div>

          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label text-light fw-semibold">Nombre *</label>
                <input v-model="formulario.nombre" type="text" class="form-control bg-transparent text-white border-secondary" required>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label text-light fw-semibold">Posición *</label>
                <select v-model="formulario.posicion" class="form-select bg-transparent text-white border-secondary">
                  <option value="" disabled class="text-dark">Seleccionar...</option>
                  <option value="Arquero" class="text-dark">Arquero</option>
                  <option value="Defensor" class="text-dark">Defensor</option>
                  <option value="Mediocampista" class="text-dark">Mediocampista</option>
                  <option value="Delantero" class="text-dark">Delantero</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label text-light fw-semibold">Equipo *</label>
                <input v-model="formulario.equipo" type="text" class="form-control bg-transparent text-white border-secondary" required>
              </div>

              <div class="col-12 col-md-3">
                <label class="form-label text-light fw-semibold">Número</label>
                <input v-model.number="formulario.numero" type="number" class="form-control bg-transparent text-white border-secondary" min="1" max="99">
              </div>

              <div class="col-12 col-md-3">
                <label class="form-label text-light fw-semibold">Edad</label>
                <input v-model.number="formulario.edad" type="number" class="form-control bg-transparent text-white border-secondary" min="15" max="50">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label text-light fw-semibold">Nacionalidad</label>
                <input v-model="formulario.nacionalidad" type="text" class="form-control bg-transparent text-white border-secondary" placeholder="Argentina">
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label text-light fw-semibold">Goles</label>
                <input v-model.number="formulario.goles" type="number" class="form-control bg-transparent text-white border-secondary" min="0">
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label text-light fw-semibold">Asistencias</label>
                <input v-model.number="formulario.asistencias" type="number" class="form-control bg-transparent text-white border-secondary" min="0">
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label text-light fw-semibold">Partidos</label>
                <input v-model.number="formulario.partidos" type="number" class="form-control bg-transparent text-white border-secondary" min="0">
              </div>
            </div>
          </div>

          <div class="modal-footer border-secondary">
            <button type="button" class="btn btn-secondary rounded-pill px-4" @click="cerrarModal">
              Cancelar
            </button>
            <button type="button" class="btn btn-success rounded-pill px-4 fw-bold" @click="guardarJugador" :disabled="guardando">
              {{ guardando ? 'Guardando...' : (editando ? 'Actualizar' : 'Crear') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { obtenerJugadores, crearJugador, actualizarJugador, eliminarJugador } from '../services/jugadoresService'

const jugadores = ref([])
const busqueda = ref('')
const cargando = ref(true)
const guardando = ref(false)
const showModal = ref(false)
const editando = ref(false)
const jugadorId = ref(null)
const mensaje = ref('')
const mensajeTipo = ref('')

const formularioInicial = {
  nombre: '',
  posicion: '',
  equipo: '',
  numero: null,
  edad: null,
  nacionalidad: 'Argentina',
  goles: 0,
  asistencias: 0,
  partidos: 0
}

const formulario = ref({ ...formularioInicial })

const jugadoresFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  if (!texto) {
    return jugadores.value
  }

  return jugadores.value.filter((jugador) => {
    const nombre = String(jugador.nombre || '').toLowerCase()
    const equipo = String(jugador.equipo || '').toLowerCase()

    return nombre.includes(texto) || equipo.includes(texto)
  })
})

const mostrarMensaje = (texto, tipo = 'alert-success') => {
  mensaje.value = texto
  mensajeTipo.value = tipo

  setTimeout(() => {
    mensaje.value = ''
  }, 3000)
}

const cargarJugadores = async () => {
  cargando.value = true

  try {
    jugadores.value = await obtenerJugadores()
  } catch (e) {
    mostrarMensaje('Error al cargar jugadores. Verificá mockapi.io', 'alert-danger')
    console.error(e)
  } finally {
    cargando.value = false
  }
}

const abrirModal = (jugador = null) => {
  if (jugador) {
    editando.value = true
    jugadorId.value = jugador.id
    formulario.value = {
      nombre: jugador.nombre || '',
      posicion: jugador.posicion || '',
      equipo: jugador.equipo || '',
      numero: jugador.numero || null,
      edad: jugador.edad || null,
      nacionalidad: jugador.nacionalidad || 'Argentina',
      goles: jugador.goles || 0,
      asistencias: jugador.asistencias || 0,
      partidos: jugador.partidos || 0
    }
  } else {
    editando.value = false
    jugadorId.value = null
    formulario.value = { ...formularioInicial }
  }

  showModal.value = true
}

const cerrarModal = () => {
  showModal.value = false
}

const guardarJugador = async () => {
  if (!formulario.value.nombre || !formulario.value.posicion || !formulario.value.equipo) {
    mostrarMensaje('Completá los campos obligatorios (Nombre, Posición, Equipo)', 'alert-danger')
    return
  }

  guardando.value = true

  try {
    if (editando.value) {
      await actualizarJugador(jugadorId.value, formulario.value)
      mostrarMensaje('Jugador actualizado correctamente')
    } else {
      await crearJugador(formulario.value)
      mostrarMensaje('Jugador creado correctamente')
    }

    cerrarModal()
    await cargarJugadores()
  } catch (e) {
    mostrarMensaje('Error al guardar el jugador', 'alert-danger')
    console.error(e)
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = async (jugador) => {
  if (!confirm(`¿Eliminar a ${jugador.nombre}?`)) return

  try {
    await eliminarJugador(jugador.id)
    mostrarMensaje('Jugador eliminado correctamente')
    await cargarJugadores()
  } catch (e) {
    mostrarMensaje('Error al eliminar el jugador', 'alert-danger')
    console.error(e)
  }
}

onMounted(() => {
  cargarJugadores()
})
</script>

<style scoped>
.tracking-wide {
  letter-spacing: 2px;
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 10px rgba(0, 250, 154, 0.3);
  border-color: #00fa9a !important;
  background: rgba(0, 250, 154, 0.05) !important;
}

.form-select option {
  background-color: #1a1a2e;
}

.btn-close {
  filter: brightness(0) invert(1);
}

.table {
  background-color: transparent !important;
}

.table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
