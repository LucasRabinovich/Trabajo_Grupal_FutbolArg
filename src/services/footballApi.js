const API_URL = 'https://v3.football.api-sports.io'

const headers = {
  'x-apisports-key': import.meta.env.VITE_API_FOOTBALL_KEY
}

const obtenerDatosApi = async (endpoint, mensajeError) => {
  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    headers
  })

  const datos = await respuesta.json()

  if (!respuesta.ok) {
    throw new Error(mensajeError)
  }

  return datos.response
}

const obtenerEquiposLigaArgentina = async () => {
  return obtenerDatosApi(
    '/teams?league=128&season=2024',
    'Error al obtener equipos'
  )
}

const obtenerFixturesLigaArgentina = async () => {
  return obtenerDatosApi(
    '/fixtures?league=128&season=2024',
    'Error al obtener partidos'
  )
}

const obtenerTablaLigaArgentina = async () => {
  return obtenerDatosApi(
    '/standings?league=128&season=2024',
    'Error al obtener tabla de posiciones'
  )
}

export {
  obtenerEquiposLigaArgentina,
  obtenerFixturesLigaArgentina,
  obtenerTablaLigaArgentina
}