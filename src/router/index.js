import { createRouter, createWebHashHistory } from 'vue-router'
import PartidosView from '../views/PartidosView.vue'
import EquiposView from '../views/EquiposView.vue'
import PosicionesView from '../views/PosicionesView.vue'
import EstadisticasView from '../views/EstadisticasView.vue'
import MiEquipoView from '../views/MiEquipoView.vue'
import LoginView from '../views/LoginView.vue'
import JugadoresView from '../views/JugadoresView.vue'
import AdminJugadoresView from '../views/AdminJugadoresView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import AdminUsuariosView from '../views/AdminUsuariosView.vue'
import IAPreguntasView from '../views/IAPreguntasView.vue'
import MiPerfilView from '../views/MiPerfilView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/jugadores',
      name: 'jugadores',
      component: JugadoresView
    },
    {
      path: '/ia-preguntas',
      name: 'ia-preguntas',
      component: IAPreguntasView
    },
    {
      path: '/mi-perfil',
      name: 'mi-perfil',
      component: MiPerfilView
    },
    {
      path: '/admin/jugadores',
      name: 'admin-jugadores',
      component: AdminJugadoresView,
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/usuarios',
      name: 'admin-usuarios',
      component: AdminUsuariosView,
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView,
      meta: { requiresAdmin: true }
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
  } else if (to.meta.requiresAdmin && usuarioLogueado !== null) {
    const usuario = JSON.parse(usuarioLogueado)
    if (usuario.rol !== 'admin') {
      rutaDestino = { name: 'partidos' }
    }
  }

  return rutaDestino
})

export default router