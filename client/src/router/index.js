import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Confirm from '@/components/Confirm'
import Workspace from '@/components/Workspace'
import Profile from '@/components/Profile'
import Contact from '@/components/Contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/confirm/:email',
      name: 'Confirm',
      component: Confirm
    },
    {
      path: '/workspace',
      name: 'Workspace',
      component: Workspace,
      children: [
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'contact',
          name: 'Contact',
          component: Contact
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
