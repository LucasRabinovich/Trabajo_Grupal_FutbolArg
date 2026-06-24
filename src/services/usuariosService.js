import axios from 'axios'

const API_URL = import.meta.env.VITE_MOCKAPI_URL || 'https://tu-proyecto.mockapi.io/api/v1'

const cliente = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

const normalizar = (usuario) => {
  if (!usuario.id) {
    usuario.id = usuario.usuarios
  }
  return usuario
}

const obtenerUsuarios = async () => {
  const respuesta = await cliente.get('/usuarios')
  return (respuesta.data || []).map(normalizar)
}

const crearUsuario = async (usuario) => {
  const respuesta = await cliente.post('/usuarios', usuario)
  return normalizar(respuesta.data)
}

const eliminarUsuario = async (id) => {
  const respuesta = await cliente.delete(`/usuarios/${id}`)
  return normalizar(respuesta.data)
}

const actualizarUsuario = async (id, datos) => {
  const respuesta = await cliente.put(`/usuarios/${id}`, datos)
  return normalizar(respuesta.data)
}

export {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario
}