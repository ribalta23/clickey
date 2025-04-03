import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import { supabase } from '@/supabase'

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: Home,
        meta: {
            title: 'Inicio'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: 'Mi Perfil',
            requiresAuth: true
        }
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? `ClicKey - ${to.meta.title}` : 'ClicKey'
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
