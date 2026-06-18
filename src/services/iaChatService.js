const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const generarRespuesta = async (pregunta, contexto) => {
  if (!API_KEY || API_KEY === 'tu-api-key-de-gemini') {
    return obtenerRespuestaLocal(pregunta, contexto)
  }

  const prompt = `
Sos un asistente experto en fútbol argentino. Respondé preguntas basándote en estos datos:

EQUIPOS:
${JSON.stringify(contexto.equipos || [], null, 2)}

JUGADORES:
${JSON.stringify(contexto.jugadores || [], null, 2)}

PARTIDOS:
${JSON.stringify(contexto.partidos || [], null, 2)}

ESTADÍSTICAS (goleadores, asistencias, vallas):
${JSON.stringify(contexto.estadisticas || [], null, 2)}

POSICIONES (tabla):
${JSON.stringify(contexto.posiciones || [], null, 2)}

Pregunta del usuario: "${pregunta}"

Respondé de forma clara, breve y en español.
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
      throw new Error('Error en Gemini')
    }

    const datos = await respuesta.json()

    return datos.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Error al llamar a Gemini:', error)

    return obtenerRespuestaLocal(pregunta, contexto)
  }
}

const obtenerRespuestaLocal = (pregunta, contexto) => {
  const p = pregunta.toLowerCase()

  if (
    p.includes('qué equipos') ||
    p.includes('que equipos') ||
    p.includes('equipos hay') ||
    p.includes('equipos registrados') ||
    p.includes('lista de equipos')
  ) {
    const equipos = contexto.equipos || []

    if (equipos.length > 0) {
      return `Los equipos registrados en el sistema son:\n${equipos
        .map((equipo) => {
          return `• ${equipo.nombre}`
        })
        .join('\n')}`
    }

    return 'No hay equipos registrados disponibles.'
  }

  if (p.includes('goleador') || p.includes('maximo') || p.includes('más goles')) {
    const top = [...(contexto.jugadores || [])]
      .sort((a, b) => {
        return (b.goles || 0) - (a.goles || 0)
      })
      .slice(0, 3)

    if (top.length > 0) {
      return `Los máximos goleadores registrados son:\n${top
        .map((j, i) => {
          return `${i + 1}. ${j.nombre} (${j.equipo}) - ${j.goles} goles`
        })
        .join('\n')}`
    }

    const goleadores = contexto.estadisticas?.goleadores

    if (goleadores && goleadores.length > 0) {
      return `Los máximos goleadores del torneo:\n${goleadores
        .map((j, i) => {
          return `${i + 1}. ${j.jugador} (${j.equipo}) - ${j.cantidad} goles`
        })
        .join('\n')}`
    }

    return 'No hay datos de goleadores disponibles.'
  }

  if (p.includes('equipo') && (p.includes('más') || p.includes('jugadore'))) {
    const equipos = {}

    ;(contexto.jugadores || []).forEach((j) => {
      equipos[j.equipo] = (equipos[j.equipo] || 0) + 1
    })

    const entries = Object.entries(equipos).sort((a, b) => {
      return b[1] - a[1]
    })

    if (entries.length > 0) {
      return `Cantidad de jugadores por equipo:\n${entries
        .map(([eq, cant]) => {
          return `• ${eq}: ${cant} jugadores`
        })
        .join('\n')}`
    }
  }

  if (p.includes('partido') || p.includes('proximo') || p.includes('fecha')) {
    const partidos = contexto.partidos || []

    if (partidos.length > 0) {
      return `Próximos partidos:\n${partidos
        .slice(0, 5)
        .map((partido) => {
          return `• ${partido.local} vs ${partido.visitante} - ${partido.fecha} ${partido.hora}`
        })
        .join('\n')}`
    }

    return 'No hay partidos disponibles.'
  }

  if (p.includes('posicion') || p.includes('tabla') || p.includes('puntos')) {
    return 'Los datos de posiciones están disponibles en la sección Posiciones del menú.'
  }

  if (p.includes('quién es') || p.includes('información') || p.includes('datos')) {
    const nombreBuscado = p.replace(/quién es|información de|datos de|sobre/gi, '').trim()

    const jugador = (contexto.jugadores || []).find((j) => {
      return (
        j.nombre?.toLowerCase().includes(nombreBuscado) ||
        nombreBuscado.includes(j.nombre?.toLowerCase())
      )
    })

    if (jugador) {
      return `${jugador.nombre} - ${jugador.posicion} de ${jugador.equipo}. Edad: ${jugador.edad || 'N/D'}, Nacionalidad: ${jugador.nacionalidad || 'Argentina'}. Estadísticas: ${jugador.goles || 0} goles, ${jugador.asistencias || 0} asistencias en ${jugador.partidos || 0} partidos.`
    }
  }

  if (p.includes('hola') || p.includes('buen') || p.includes('que tal')) {
    return '¡Hola! Soy el asistente virtual de DataGol. Puedo ayudarte con información sobre jugadores, equipos, partidos, goleadores y más. ¿Qué querés saber?'
  }

  return 'No tengo una respuesta específica para esa consulta. Podés preguntarme sobre goleadores, jugadores, equipos, partidos o la tabla de posiciones.'
}

export {
  generarRespuesta
}
