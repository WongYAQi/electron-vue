import Vue from 'vue'
import App from './App.vue'
import router from './script/router/index.ts'
import './style/color.less'
import './style/common.less'
import './assets/iconfont/iconfont.css'
import Base from '@/components/Base/index'
import '@/components/Base/style/index.less'

Vue.use(Base)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
