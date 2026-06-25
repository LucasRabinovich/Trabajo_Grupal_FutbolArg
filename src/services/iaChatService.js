const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const generarRespuesta = async (pregunta, contexto) => {
  let respuestaFinal = ''

  if (!API_KEY || API_KEY === 'tu-api-key-de-gemini') {
    respuestaFinal = obtenerRespuestaLocal(pregunta, contexto)
  } else {
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
      respuestaFinal = datos.candidates[0].content.parts[0].text
    } catch (error) {
      console.error(error)
      respuestaFinal = obtenerRespuestaLocal(pregunta, contexto)
    }
  }

  return respuestaFinal
}

const obtenerRespuestaLocal = (pregunta, contexto) => {
  let respuestaLocal = 'No tengo una respuesta específica para esa consulta. Podés preguntarme sobre goleadores, jugadores, equipos, partidos o la tabla de posiciones.'
  const p = pregunta.toLowerCase()

  if (p.includes('qué equipos') || p.includes('que equipos') || p.includes('equipos hay') || p.includes('equipos registrados') || p.includes('lista de equipos')) {
    const equipos = contexto.equipos || []
    if (equipos.length > 0) {
      respuestaLocal = `Los equipos registrados en el sistema son:\n${equipos.map((equipo) => `• ${equipo.nombre}`).join('\n')}`
    } else {
      respuestaLocal = 'No hay equipos registrados disponibles.'
    }
  } else if (p.includes('goleador') || p.includes('maximo') || p.includes('más goles')) {
    const top = [...(contexto.jugadores || [])].sort((a, b) => (b.goles || 0) - (a.goles || 0)).slice(0, 3)
    if (top.length > 0) {
      respuestaLocal = `Los máximos goleadores registrados son:\n${top.map((j, i) => `${i + 1}. ${j.nombre} (${j.equipo}) - ${j.goles} goles`).join('\n')}`
    } else {
      const goleadores = contexto.estadisticas?.goleadores
      if (goleadores && goleadores.length > 0) {
        respuestaLocal = `Los máximos goleadores del torneo:\n${goleadores.map((j, i) => `${i + 1}. ${j.jugador} (${j.equipo}) - ${j.cantidad} goles`).join('\n')}`
      } else {
        respuestaLocal = 'No hay datos de goleadores disponibles.'
      }
    }
  } else if (p.includes('equipo') && (p.includes('más') || p.includes('jugadore'))) {
    const equipos = {}
    ;(contexto.jugadores || []).forEach((j) => {
      equipos[j.equipo] = (equipos[j.equipo] || 0) + 1
    })
    const entries = Object.entries(equipos).sort((a, b) => b[1] - a[1])
    if (entries.length > 0) {
      respuestaLocal = `Cantidad de jugadores por equipo:\n${entries.map(([eq, cant]) => `• ${eq}: ${cant} jugadores`).join('\n')}`
    }
  } else if (p.includes('partido') || p.includes('proximo') || p.includes('fecha')) {
    const partidos = contexto.partidos || []
    if (partidos.length > 0) {
      respuestaLocal = `Próximos partidos:\n${partidos.slice(0, 5).map((partido) => `• ${partido.local} vs ${partido.visitante} - ${partido.fecha} ${partido.hora}`).join('\n')}`
    } else {
      respuestaLocal = 'No hay partidos disponibles.'
    }
  } else if (p.includes('posicion') || p.includes('tabla') || p.includes('puntos')) {
    respuestaLocal = 'Los datos de posiciones están disponibles en la sección Posiciones del menú.'
  } else if (p.includes('river plate') || p.includes('river') || p.includes('datos tenés sobre river')) {
    const riverPosicion = (contexto.posiciones || []).find(pos => pos.equipo && pos.equipo.toLowerCase().includes('river'))
    const jugadoresRiver = (contexto.jugadores || []).filter(j => j.equipo && j.equipo.toLowerCase().includes('river'))
    
    if (riverPosicion || jugadoresRiver.length > 0) {
      let detalle = 'Tengo registrado a River Plate, que hace de local en el Mâs Monumental.'
      
      if (riverPosicion) {
        detalle += ` En el torneo se encuentra con ${riverPosicion.puntos || 0} puntos.`
      }
      
      detalle += ` Actualmente hay ${jugadoresRiver.length} jugadores de River cargados en el sistema.`
      
      if (jugadoresRiver.length > 0) {
        const goleador = [...jugadoresRiver].sort((a, b) => (b.goles || 0) - (a.goles || 0))[0]
        const arquero = jugadoresRiver.find(j => j.posicion && j.posicion.toLowerCase() === 'arquero')
        
        if (goleador && (goleador.goles || 0) > 0) {
          detalle += ` Su goleador destacado es ${goleador.nombre} con ${goleador.goles} tantos.`
        }
        if (arquero) {
          detalle += ` El arco está defendido por ${arquero.nombre}.`
        }
      }
      respuestaLocal = detalle
    } else {
      respuestaLocal = 'Por el momento no tengo datos detallados sobre River Plate en el sistema.'
    }
  } else if (p.includes('cuántos jugadores') || p.includes('cuantos jugadores') || p.includes('jugadores hay registrados')) {
    const totalJugadores = (contexto.jugadores || []).length
    respuestaLocal = `Actualmente contamos con un total de ${totalJugadores} jugadores registrados en toda la base de datos.`
  } else if (p.includes('quién es') || p.includes('información') || p.includes('datos')) {
    const nombreBuscado = p.replace(/quién es|información de|datos de|sobre/gi, '').trim()
    const jugador = (contexto.jugadores || []).find((j) => j.nombre?.toLowerCase().includes(nombreBuscado) || nombreBuscado.includes(j.nombre?.toLowerCase()))
    if (jugador) {
      respuestaLocal = `${jugador.nombre} - ${jugador.posicion} de ${jugador.equipo}. Edad: ${jugador.edad || 'N/D'}, Nacionalidad: ${jugador.nacionalidad || 'Argentina'}. Estadísticas: ${jugador.goles || 0} goles, ${jugador.asistencias || 0} asistencias en ${jugador.partidos || 0} partidos.`
    }
  } else if (p.includes('hola') || p.includes('buen') || p.includes('que tal')) {
    respuestaLocal = '¡Hola! Soy el asistente virtual de DataGol. Puedo ayudarte con información sobre jugadores, equipos, partidos, goleadores y más. ¿Qué querés saber?'
  }

  return respuestaLocal
}

export {
  generarRespuesta
}