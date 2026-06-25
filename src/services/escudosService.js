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

const escudosLocales = {
  'Aldosivi': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Escudo_de_Aldosivi.svg',
  'Argentinos Juniors': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Escudo_AAArgentinosJrs.svg',
  'Atlético Tucumán': 'https://upload.wikimedia.org/wikipedia/commons/8/85/Atl%C3%A9tico_Tucum%C3%A1n_escudo.svg',
  'Banfield': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Club_Atl%C3%A9tico_Banfield.svg',
  'Barracas Central': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Barracas_Central.svg',
  'Belgrano': 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Club_Atl%C3%A9tico_Belgrano.svg',
  'Boca Juniors': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Boca_Juniors_logo18.svg/120px-Boca_Juniors_logo18.svg.png',
  'Central Córdoba (Santiago del Estero)': 'https://upload.wikimedia.org/wikipedia/commons/4/43/Escudo_de_Central_C%C3%B3rdoba.svg',
  'Defensa y Justicia': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Club_Defensa_y_Justicia.svg',
  'Deportivo Riestra': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Deportivo_Riestra.svg',
  'Estudiantes de La Plata': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Estudiantes_de_La_Plata_logo.svg/120px-Estudiantes_de_La_Plata_logo.svg.png',
  'Estudiantes de Río Cuarto': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Escudo_estudiantes_rio_cuarto.svg',
  'Gimnasia y Esgrima (Mendoza)': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Gimnasia_y_Esgrima_Mendoza.svg',
  'Gimnasia y Esgrima La Plata': 'https://upload.wikimedia.org/wikipedia/commons/5/51/Escudo_del_Club_de_Gimnasia_y_Esgrima_La_Plata.svg',
  'Huracán': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Club_Atl%C3%A9tico_Hurac%C3%A1n.svg',
  'Independiente': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Escudo_del_Club_Atl%C3%A9tico_Independiente.svg/120px-Escudo_del_Club_Atl%C3%A9tico_Independiente.svg.png',
  'Independiente Rivadavia': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Independiente_Rivadavia.svg',
  'Instituto': 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Instituto_ACC.svg',
  'Lanús': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Club_Atl%C3%A9tico_Lan%C3%BAs.svg',
  "Newell's Old Boys": 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Newells_Old_Boys_logo.svg',
  'Platense': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Club_Atl%C3%A9tico_Platense.svg',
  'Racing Club': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Escudo_de_Racing_Club_%282014%29.svg/120px-Escudo_de_Racing_Club_%282014%29.svg.png',
  'River Plate': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_River_Plate.png/120px-Logo_River_Plate.png',
  'Rosario Central': 'https://upload.wikimedia.org/wikipedia/commons/4/43/Escudo_de_Rosario_Central.svg',
  'San Lorenzo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/San_Lorenzo_de_Almagro_logo.svg/120px-San_Lorenzo_de_Almagro_logo.svg.png',
  'Sarmiento (Junín)': 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Sarmiento_Junin.svg',
  'Talleres (Córdoba)': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Club_Atl%C3%A9tico_Talleres.svg',
  'Tigre': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Club_Atl%C3%A9tico_Tigre.svg',
  'Unión (Santa Fe)': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Club_Atl%C3%A9tico_Uni%C3%B3n.svg',
  'Vélez Sarsfield': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg'
}

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
  return logos[nombreApi] || escudosLocales[nombreEquipo] || null
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