import EButton from './src/button.vue'

EButton.install = function (Vue) {
  Vue.component(EButton.name, EButton)
}

export default EButton