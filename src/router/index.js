import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard.js'
import Home from '@/components/Home.vue'
import Ad from '@/components/Ads/Ad.vue'
import AdList from '@/components/Ads/AdList.vue'
import NewAd from '@/components/Ads/NewAd.vue'
import Login from '@/components/Auth/Login.vue'
import Registration from '@/components/Auth/Registration.vue'
import Orders from '@/components/User/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ad/:id',
    name: 'ad',
    props: true,
    component: Ad
  },
  {
    path: '/list',
    name: 'list',
    component: AdList,
    beforeEnter: AuthGuard
  },
  {
    path: '/new',
    name: 'newAd',
    component: NewAd,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Registration
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
