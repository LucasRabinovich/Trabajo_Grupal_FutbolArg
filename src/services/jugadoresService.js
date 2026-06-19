import axios from 'axios'

const API_URL = import.meta.env.VITE_MOCKAPI_URL || 'https://tu-proyecto.mockapi.io/api/v1'

const cliente = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

const getId = (jugador) => {
  return jugador.id || jugador.jugadores
}

const normalizar = (jugador) => {
  if (!jugador.id) {
    jugador.id = jugador.jugadores
  }
  return jugador
}

const obtenerJugadores = async () => {
  const respuesta = await cliente.get('/jugadores')
  return (respuesta.data || []).map(normalizar)
}

const obtenerJugadorPorId = async (id) => {
  const respuesta = await cliente.get(`/jugadores/${id}`)
  return normalizar(respuesta.data)
}

const crearJugador = async (jugador) => {
  const respuesta = await cliente.post('/jugadores', jugador)
  return normalizar(respuesta.data)
}

const actualizarJugador = async (id, jugador) => {
  const respuesta = await cliente.put(`/jugadores/${id}`, jugador)
  return normalizar(respuesta.data)
}

const eliminarJugador = async (id) => {
  const respuesta = await cliente.delete(`/jugadores/${id}`)
  return normalizar(respuesta.data)
}

export {
  obtenerJugadores,
  obtenerJugadorPorId,
  crearJugador,
  actualizarJugador,
  eliminarJugador
}
