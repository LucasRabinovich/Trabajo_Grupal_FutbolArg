const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const generarAnalisisJugadores = async (jugadores) => {
  if (!API_KEY || API_KEY === 'tu-api-key-de-gemini') {
    return obtenerAnalisisLocal(jugadores)
  }

  const prompt = `
Analiza los siguientes jugadores de fútbol argentino y genera:
1. El mejor jugador (mayor cantidad de goles)
2. El equipo con más jugadores registrados
3. Una recomendación táctica basada en los datos

Jugadores:
${JSON.stringify(jugadores, null, 2)}

Respondé en formato JSON con esta estructura:
{
  "mejorJugador": "nombre",
  "equipoDestacado": "nombre",
  "recomendacionTactica": "texto breve"
}
`

  try {
    const respuesta = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    if (!respuesta.ok) {
      throw new Error('Error en la API de Gemini')
    }

    const datos = await respuesta.json()
    const textoRespuesta = datos.candidates[0].content.parts[0].text
    const jsonLimpio = textoRespuesta.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    return JSON.parse(jsonLimpio)
  } catch (error) {
    console.error('Error al llamar a Gemini:', error)
    return obtenerAnalisisLocal(jugadores)
  }
}

const obtenerAnalisisLocal = (jugadores) => {
  if (!jugadores || jugadores.length === 0) {
    return {
      mejorJugador: 'Sin datos',
      equipoDestacado: 'Sin datos',
      recomendacionTactica: 'Registrá jugadores para obtener recomendaciones.'
    }
  }

  const mejorJugador = jugadores.reduce((mejor, actual) => {
    return (actual.goles || 0) > (mejor.goles || 0) ? actual : mejor
  }, jugadores[0])

  const equipos = {}
  jugadores.forEach(j => {
    equipos[j.equipo] = (equipos[j.equipo] || 0) + 1
  })
  const equipoDestacado = Object.entries(equipos).sort((a, b) => b[1] - a[1])[0]

  return {
    mejorJugador: `${mejorJugador.nombre} (${mejorJugador.goles || 0} goles)`,
    equipoDestacado: `${equipoDestacado[0]} (${equipoDestacado[1]} jugadores)`,
    recomendacionTactica: `Basado en los datos, ${equipoDestacado[0]} tiene la mayor cantidad de jugadores registrados (${equipoDestacado[1]}). Se recomienda reforzar las posiciones con menos cobertura.`
  }
}

export {
  generarAnalisisJugadores
}
