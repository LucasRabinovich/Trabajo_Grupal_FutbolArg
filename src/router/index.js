import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'partidos',
      component: () => import('../views/PartidosView.vue')
    },
    {
      path: '/equipos',
      name: 'equipos',
      component: () => import('../views/EquiposView.vue')
    },
    {
      path: '/posiciones',
      name: 'posiciones',
      component: () => import('../views/PosicionesView.vue')
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      component: () => import('../views/EstadisticasView.vue')
    },
    {
      path: '/mi-equipo',
      name: 'mi-equipo',
      component: () => import('../views/MiEquipoView.vue')
    }
  ]
})

export default router