const API_URL = 'https://v3.football.api-sports.io'

const headers = {
  'x-apisports-key': import.meta.env.VITE_API_FOOTBALL_KEY
}

const obtenerEquiposLigaArgentina = async () => {
  const respuesta = await fetch(`${API_URL}/teams?league=128&season=2024`, {
    headers
  })

  const datos = await respuesta.json()

  if (!respuesta.ok || datos.errors.length > 0) {
    throw new Error('Error al obtener equipos de API-Football')
  }

  return datos.response
}

export {
  obtenerEquiposLigaArgentina
}