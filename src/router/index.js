import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Member from '@/views/Member.vue'
import ChangePassword from '@/views/ChangePassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[{
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
      },
      {
        path: 'member',
        name: 'member',
        component: Member,
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        component: ChangePassword,
      }
    ],
    },
  ],
})

export default router
