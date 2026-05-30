const equivalenciasApi = {
  'Argentinos Juniors': 'Argentinos JRS',
  'Atlético Tucumán': 'Atletico Tucuman',
  'Belgrano': 'Belgrano Cordoba',
  'Unión (Santa Fe)': 'Union Santa Fe',
  'Defensa y Justicia': 'Defensa Y Justicia',
  'Huracán': 'Huracan',
  'Lanús': 'Lanus',
  'Estudiantes de La Plata': 'Estudiantes L.P.',
  'Talleres (Córdoba)': 'Talleres Cordoba',
  "Newell's Old Boys": 'Newells Old Boys',
  'Independiente Rivadavia': 'Indep. Rivadavia',
  'Sarmiento (Junín)': 'Sarmiento Junin',
  'Instituto': 'Instituto Cordoba',
  'Central Córdoba (Santiago del Estero)': 'Central Cordoba de Santiago',
  'Gimnasia y Esgrima La Plata': 'Gimnasia L.P.',
  'Vélez Sarsfield': 'Velez Sarsfield'
}

const ESCUDO_DEFAULT = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

const obtenerNombreApi = (nombreEquipo) => {
  return equivalenciasApi[nombreEquipo] || nombreEquipo
}

const crearMapaLogos = (equiposApi) => {
  const logos = {}

  equiposApi.forEach(({ team }) => {
    logos[team.name] = team.logo
  })

  return logos
}

const obtenerLogoEquipo = (logos, nombreEquipo) => {
  const nombreApi = obtenerNombreApi(nombreEquipo)

  return logos[nombreApi] || null
}

const obtenerEscudoDefault = () => {
  return ESCUDO_DEFAULT
}

const obtenerEscudoDesdeMapa = (logos, nombreEquipo) => {
  return obtenerLogoEquipo(logos, nombreEquipo) || obtenerEscudoDefault()
}

export {
  obtenerNombreApi,
  crearMapaLogos,
  obtenerLogoEquipo,
  obtenerEscudoDefault,
  obtenerEscudoDesdeMapa
}