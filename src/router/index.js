import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Coba from '../views/Coba.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import PesananSuccess from '../views/PesananSuccess.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: FoodDetail
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang  
  },
  {
    path: '/pesanan-success',
    name: 'PesananSuccess',
    component: PesananSuccess  
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
