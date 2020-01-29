import Vue from 'vue'
import App from './App.vue'
import router from './script/router/index.ts'
import './style/color.less'
// import '../node_modules/xterm/css/xterm.css';
import './style/common.less'
import './assets/iconfont/iconfont.css'

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
