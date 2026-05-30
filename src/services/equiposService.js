import { equiposLocales } from '../data/equipos'

const obtenerEquipos = () => {
  return equiposLocales
}

const obtenerEquipoPorNombre = (nombre) => {
  return equiposLocales.find((equipo) => {
    return equipo.nombre === nombre
  })
}

export {
  obtenerEquipos,
  obtenerEquipoPorNombre
}