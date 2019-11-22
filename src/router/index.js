import Vue from 'vue'
import VueRouter from 'vue-router'
import Coopwire from '@/views/coopwire/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Coopwire'
      }
    },
    {
      path: '/coopwire',
      name: 'Coopwire',
      component: Coopwire
    }
  ]
})