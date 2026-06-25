const zonaA = [
  { id: 23, nombre: 'River Plate', puntos: 34, pj: 15, pg: 10, pe: 4, pp: 1, dif: 20 },
  { id: 16, nombre: 'Independiente', puntos: 31, pj: 15, pg: 9, pe: 4, pp: 2, dif: 13 },
  { id: 25, nombre: 'San Lorenzo', puntos: 29, pj: 15, pg: 8, pe: 5, pp: 2, dif: 10 },
  { id: 24, nombre: 'Rosario Central', puntos: 27, pj: 15, pg: 8, pe: 3, pp: 4, dif: 6 },
  { id: 11, nombre: 'Estudiantes de La Plata', puntos: 25, pj: 15, pg: 7, pe: 4, pp: 4, dif: 5 },
  { id: 27, nombre: 'Talleres (Córdoba)', puntos: 23, pj: 15, pg: 6, pe: 5, pp: 4, dif: 2 },
  { id: 2, nombre: 'Argentinos Juniors', puntos: 22, pj: 15, pg: 6, pe: 4, pp: 5, dif: 1 },
  { id: 4, nombre: 'Banfield', puntos: 20, pj: 15, pg: 5, pe: 5, pp: 5, dif: 0 },
  { id: 15, nombre: 'Huracán', puntos: 19, pj: 15, pg: 5, pe: 4, pp: 6, dif: -2 },
  { id: 18, nombre: 'Instituto', puntos: 18, pj: 15, pg: 5, pe: 3, pp: 7, dif: -3 },
  { id: 21, nombre: 'Platense', puntos: 17, pj: 15, pg: 4, pe: 5, pp: 6, dif: -4 },
  { id: 26, nombre: 'Sarmiento (Junín)', puntos: 16, pj: 15, pg: 4, pe: 4, pp: 7, dif: -6 },
  { id: 3, nombre: 'Atlético Tucumán', puntos: 15, pj: 15, pg: 4, pe: 3, pp: 8, dif: -8 },
  { id: 5, nombre: 'Barracas Central', puntos: 13, pj: 15, pg: 3, pe: 4, pp: 8, dif: -10 },
  { id: 10, nombre: 'Deportivo Riestra', puntos: 11, pj: 15, pg: 2, pe: 5, pp: 8, dif: -14 }
]

const zonaB = [
  { id: 7, nombre: 'Boca Juniors', puntos: 33, pj: 15, pg: 10, pe: 3, pp: 2, dif: 17 },
  { id: 22, nombre: 'Racing Club', puntos: 30, pj: 15, pg: 9, pe: 3, pp: 3, dif: 12 },
  { id: 6, nombre: 'Belgrano', puntos: 28, pj: 15, pg: 8, pe: 4, pp: 3, dif: 9 },
  { id: 20, nombre: "Newell's Old Boys", puntos: 26, pj: 15, pg: 7, pe: 5, pp: 3, dif: 7 },
  { id: 9, nombre: 'Defensa y Justicia', puntos: 24, pj: 15, pg: 7, pe: 3, pp: 5, dif: 3 },
  { id: 19, nombre: 'Lanús', puntos: 23, pj: 15, pg: 6, pe: 5, pp: 4, dif: 2 },
  { id: 28, nombre: 'Tigre', puntos: 21, pj: 15, pg: 6, pe: 3, pp: 6, dif: 0 },
  { id: 14, nombre: 'Gimnasia y Esgrima La Plata', puntos: 20, pj: 15, pg: 5, pe: 5, pp: 5, dif: -1 },
  { id: 29, nombre: 'Unión (Santa Fe)', puntos: 18, pj: 15, pg: 5, pe: 3, pp: 7, dif: -4 },
  { id: 30, nombre: 'Vélez Sarsfield', puntos: 17, pj: 15, pg: 4, pe: 5, pp: 6, dif: -5 },
  { id: 8, nombre: 'Central Córdoba (Santiago del Estero)', puntos: 16, pj: 15, pg: 4, pe: 4, pp: 7, dif: -6 },
  { id: 1, nombre: 'Aldosivi', puntos: 14, pj: 15, pg: 3, pe: 5, pp: 7, dif: -8 },
  { id: 17, nombre: 'Independiente Rivadavia', puntos: 13, pj: 15, pg: 3, pe: 4, pp: 8, dif: -10 },
  { id: 12, nombre: 'Estudiantes de Río Cuarto', puntos: 11, pj: 15, pg: 3, pe: 2, pp: 10, dif: -13 },
  { id: 13, nombre: 'Gimnasia y Esgrima (Mendoza)', puntos: 9, pj: 15, pg: 2, pe: 3, pp: 10, dif: -17 }
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