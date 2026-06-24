<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Mi Perfil</h1>
      <p class="text-neon fw-semibold tracking-wide">DATOS DE LA CUENTA</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="glass-card p-5 shadow">
          <div class="text-center mb-4">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25 border border-success mb-3" style="width: 100px; height: 100px;">
              <span style="font-size: 2.5rem;">👤</span>
            </div>
            <h3 class="text-white fw-bold text-capitalize">{{ usuario.username }}</h3>
            <span class="badge" :class="usuario.rol === 'admin' ? 'bg-danger' : 'bg-secondary'" style="font-size: 0.85rem;">
              {{ usuario.rol === 'admin' ? 'Administrador' : 'Usuario' }}
            </span>
          </div>

          <div class="glass-inner rounded-4 p-4 mb-4">
            <div class="d-flex justify-content-between mb-3 pb-3 border-bottom border-secondary border-opacity-25">
              <span class="text-secondary">Nombre de usuario</span>
              <span class="text-white fw-semibold text-capitalize">{{ usuario.username }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 pb-3 border-bottom border-secondary border-opacity-25">
              <span class="text-secondary">Rol</span>
              <span class="text-white fw-semibold">{{ usuario.rol === 'admin' ? 'Administrador' : 'Usuario regular' }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 pb-3 border-bottom border-secondary border-opacity-25">
              <span class="text-secondary">Acceso a ABM</span>
              <span :class="usuario.rol === 'admin' ? 'text-neon' : 'text-secondary'" class="fw-semibold">
                {{ usuario.rol === 'admin' ? '✓ Total' : '✗ Sin acceso' }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-secondary">Acceso a Dashboard</span>
              <span :class="usuario.rol === 'admin' ? 'text-neon' : 'text-secondary'" class="fw-semibold">
                {{ usuario.rol === 'admin' ? '✓ Total' : '✗ Sin acceso' }}
              </span>
            </div>
          </div>

          <div v-if="usuario.rol === 'user'" class="glass-inner rounded-4 p-4 mb-4" style="border-color: rgba(0, 250, 154, 0.2);">
            <h6 class="text-neon fw-bold mb-3">📌 Accesos disponibles para vos</h6>
            <ul class="list-unstyled mb-0">
              <li class="text-white mb-2">✅ Ver próximos partidos</li>
              <li class="text-white mb-2">✅ Explorar equipos y jugadores</li>
              <li class="text-white mb-2">✅ Consultar tabla de posiciones</li>
              <li class="text-white mb-2">✅ Ver estadísticas individuales</li>
              <li class="text-white mb-2">✅ Seguir tu equipo favorito</li>
              <li class="text-white mb-2">✅ Hacer consultas con IA</li>
            </ul>
          </div>

          <div v-if="usuario.rol === 'admin'" class="glass-inner rounded-4 p-4 mb-4" style="border-color: rgba(220, 53, 69, 0.3);">
            <h6 class="text-danger fw-bold mb-3">⚙️ Panel de Administración</h6>
            <ul class="list-unstyled mb-0">
              <li class="text-white mb-2">✅ ABM de jugadores (alta, baja, modificación)</li>
              <li class="text-white mb-2">✅ Dashboard con reportes y estadísticas</li>
              <li class="text-white mb-2">✅ Análisis con inteligencia artificial</li>
              <li class="text-white mb-2">✅ Acceso a todas las funcionalidades</li>
            </ul>
          </div>

          <div class="d-flex flex-column gap-3">
            <button @click="logout" class="btn btn-outline-light rounded-pill w-100 fw-bold py-2">
              Cerrar Sesión
            </button>
            <button v-if="usuario.username.toLowerCase() !== 'admin' && usuario.username.toLowerCase() !== 'user'" @click="abrirModalEliminar" class="btn btn-outline-danger rounded-pill w-100 fw-bold py-2 border-opacity-50">
              Eliminar Mi Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop-glass d-flex justify-content-center align-items-center">
      <div class="glass-card p-5 shadow-lg border-danger text-center" style="max-width: 450px; width: 90%;">
        <div class="mb-3">
          <span style="font-size: 3.5rem;">⚠️</span>
        </div>
        <h4 class="text-white fw-bold mb-3">¿Eliminar cuenta?</h4>
        <p class="text-secondary mb-4">Esta acción es irreversible. Se borrarán todos tus datos del sistema de forma permanente.</p>
        <div v-if="mensajeError" class="alert alert-danger p-2 mb-4" style="font-family: monospace; font-size: 0.9rem;">{{ mensajeError }}</div>
        <div class="d-flex justify-content-center gap-3">
          <button @click="cerrarModal" class="btn btn-outline-secondary rounded-pill px-4" :disabled="procesando">Cancelar</button>
          <button @click="eliminarCuenta" class="btn btn-danger rounded-pill px-4 fw-bold" :disabled="procesando">
            {{ procesando ? 'Borrando...' : 'Sí, eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuarioStr = localStorage.getItem('usuarioLogueado')
const usuario = ref(usuarioStr ? JSON.parse(usuarioStr) : { id: null, username: 'Desconocido', rol: 'user' })

const showModal = ref(false)
const procesando = ref(false)
const mensajeError = ref('')

const logout = () => {
  let r = true
  localStorage.removeItem('usuarioLogueado')
  router.push('/login')
  return r
}

const abrirModalEliminar = () => {
  let r = true
  showModal.value = true
  mensajeError.value = ''
  return r
}

const cerrarModal = () => {
  let r = true
  showModal.value = false
  return r
}

const eliminarCuenta = async () => {
  let finalizado = false
  procesando.value = true
  mensajeError.value = ''
  try {
    const baseUrl = import.meta.env.VITE_MOCKAPI_URL
    if (baseUrl) {
      const urlBusqueda = `${baseUrl}/usuarios`
      const resBusqueda = await fetch(urlBusqueda)
      
      if (resBusqueda.ok) {
        const usuariosTotales = await resBusqueda.json()
        const usuarioExacto = usuariosTotales.find(u => u.username.toLowerCase() === usuario.value.username.toLowerCase())
        
        if (usuarioExacto) {
          const urlDelete = `${baseUrl}/usuarios/${usuarioExacto.id}`
          const respuesta = await fetch(urlDelete, {
            method: 'DELETE'
          })
          if (respuesta.ok) {
            localStorage.removeItem('usuarioLogueado')
            router.push({ path: '/login', query: { mensaje: 'borrado' } })
            finalizado = true
          } else {
            mensajeError.value = 'Status ' + respuesta.status + ': No se pudo borrar el ID ' + usuarioExacto.id
          }
        } else {
          mensajeError.value = 'No se encontro el username "' + usuario.value.username + '" en la base de datos.'
        }
      } else {
        mensajeError.value = 'Error al consultar la tabla usuarios en MockAPI.'
      }
    } else {
      mensajeError.value = 'La variable VITE_MOCKAPI_URL no esta definida en el entorno.'
    }
  } catch (error) {
    mensajeError.value = 'Excepcion de conexion: ' + error.message
  } finally {
    procesando.value = false
  }
  return finalizado
}
</script>

<style scoped>
.text-neon {
  text-shadow: 0 0 15px rgba(0, 250, 154, 0.5);
  color: #00fa9a;
}

.glass-inner {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tracking-wide {
  letter-spacing: 2px;
}

.glass-card {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
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