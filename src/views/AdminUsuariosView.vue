<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Admin - Usuarios</h1>
      <p class="text-neon fw-semibold tracking-wide">GESTIÓN DE CUENTAS REGISTRADAS</p>
    </div>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-neon" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="usuarios.length === 0" class="glass-card p-5 text-center shadow">
      <p class="text-secondary fs-5 mb-0">No hay usuarios registrados aún.</p>
    </div>

    <div v-else class="glass-card shadow">
      <div class="table-responsive">
        <table class="table table-dark table-hover mb-0 align-middle bg-transparent">
          <thead>
            <tr class="border-bottom border-secondary">
              <th class="py-3">ID</th>
              <th class="py-3">Username</th>
              <th class="py-3">Rol</th>
              <th class="py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id" class="border-bottom border-secondary border-opacity-25">
              <td class="text-secondary">{{ usuario.id }}</td>
              <td class="fw-semibold text-white">{{ usuario.username }}</td>
              <td>
                <span class="badge" :class="usuario.rol === 'admin' ? 'bg-danger' : 'bg-secondary'" style="font-size: 0.8rem;">
                  {{ usuario.rol === 'admin' ? 'Admin' : 'Usuario' }}
                </span>
              </td>
              <td class="text-center">
                <button v-if="usuario.username !== 'admin'" class="btn btn-sm btn-outline-danger rounded-pill px-3" @click="confirmarEliminar(usuario)">
                  Eliminar
                </button>
                <span v-else class="text-secondary" style="font-size: 0.8rem;">Protegido</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="mensaje" class="alert mt-4" :class="mensajeTipo" role="alert">
      {{ mensaje }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerUsuarios, eliminarUsuario } from '../services/usuariosService'

const usuarios = ref([])
const cargando = ref(true)
const mensaje = ref('')
const mensajeTipo = ref('')

const mostrarMensaje = (texto, tipo = 'alert-success') => {
  mensaje.value = texto
  mensajeTipo.value = tipo
  setTimeout(() => { mensaje.value = '' }, 3000)
}

const cargarUsuarios = async () => {
  cargando.value = true
  try {
    usuarios.value = await obtenerUsuarios()
  } catch (e) {
    mostrarMensaje('Error al cargar usuarios', 'alert-danger')
    console.error(e)
  } finally {
    cargando.value = false
  }
}

const confirmarEliminar = async (usuario) => {
  if (!confirm(`¿Eliminar al usuario "${usuario.username}"?`)) return

  try {
    await eliminarUsuario(usuario.id)
    mostrarMensaje('Usuario eliminado correctamente')
    await cargarUsuarios()
  } catch (e) {
    mostrarMensaje('Error al eliminar el usuario', 'alert-danger')
    console.error(e)
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

.table {
  background-color: transparent !important;
}

.table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
