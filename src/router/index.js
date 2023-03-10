// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Dashboard from '../views/DashboardView.vue'

import StudentView from '../components/siswa/StudentView.vue'
import TambahSiswa from '../components/siswa/TambahSiswa.vue'
import EditSiswa from '../components/siswa/EditSiswa.vue'

import BookView from '../components/buku/BookView.vue'
import TambahBuku from '../components/buku/TambahBuku.vue'

import TransactionView from '../components/peminjaman/TransactionView.vue'
import HistoryView from '../components/peminjaman/HistoryView.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(require('vue-moment'))

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard
  },

// SISWA
  {
    name: 'StudentView',
    path: '/Student',
    component: StudentView
  },
  {
    name: 'TambahSiswa',
    path: '/Student/Create',
    component: TambahSiswa
  },
  {
    name : 'EditSiswa',
    path : '/editsiswa/:id',
    component : EditSiswa
  },

// BUKU
  {
    name: 'BookView',
    path: '/Book',
    component: BookView
  },
  {
    name: 'TambahBuku',
    path: '/Book/Create',
    component: TambahBuku
  },

// TRANSAKSI
  {
    name: 'HistoryView',
    path: '/Transaction',
    component: HistoryView
  },
  {
    name: 'TransactionView',
    path: '/Transaction/Borrow',
    component: TransactionView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router