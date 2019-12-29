import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import '../node_modules/xterm/css/xterm.css';

new Vue({
    render: h => h(App),
    router
}).$mount('#app')