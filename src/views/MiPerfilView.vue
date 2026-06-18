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

          <button @click="logout" class="btn btn-outline-danger rounded-pill w-100 fw-bold py-2">
            Cerrar Sesión
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
const usuario = ref(usuarioStr ? JSON.parse(usuarioStr) : { username: 'Desconocido', rol: 'user' })

const logout = () => {
  localStorage.removeItem('usuarioLogueado')
  router.push('/login')
}
</script>

<style scoped>
.glass-inner {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tracking-wide {
  letter-spacing: 2px;
}
</style>
