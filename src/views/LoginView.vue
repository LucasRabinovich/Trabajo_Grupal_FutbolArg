<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    
    <div class="background-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="bg-grid"></div>
    </div>

    <div v-if="cargandoEscudos" class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" style="z-index: 1;">
      <div class="spinner-border text-success" style="width: 4rem; height: 4rem; filter: drop-shadow(0 0 10px #00fa9a);" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else class="background-elements">
      <img v-for="(escudo, index) in escudosList" :key="'escudo-' + index" :src="escudo" class="floating-item" :class="'item-' + (index + 1)" alt="Escudo">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg" class="floating-item ball item-7" alt="Pelota">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg" class="floating-item ball item-8" alt="Pelota">
    </div>

    <div class="glass-card shadow-lg d-flex overflow-hidden" style="max-width: 950px; width: 100%; z-index: 10; position: relative;">
      
      <div class="p-5 d-none d-md-flex flex-column justify-content-center align-items-center auth-sidebar position-relative" style="width: 45%;">
        <div class="glass-icon-wrapper mb-4">
          <span style="font-size: 3rem; filter: drop-shadow(0 0 10px rgba(0, 250, 154, 0.5));">📊</span>
        </div>
        <h1 class="text-white fw-bold display-5 mb-3 text-neon text-center">DataGol</h1>
        <p class="text-light text-center mt-2 px-2 lh-lg" style="opacity: 0.85; font-size: 0.95rem;">
          Tu plataforma definitiva para analizar cada jugada, estadística y resultado del fútbol argentino en tiempo real.
        </p>
        <div class="position-absolute bottom-0 mb-4">
          <span class="badge bg-dark bg-opacity-50 border border-secondary text-secondary rounded-pill px-3 py-2 fw-normal">
            🔒 Acceso Encriptado
          </span>
        </div>
      </div>

      <div class="p-5 form-section d-flex flex-column justify-content-center" style="width: 100%; max-width: 500px; margin: 0 auto;">
        
        <div class="text-center mb-4 d-md-none">
          <span style="font-size: 2.5rem;">📊</span>
          <h1 class="text-white fw-bold display-5 mb-2 text-neon mt-2">DataGol</h1>
        </div>
        
        <div class="text-center mb-4 mt-md-2">
          <h3 class="fw-bold text-white mb-2">{{ isLogin ? 'Bienvenido de nuevo' : 'Crear Cuenta' }}</h3>
          <p class="text-secondary" style="font-size: 0.9rem;">
            {{ isLogin ? 'Ingresá tus credenciales para acceder al panel' : 'Completá los datos para registrarte en el sistema' }}
          </p>
        </div>

        <div v-if="exitoMensaje" class="alert alert-success py-2 mb-4 rounded-3 border-success bg-success bg-opacity-25 text-white text-center fw-semibold glass-alert shadow-sm" style="font-size: 0.9rem;">
          {{ exitoMensaje }}
        </div>

        <div v-if="errorMensaje" class="alert alert-danger py-2 mb-4 rounded-3 border-danger bg-danger bg-opacity-25 text-white text-center fw-semibold glass-alert shadow-sm" style="font-size: 0.9rem;">
          {{ errorMensaje }}
        </div>

        <form v-if="isLogin" @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="usuario" class="form-label text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">USUARIO</label>
            <input type="text" class="form-control bg-transparent text-white glass-input py-2 px-3" :class="usuario.length >= 4 ? 'border-success' : 'border-secondary'" id="usuario" v-model="usuario" required placeholder="admin o user">
          </div>
          
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
               <label for="password" class="form-label text-secondary fw-bold mb-0" style="font-size: 0.75rem; letter-spacing: 1px;">CONTRASEÑA</label>
               <a href="#" class="text-neon text-decoration-none transition-hover" style="font-size: 0.75rem;">¿Olvidaste la clave?</a>
            </div>
            <div class="position-relative">
              <input :type="mostrarPasswordLogin ? 'text' : 'password'" class="form-control bg-transparent text-white glass-input py-2 px-3 pe-5" :class="password.length >= 4 ? 'border-success' : 'border-secondary'" id="password" v-model="password" required placeholder="••••">
              <span @click="togglePasswordLogin" class="position-absolute top-50 end-0 translate-middle-y me-3 toggle-eye">
                {{ mostrarPasswordLogin ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>

          <div class="mb-4 form-check custom-checkbox">
            <input type="checkbox" class="form-check-input bg-transparent border-secondary" id="remember" style="cursor: pointer;">
            <label class="form-check-label text-secondary ms-1 mt-1" for="remember" style="font-size: 0.85rem; cursor: pointer;">Mantener sesión iniciada</label>
          </div>

          <button type="submit" class="btn btn-outline-success w-100 rounded-pill fw-bold py-3 custom-btn text-uppercase tracking-wide mb-4">
            Iniciar Sesión
          </button>

          <p class="text-center text-secondary mb-0" style="font-size: 0.9rem;">
            ¿No tenés cuenta? 
            <a href="#" @click.prevent="toggleAuthMode" class="text-neon text-decoration-none fw-bold ms-1">Registrate acá</a>
          </p>
        </form>

        <form v-else @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="nuevoUsuario" class="form-label text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">NUEVO USUARIO</label>
            <input type="text" class="form-control bg-transparent text-white glass-input py-2 px-3" :class="nuevoUsuario.length >= 4 ? 'border-success' : 'border-secondary'" id="nuevoUsuario" v-model="nuevoUsuario" required placeholder="Ej: facu99">
          </div>

          <div class="mb-5">
            <label for="nuevaPassword" class="form-label text-secondary fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">CONTRASEÑA (MÍNIMO 5 CARACTERES)</label>
            <div class="position-relative">
              <input :type="mostrarPasswordRegistro ? 'text' : 'password'" class="form-control bg-transparent text-white glass-input py-2 px-3 pe-5" :class="nuevaPassword.length >= 5 ? 'border-success' : 'border-secondary'" id="nuevaPassword" v-model="nuevaPassword" required placeholder="•••••">
              <span @click="togglePasswordRegistro" class="position-absolute top-50 end-0 translate-middle-y me-3 toggle-eye">
                {{ mostrarPasswordRegistro ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>

          <button type="submit" class="btn btn-outline-success w-100 rounded-pill fw-bold py-3 custom-btn text-uppercase tracking-wide mb-4">
            Crear Mi Cuenta
          </button>

          <p class="text-center text-secondary mb-0" style="font-size: 0.9rem;">
            ¿Ya tenés cuenta? 
            <a href="#" @click.prevent="toggleAuthMode" class="text-neon text-decoration-none fw-bold ms-1">Iniciá sesión</a>
          </p>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerEquiposLigaArgentina } from '../services/footballApi.js'
import { crearMapaLogos } from '../services/escudosService.js'
import { obtenerUsuarios, crearUsuario } from '../services/usuariosService.js'

const isLogin = ref(true)
const usuario = ref('')
const password = ref('')
const nuevoUsuario = ref('')
const nuevaPassword = ref('')
const errorMensaje = ref('')
const exitoMensaje = ref('')
const cargandoEscudos = ref(true)
const mostrarPasswordLogin = ref(false)
const mostrarPasswordRegistro = ref(false)
const router = useRouter()
const escudosList = ref([])

const cargarEscudos = async () => {
  let listaDestino = []
  try {
    const respuesta = await obtenerEquiposLigaArgentina()
    const logosObj = crearMapaLogos(respuesta)
    const arrayLogos = Object.values(logosObj)
    listaDestino = arrayLogos.slice(0, 6)
  } catch (error) {
    listaDestino = [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Boca_Juniors_logo18.svg/120px-Boca_Juniors_logo18.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_River_Plate.png/120px-Logo_River_Plate.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Escudo_de_Racing_Club_%282014%29.svg/120px-Escudo_de_Racing_Club_%282014%29.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Escudo_del_Club_Atl%C3%A9tico_Independiente.svg/120px-Escudo_del_Club_Atl%C3%A9tico_Independiente.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/San_Lorenzo_de_Almagro_logo.svg/120px-San_Lorenzo_de_Almagro_logo.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Escudo_del_Club_Atl%C3%A9tico_Hurac%C3%A1n.svg/120px-Escudo_del_Club_Atl%C3%A9tico_Hurac%C3%A1n.svg.png'
    ]
  }
  escudosList.value = listaDestino
  cargandoEscudos.value = false
}

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  errorMensaje.value = ''
  exitoMensaje.value = ''
}

const togglePasswordLogin = () => {
  mostrarPasswordLogin.value = !mostrarPasswordLogin.value
}

const togglePasswordRegistro = () => {
  mostrarPasswordRegistro.value = !mostrarPasswordRegistro.value
}

const handleLogin = async () => {
  let validacion = false

  if (usuario.value.toLowerCase() === 'admin' && password.value === '1234') {
    const adminData = { username: 'Administrador', rol: 'admin' }
    localStorage.setItem('usuarioLogueado', JSON.stringify(adminData))
    validacion = true
  } else if (usuario.value.toLowerCase() === 'user' && password.value === '1234') {
    const userData = { username: 'Hincha', rol: 'user' }
    localStorage.setItem('usuarioLogueado', JSON.stringify(userData))
    validacion = true
  } else {
    try {
      const usuarios = await obtenerUsuarios()
      const personalizado = usuarios.find(u => u.username.toLowerCase() === usuario.value.toLowerCase() && u.password === password.value)

      if (personalizado) {
        const customData = { username: personalizado.username, rol: personalizado.rol || 'user' }
        localStorage.setItem('usuarioLogueado', JSON.stringify(customData))
        validacion = true
      } else {
        errorMensaje.value = 'Credenciales incorrectas'
      }
    } catch (e) {
      errorMensaje.value = 'Error al conectar con la base de datos'
    }
  }

  if (validacion) {
    router.push('/')
  }
}

const handleRegister = async () => {
  if (nuevaPassword.value.length < 5) {
    errorMensaje.value = 'La contraseña debe tener al menos 5 caracteres'
    return
  }

  if (nuevoUsuario.value.toLowerCase() === 'admin' || nuevoUsuario.value.toLowerCase() === 'user') {
    errorMensaje.value = 'El nombre de usuario no está disponible'
    return
  }

  try {
    const usuarios = await obtenerUsuarios()
    const existe = usuarios.some(u => u.username.toLowerCase() === nuevoUsuario.value.toLowerCase())

    if (existe) {
      errorMensaje.value = 'El nombre de usuario no está disponible'
      return
    }

    await crearUsuario({
      username: nuevoUsuario.value,
      password: nuevaPassword.value,
      rol: 'user'
    })

    exitoMensaje.value = 'Cuenta creada con éxito. Ya podés iniciar sesión.'
    errorMensaje.value = ''
    usuario.value = nuevoUsuario.value
    nuevoUsuario.value = ''
    nuevaPassword.value = ''
    isLogin.value = true
  } catch (e) {
    errorMensaje.value = 'Error al crear la cuenta. Intentá de nuevo.'
    console.error(e)
  }
}

onMounted(() => {
  cargarEscudos()
})
</script>

<style scoped>
.login-container {
  min-height: 85vh;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.background-orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.bg-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 35px 35px;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.4;
  animation: float 12s infinite ease-in-out alternate;
}

.orb-1 { width: 350px; height: 350px; background: #00fa9a; top: 5%; left: 10%; }
.orb-2 { width: 300px; height: 300px; background: #0d6efd; bottom: 5%; right: 10%; animation-delay: -6s; }

.background-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.floating-item {
  position: absolute;
  opacity: 0.75;
  filter: drop-shadow(0 0 15px rgba(0, 250, 154, 0.4));
  animation: float-element linear infinite alternate;
}

.ball {
  opacity: 0.6;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
}

.item-1 { top: 15%; left: 5%; width: 90px; animation-duration: 9s; }
.item-2 { top: 65%; left: 12%; width: 75px; animation-duration: 11s; animation-delay: -2s; }
.item-3 { top: 25%; right: 8%; width: 85px; animation-duration: 10s; animation-delay: -5s; }
.item-4 { top: 75%; right: 15%; width: 95px; animation-duration: 12s; animation-delay: -1s; }
.item-5 { top: 5%; left: 45%; width: 70px; animation-duration: 10s; animation-delay: -4s; }
.item-6 { bottom: 10%; left: 40%; width: 80px; animation-duration: 13s; animation-delay: -7s; }
.item-7 { top: 45%; left: 20%; width: 60px; animation-duration: 8s; animation-delay: -3s; }
.item-8 { top: 55%; right: 25%; width: 50px; animation-duration: 9s; animation-delay: -6s; }

@keyframes float-element {
  0% { transform: translateY(0) rotate(-15deg) scale(1); }
  100% { transform: translateY(-70px) rotate(20deg) scale(1.2); }
}

@keyframes float {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-40px) scale(1.1); }
}

.glass-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
}

.auth-sidebar {
  background: linear-gradient(135deg, rgba(0, 250, 154, 0.05) 0%, rgba(13, 110, 253, 0.05) 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-icon-wrapper {
  width: 90px;
  height: 90px;
  background: rgba(0, 250, 154, 0.05);
  border: 1px solid rgba(0, 250, 154, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-neon {
  text-shadow: 0 0 20px rgba(0, 250, 154, 0.6);
  letter-spacing: 1px;
}

.form-section {
  background: rgba(15, 23, 42, 0.4);
}

.glass-input {
  transition: all 0.3s ease;
  border-radius: 0.75rem;
}

.glass-input:focus {
  box-shadow: 0 0 15px rgba(0, 250, 154, 0.15);
  border-color: #00fa9a !important;
  background: rgba(0, 250, 154, 0.03) !important;
  transform: translateY(-2px);
}

.glass-alert {
  backdrop-filter: blur(4px);
}

.transition-hover {
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.transition-hover:hover {
  color: #fff !important;
  text-shadow: 0 0 10px rgba(0, 250, 154, 0.8);
}

.custom-checkbox .form-check-input:checked {
  background-color: #00fa9a;
  border-color: #00fa9a;
  box-shadow: 0 0 10px rgba(0, 250, 154, 0.5);
}

.custom-btn {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 2px;
}

.custom-btn:hover {
  background-color: #00fa9a;
  color: #121212 !important;
  border-color: #00fa9a;
  box-shadow: 0 0 25px rgba(0, 250, 154, 0.4);
  transform: translateY(-3px);
}

.toggle-eye {
  cursor: pointer;
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.toggle-eye:hover {
  opacity: 1;
}
</style>