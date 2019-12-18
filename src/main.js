import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/xterm/css/xterm.css';
Vue.use(ElementUI);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')