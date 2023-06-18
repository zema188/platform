import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SigupView from '@/views/SigupView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import MeView from '@/views/MeView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        requiresUnAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SigupView,
      meta: {
        requiresUnAuth: true
      }
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: ScheduleView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/me',
      name: 'Me',
      component: MeView,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject  
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next()
    } else {
      next('/login')
    }
  } 
  if (to.matched.some((record) => record.meta.requiresUnAuth)) {
    if(await getCurrentUser()) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
