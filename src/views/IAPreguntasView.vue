<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-white">Consultas con IA</h1>
      <p class="text-neon fw-semibold tracking-wide">HACÉ PREGUNTAS SOBRE FÚTBOL ARGENTINO</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <div class="glass-card shadow">
          <div class="p-4 chat-header border-bottom border-secondary">
            <div class="d-flex align-items-center gap-3">
              <div class="chat-avatar d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25 border border-success" style="width: 45px; height: 45px;">
                <span class="text-neon fw-bold fs-5">IA</span>
              </div>
              <div>
                <h6 class="mb-0 text-white fw-bold">DataGol Assistant</h6>
                <small class="text-secondary">Potenciado por IA</small>
              </div>
            </div>
          </div>

          <div class="chat-messages p-4" ref="chatContainer">
            <div v-if="mensajes.length === 0" class="text-center py-5">
              <div class="mb-3" style="font-size: 3rem;">🤖</div>
              <p class="text-secondary mb-1">Preguntame sobre:</p>
              <div class="d-flex flex-wrap gap-2 justify-content-center mt-3">
                <button
                  v-for="sug in sugerencias" :key="sug"
                  class="btn btn-sm btn-outline-success rounded-pill px-3 fw-semibold"
                  @click="enviarPregunta(sug)"
                >
                  {{ sug }}
                </button>
              </div>
            </div>

            <div v-for="(msg, index) in mensajes" :key="index" class="mb-4">
              <div v-if="msg.rol === 'user'" class="d-flex justify-content-end mb-2">
                <div class="chat-bubble user-bubble">
                  <p class="mb-0 text-white">{{ msg.texto }}</p>
                </div>
              </div>
              <div v-else class="d-flex align-items-start gap-3">
                <div class="chat-avatar d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25 border border-success flex-shrink-0" style="width: 35px; height: 35px; margin-top: 4px;">
                  <span class="text-neon fw-bold" style="font-size: 0.8rem;">IA</span>
                </div>
                <div class="chat-bubble assistant-bubble">
                  <p class="mb-0 text-white" style="white-space: pre-line;">{{ msg.texto }}</p>
                </div>
              </div>
            </div>

            <div v-if="cargandoRespuesta" class="d-flex align-items-start gap-3">
              <div class="chat-avatar d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25 border border-success flex-shrink-0" style="width: 35px; height: 35px;">
                <span class="text-neon fw-bold" style="font-size: 0.8rem;">IA</span>
              </div>
              <div class="chat-bubble assistant-bubble">
                <div class="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 border-top border-secondary">
            <form @submit.prevent="enviarPregunta(preguntaActual)">
              <div class="input-group">
                <input
                  v-model="preguntaActual"
                  type="text"
                  class="form-control bg-transparent text-white border-secondary chat-input"
                  placeholder="Escribí tu pregunta sobre fútbol argentino..."
                  required
                >
                <button
                  class="btn btn-success rounded-end px-4 fw-bold"
                  type="submit"
                  :disabled="cargandoRespuesta || !preguntaActual.trim()"
                >
                  {{ cargandoRespuesta ? '...' : 'Enviar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { generarRespuesta } from '../services/iaChatService'
import { obtenerEquipos } from '../services/equiposService'
import { obtenerJugadores } from '../services/jugadoresService'
import { obtenerPartidos } from '../services/partidosService'
import { obtenerGoleadores, obtenerAsistidores, obtenerVallas } from '../services/estadisticasService'
import { obtenerZonaA, obtenerZonaB } from '../services/posicionesService'

const mensajes = ref([])
const preguntaActual = ref('')
const cargandoRespuesta = ref(false)
const chatContainer = ref(null)

const sugerencias = [
  '¿Quiénes son los goleadores?',
  '¿Qué equipo tiene más jugadores?',
  'Mostrame los próximos partidos',
  '¿Qué datos tenés sobre River Plate?',
  '¿Cuántos jugadores hay registrados?'
]

const contexto = ref({
  equipos: [],
  jugadores: [],
  partidos: [],
  estadisticas: { goleadores: [], asistidores: [], vallas: [] },
  posiciones: []
})

const cargarContexto = async () => {
  try {
    const jugadores = await obtenerJugadores()
    contexto.value.jugadores = jugadores
  } catch (e) {
    contexto.value.jugadores = []
  }
  contexto.value.equipos = obtenerEquipos()
  contexto.value.partidos = obtenerPartidos()
  contexto.value.estadisticas = {
    goleadores: obtenerGoleadores(),
    asistidores: obtenerAsistidores(),
    vallas: obtenerVallas()
  }
  contexto.value.posiciones = [...obtenerZonaA(), ...obtenerZonaB()]
}

const scrollAbajo = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const enviarPregunta = async (pregunta) => {
  if (!pregunta || !pregunta.trim()) return

  preguntaActual.value = pregunta
  mensajes.value.push({ rol: 'user', texto: pregunta })
  preguntaActual.value = ''
  cargandoRespuesta.value = true
  await scrollAbajo()

  try {
    const respuesta = await generarRespuesta(pregunta, contexto.value)
    mensajes.value.push({ rol: 'assistant', texto: respuesta })
  } catch (e) {
    mensajes.value.push({ rol: 'assistant', texto: 'Hubo un error al procesar tu pregunta. Intentalo de nuevo.' })
  } finally {
    cargandoRespuesta.value = false
    await scrollAbajo()
  }
}

onMounted(() => {
  cargarContexto()
})
</script>

<style scoped>
.chat-header {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 1rem 1rem 0 0;
}

.chat-messages {
  max-height: 450px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 250, 154, 0.3) transparent;
}

.chat-messages::-webkit-scrollbar {
  width: 5px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 250, 154, 0.3);
  border-radius: 3px;
}

.chat-bubble {
  max-width: 80%;
  padding: 0.8rem 1.2rem;
  border-radius: 1rem;
}

.user-bubble {
  background: rgba(0, 250, 154, 0.15);
  border: 1px solid rgba(0, 250, 154, 0.3);
  border-bottom-right-radius: 0.3rem;
}

.assistant-bubble {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 0.3rem;
}

.chat-input {
  transition: all 0.3s ease;
}

.chat-input:focus {
  box-shadow: 0 0 10px rgba(0, 250, 154, 0.3);
  border-color: #00fa9a !important;
  background: rgba(0, 250, 154, 0.05) !important;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #00fa9a;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 80%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.tracking-wide {
  letter-spacing: 2px;
}
</style>
