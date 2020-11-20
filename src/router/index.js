import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Auth from '../views/auth'

import dashboardChildren from "./dashboard-children";
import authChildren from "./auth-children";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/dashboard',
    children: dashboardChildren
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: '/auth/login',
    children: authChildren
  }
]

export default new VueRouter({
  routes
})
