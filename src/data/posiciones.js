const baseStats = { puntos: 0, pj: 0, pg: 0, pe: 0, pp: 0, dif: 0 }

const zonaA = [
  { id: 23, nombre: 'River Plate', ...baseStats },
  { id: 16, nombre: 'Independiente', ...baseStats },
  { id: 25, nombre: 'San Lorenzo', ...baseStats },
  { id: 24, nombre: 'Rosario Central', ...baseStats },
  { id: 11, nombre: 'Estudiantes de La Plata', ...baseStats },
  { id: 27, nombre: 'Talleres (Córdoba)', ...baseStats },
  { id: 2, nombre: 'Argentinos Juniors', ...baseStats },
  { id: 4, nombre: 'Banfield', ...baseStats },
  { id: 15, nombre: 'Huracán', ...baseStats },
  { id: 18, nombre: 'Instituto', ...baseStats },
  { id: 21, nombre: 'Platense', ...baseStats },
  { id: 26, nombre: 'Sarmiento (Junín)', ...baseStats },
  { id: 3, nombre: 'Atlético Tucumán', ...baseStats },
  { id: 5, nombre: 'Barracas Central', ...baseStats },
  { id: 10, nombre: 'Deportivo Riestra', ...baseStats }
]

const zonaB = [
  { id: 7, nombre: 'Boca Juniors', ...baseStats },
  { id: 22, nombre: 'Racing Club', ...baseStats },
  { id: 6, nombre: 'Belgrano', ...baseStats },
  { id: 20, nombre: "Newell's Old Boys", ...baseStats },
  { id: 9, nombre: 'Defensa y Justicia', ...baseStats },
  { id: 19, nombre: 'Lanús', ...baseStats },
  { id: 28, nombre: 'Tigre', ...baseStats },
  { id: 14, nombre: 'Gimnasia y Esgrima La Plata', ...baseStats },
  { id: 29, nombre: 'Unión (Santa Fe)', ...baseStats },
  { id: 30, nombre: 'Vélez Sarsfield', ...baseStats },
  { id: 8, nombre: 'Central Córdoba (Santiago del Estero)', ...baseStats },
  { id: 1, nombre: 'Aldosivi', ...baseStats },
  { id: 17, nombre: 'Independiente Rivadavia', ...baseStats },
  { id: 12, nombre: 'Estudiantes de Río Cuarto', ...baseStats },
  { id: 13, nombre: 'Gimnasia y Esgrima (Mendoza)', ...baseStats }
]

const libertadores = [
  { id: 100, nombre: 'Boca Juniors', puntos: 9, pj: 3, pg: 3, pe: 0, pp: 0, dif: 5 },
  { id: 101, nombre: 'Palmeiras', puntos: 6, pj: 3, pg: 2, pe: 0, pp: 1, dif: 2 },
  { id: 102, nombre: 'Colo Colo', puntos: 3, pj: 3, pg: 1, pe: 0, pp: 2, dif: -1 },
  { id: 103, nombre: 'Alianza Lima', puntos: 0, pj: 3, pg: 0, pe: 0, pp: 3, dif: -6 }
]

const sudamericana = [
  { id: 200, nombre: 'River Plate', puntos: 7, pj: 3, pg: 2, pe: 1, pp: 0, dif: 4 },
  { id: 201, nombre: 'LDU Quito', puntos: 5, pj: 3, pg: 1, pe: 2, pp: 0, dif: 1 },
  { id: 202, nombre: 'Peñarol', puntos: 4, pj: 3, pg: 1, pe: 1, pp: 1, dif: 0 },
  { id: 203, nombre: 'Nacional', puntos: 0, pj: 3, pg: 0, pe: 0, pp: 3, dif: -5 }
]

export {
  zonaA,
  zonaB,
  libertadores,
  sudamericana
}