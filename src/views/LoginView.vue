<template>
  <div class="container py-5 d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="glass-card p-5 shadow-lg" style="width: 100%; max-width: 450px;">
      <div class="text-center mb-5">
        <h2 class="fw-bold text-white mb-2">Iniciar Sesión</h2>
        <p class="text-secondary">Ingresá tus credenciales para continuar</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="usuario" class="form-label text-light fw-semibold">Usuario</label>
          <input type="text" class="form-control bg-transparent text-white border-secondary glass-input" id="usuario" v-model="usuario" required placeholder="admin o user">
        </div>
        
        <div class="mb-5">
          <label for="password" class="form-label text-light fw-semibold">Contraseña</label>
          <input type="password" class="form-control bg-transparent text-white border-secondary glass-input" id="password" v-model="password" required placeholder="1234">
        </div>

        <div v-if="errorMensaje" class="alert alert-danger py-2 mb-4 rounded-3 border-danger bg-danger bg-opacity-25 text-white text-center fw-semibold">
          {{ errorMensaje }}
        </div>

        <button type="submit" class="btn btn-outline-success w-100 rounded-pill fw-bold py-2 custom-btn">
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref('')
const password = ref('')
const errorMensaje = ref('')
const router = useRouter()

const handleLogin = () => {
  let validacion = false

  if (usuario.value === 'admin' && password.value === '1234') {
    const adminData = { username: 'Administrador', rol: 'admin' }
    localStorage.setItem('usuarioLogueado', JSON.stringify(adminData))
    validacion = true
  } else if (usuario.value === 'user' && password.value === '1234') {
    const userData = { username: 'Hincha', rol: 'user' }
    localStorage.setItem('usuarioLogueado', JSON.stringify(userData))
    validacion = true
  } else {
    errorMensaje.value = 'Credenciales incorrectas (Usa admin/1234 o user/1234)'
  }

  if (validacion) {
    router.push('/')
  }
}
</script>

<style scoped>
.glass-input {
  transition: all 0.3s ease;
}

.glass-input:focus {
  box-shadow: 0 0 10px rgba(0, 250, 154, 0.3);
  border-color: #00fa9a !important;
  background: rgba(0, 250, 154, 0.05) !important;
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
</style>