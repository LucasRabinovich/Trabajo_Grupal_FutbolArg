const API_URL = 'https://v3.football.api-sports.io'

const headers = {
  'x-apisports-key': import.meta.env.VITE_API_FOOTBALL_KEY
}

const CACHE_DURACION = 24 * 60 * 60 * 1000

const obtenerConCache = async (clave, fnObtener) => {
  const cacheRaw = localStorage.getItem(`cache_${clave}`)
  let cache = null
  if (cacheRaw) {
    cache = JSON.parse(cacheRaw)
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURACION) {
    return cache.data
  }

  try {
    const data = await fnObtener()
    localStorage.setItem(`cache_${clave}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
    return data
  } catch (error) {
    if (cache) {
      return cache.data
    }
    throw error
  }
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
  return obtenerConCache('equipos', () =>
    obtenerDatosApi('/teams?league=128&season=2024', 'Error al obtener equipos')
  )
}

const obtenerFixturesLigaArgentina = async () => {
  return obtenerConCache('fixtures', () =>
    obtenerDatosApi('/fixtures?league=128&season=2024&next=15', 'Error al obtener partidos')
  )
}

const obtenerTablaLigaArgentina = async () => {
  return obtenerConCache('standings', () =>
    obtenerDatosApi('/standings?league=128&season=2024', 'Error al obtener tabla de posiciones')
  )
}

export {
  obtenerEquiposLigaArgentina,
  obtenerFixturesLigaArgentina,
  obtenerTablaLigaArgentina
}
