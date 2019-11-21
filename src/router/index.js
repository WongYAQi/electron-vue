import Vue from 'vue'
import VueRouter from 'vue-router'
import Coopwire from '@/views/coopwire/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/coopwire',
      component: Coopwire
    }
  ]
})