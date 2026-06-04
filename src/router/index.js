import { createRouter, createWebHistory } from 'vue-router'
import PartidosView from '../views/PartidosView.vue'
import EquiposView from '../views/EquiposView.vue'
import PosicionesView from '../views/PosicionesView.vue'
import EstadisticasView from '../views/EstadisticasView.vue'
import MiEquipoView from '../views/MiEquipoView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'partidos',
      component: PartidosView
    },
    {
      path: '/equipos',
      name: 'equipos',
      component: EquiposView
    },
    {
      path: '/posiciones',
      name: 'posiciones',
      component: PosicionesView
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      component: EstadisticasView
    },
    {
      path: '/mi-equipo',
      name: 'mi-equipo',
      component: MiEquipoView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from) => {
  let rutaDestino = true
  const usuarioLogueado = localStorage.getItem('usuarioLogueado')

  if (to.name !== 'login' && usuarioLogueado === null) {
    rutaDestino = { name: 'login' }
  } else if (to.name === 'login' && usuarioLogueado !== null) {
    rutaDestino = { name: 'partidos' }
  }

  return rutaDestino
})

export default router