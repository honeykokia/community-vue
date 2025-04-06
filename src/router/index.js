import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Member from '@/views/Member.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import Dashboard from '@/views/Dashboard.vue'
import Overview from '@/components/dashboard/Overview.vue'
import Account from '@/components/dashboard/Account.vue'
import VerifyEmailSuccess from '@/views/VerifyEmailSuccess.vue'
import VerifyEmailFail from '@/views/VerifyEmailFail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    //   children:[
    //   {
    //     path: '',
    //     component: Advertise,
    //   },
    //   {
    //     path: 'login',
    //     name: 'login',
    //     component: Login,
    //   },
    //   {
    //     path: 'register',
    //     name: 'register',
    //     component: Register,
    //   },
    //   {
    //     path: 'member',
    //     name: 'member',
    //     component: Member,
    //   },
    //   {
    //     path: 'changePassword',
    //     name: 'changePassword',
    //     component: ChangePassword,
    //   }
    // ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/verifySuccess',
      name: 'verifySuccess',
      component: VerifyEmailSuccess,
    },
    {
      path: '/verifyFail',
      name: 'verifyFail',
      component: VerifyEmailFail,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/dashboard/',
          component: Account,
        },
        {
          path: '/dashboard/overview',
          name: 'overview',
          component: Overview,
        },
      ],
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword,
    }
  ],
})

export default router
