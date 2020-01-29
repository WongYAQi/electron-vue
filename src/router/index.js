import Vue from 'vue'
import VueRouter from 'vue-router'
import Coopwire from '@/views/Coopwire/index.vue'
import Mock from '@/views/Mock/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
  history: true,
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
    }, {
      path: '/mock',
      name: 'Mock',
      component: Mock
    }
  ]
})
