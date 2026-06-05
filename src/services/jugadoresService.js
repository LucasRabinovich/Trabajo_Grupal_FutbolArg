import axios from 'axios'

const API_URL = import.meta.env.VITE_MOCKAPI_URL || 'https://tu-proyecto.mockapi.io/api/v1'

const cliente = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

const obtenerJugadores = async () => {
  const respuesta = await cliente.get('/jugadores')
  return respuesta.data
}

const obtenerJugadorPorId = async (id) => {
  const respuesta = await cliente.get(`/jugadores/${id}`)
  return respuesta.data
}

const crearJugador = async (jugador) => {
  const respuesta = await cliente.post('/jugadores', jugador)
  return respuesta.data
}

const actualizarJugador = async (id, jugador) => {
  const respuesta = await cliente.put(`/jugadores/${id}`, jugador)
  return respuesta.data
}

const eliminarJugador = async (id) => {
  const respuesta = await cliente.delete(`/jugadores/${id}`)
  return respuesta.data
}

export {
  obtenerJugadores,
  obtenerJugadorPorId,
  crearJugador,
  actualizarJugador,
  eliminarJugador
}
