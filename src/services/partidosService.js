import { partidos } from '../data/partidos'

const formatearFecha = (fechaApi) => {
  const fecha = new Date(fechaApi)

  return fecha.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
}

const formatearHora = (fechaApi) => {
  const fecha = new Date(fechaApi)

  return fecha.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const adaptarPartidoApi = (partidoApi) => {
  return {
    id: partidoApi.fixture.id,
    local: partidoApi.teams.home.name,
    visitante: partidoApi.teams.away.name,
    fecha: formatearFecha(partidoApi.fixture.date),
    hora: formatearHora(partidoApi.fixture.date),
    estadio: partidoApi.fixture.venue?.name || 'Estadio no disponible',
    estado: partidoApi.fixture.status.long
  }
}

const obtenerPartidos = () => {
  return partidos
}

const obtenerPartidosApi = (partidosApi) => {
  const partidosNoIniciados = partidosApi.filter((partidoApi) => {
    return partidoApi.fixture.status.short === 'NS'
  })

  const partidosDisponibles =
    partidosNoIniciados.length > 0
      ? partidosNoIniciados
      : partidosApi

  return partidosDisponibles
    .slice(0, 15)
    .map((partidoApi) => {
      return adaptarPartidoApi(partidoApi)
    })
}

const obtenerPartidosPorEquipo = (nombreEquipo) => {
  return partidos.filter((partido) => {
    return partido.local === nombreEquipo || partido.visitante === nombreEquipo
  })
}

export {
  obtenerPartidos,
  obtenerPartidosApi,
  obtenerPartidosPorEquipo
}