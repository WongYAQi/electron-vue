import Vue from 'vue'
import VueRouter from 'vue-router'
import Coopwire from '@/views/coopwire/index.vue'
import Mock from '@/views/Mock/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/coopwire' },
        {
            path: '/coopwire',
            name: 'coopwire',
            component: Coopwire
        },
        {
            path: '/mock',
            name: 'mock',
            component: Mock
        }
    ]
})
