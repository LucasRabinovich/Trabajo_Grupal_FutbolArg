import { partidos } from '../data/partidos'

const obtenerPartidos = () => {
  return partidos
}

const obtenerPartidosPorEquipo = (nombreEquipo) => {
  return partidos.filter((partido) => {
    return partido.local === nombreEquipo || partido.visitante === nombreEquipo
  })
}

export {
  obtenerPartidos,
  obtenerPartidosPorEquipo
}