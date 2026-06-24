<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Admin - Usuarios</h1>
      <p class="text-neon fw-semibold tracking-wide">GESTIÓN DE CUENTAS REGISTRADAS</p>
    </div>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-success" style="width: 3rem; height: 3rem; filter: drop-shadow(0 0 10px #00fa9a);" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="usuarios.length === 0" class="glass-card p-5 text-center shadow">
      <p class="text-secondary fs-5 mb-0">No hay usuarios registrados aún.</p>
    </div>

    <div v-else class="glass-card shadow overflow-hidden">
      <div class="table-responsive">
        <table class="table table-dark table-hover mb-0 align-middle">
          <thead>
            <tr class="border-bottom border-secondary">
              <th class="py-3 px-4 text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">ID</th>
              <th class="py-3 px-4 text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">USERNAME</th>
              <th class="py-3 px-4 text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">ROL</th>
              <th class="py-3 px-4 text-secondary fw-bold text-center" style="font-size: 0.75rem; letter-spacing: 1px;">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id" class="border-bottom border-secondary border-opacity-25 table-row">
              <td class="py-3 px-4 text-secondary" style="font-size: 0.85rem;">{{ usuario.id }}</td>
              <td class="py-3 px-4 fw-semibold text-white text-capitalize">{{ usuario.username }}</td>
              <td class="py-3 px-4">
                <span class="badge rounded-pill" :class="usuario.rol === 'admin' ? 'bg-danger' : 'bg-secondary'" style="font-size: 0.78rem;">
                  {{ usuario.rol === 'admin' ? 'Administrador' : 'Usuario' }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <template v-if="usuario.username.toLowerCase() !== 'admin' && usuario.username.toLowerCase() !== 'user'">
                  <button
                    class="btn btn-sm rounded-pill px-3 fw-bold me-2"
                    :class="usuario.rol === 'admin' ? 'btn-outline-warning' : 'btn-outline-success'"
                    :disabled="procesandoRol === usuario.id"
                    @click="toggleRol(usuario)"
                  >
                    {{ procesandoRol === usuario.id ? '...' : usuario.rol === 'admin' ? 'Quitar Admin' : 'Hacer Admin' }}
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold"
                    @click="abrirModal(usuario)"
                  >
                    Eliminar
                  </button>
                </template>
                <span v-else class="text-secondary" style="font-size: 0.8rem;">🔒 Protegido</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="mensaje" class="alert mt-4 rounded-3 fw-semibold text-white text-center glass-alert shadow-sm" :class="mensajeTipo" role="alert">
      {{ mensaje }}
    </div>

    <!-- Modal eliminar -->
    <div v-if="showModal" class="modal-backdrop-glass d-flex justify-content-center align-items-center">
      <div class="glass-card p-5 shadow-lg text-center" style="max-width: 450px; width: 90%; border-color: rgba(220, 53, 69, 0.3);">
        <div class="mb-3">
          <span style="font-size: 3.5rem;">⚠️</span>
        </div>
        <h4 class="text-white fw-bold mb-2">¿Eliminar usuario?</h4>
        <p class="text-secondary mb-1">Estás por eliminar la cuenta de:</p>
        <p class="text-neon fw-bold fs-5 mb-4 text-capitalize">{{ usuarioSeleccionado?.username }}</p>
        <p class="text-secondary mb-4" style="font-size: 0.9rem;">Esta acción es irreversible y borrará sus datos del sistema.</p>
        <div class="d-flex justify-content-center gap-3">
          <button @click="cerrarModal" class="btn btn-outline-secondary rounded-pill px-4" :disabled="procesando">
            Cancelar
          </button>
          <button @click="ejecutarEliminar" class="btn btn-danger rounded-pill px-4 fw-bold" :disabled="procesando">
            {{ procesando ? 'Eliminando...' : 'Sí, eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerUsuarios, eliminarUsuario, actualizarUsuario } from '../services/usuariosService'

const usuarios = ref([])
const cargando = ref(true)
const mensaje = ref('')
const mensajeTipo = ref('')
const showModal = ref(false)
const procesando = ref(false)
const procesandoRol = ref(null)
const usuarioSeleccionado = ref(null)

const mostrarMensaje = (texto, tipo = 'alert-success bg-success bg-opacity-25 border-success') => {
  mensaje.value = texto
  mensajeTipo.value = tipo
  setTimeout(() => { mensaje.value = '' }, 3500)
}

const cargarUsuarios = async () => {
  cargando.value = true
  try {
    usuarios.value = await obtenerUsuarios()
  } catch (e) {
    mostrarMensaje('Error al cargar usuarios.', 'alert-danger bg-danger bg-opacity-25 border-danger')
  } finally {
    cargando.value = false
  }
}

const abrirModal = (usuario) => {
  usuarioSeleccionado.value = usuario
  showModal.value = true
}

const cerrarModal = () => {
  showModal.value = false
  usuarioSeleccionado.value = null
}

const ejecutarEliminar = async () => {
  if (!usuarioSeleccionado.value) return
  procesando.value = true
  try {
    await eliminarUsuario(usuarioSeleccionado.value.id)
    mostrarMensaje(`Usuario "${usuarioSeleccionado.value.username}" eliminado correctamente.`)
    cerrarModal()
    await cargarUsuarios()
  } catch (e) {
    mostrarMensaje('Error al eliminar el usuario.', 'alert-danger bg-danger bg-opacity-25 border-danger')
  } finally {
    procesando.value = false
  }
}

const toggleRol = async (usuario) => {
  procesandoRol.value = usuario.id
  const nuevoRol = usuario.rol === 'admin' ? 'user' : 'admin'
  try {
    await actualizarUsuario(usuario.id, { ...usuario, rol: nuevoRol })
    mostrarMensaje(`Rol de "${usuario.username}" actualizado a ${nuevoRol === 'admin' ? 'Administrador' : 'Usuario'}.`)
    await cargarUsuarios()
  } catch (e) {
    mostrarMensaje('Error al actualizar el rol.', 'alert-danger bg-danger bg-opacity-25 border-danger')
  } finally {
    procesandoRol.value = null
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>

<style scoped>
.tracking-wide {
  letter-spacing: 2px;
}

.text-neon {
  color: #00fa9a;
  text-shadow: 0 0 15px rgba(0, 250, 154, 0.5);
}

.glass-card {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 1rem;
}

.glass-alert {
  backdrop-filter: blur(4px);
}

.table {
  background-color: transparent !important;
}

.table-row {
  transition: background 0.2s ease;
}

.table-hover tbody .table-row:hover {
  background-color: rgba(255, 255, 255, 0.04) !important;
}

.modal-backdrop-glass {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1050;
}
</style>