import EButton from './button/index.js'
import EInput from './input/index.js'
import EMenu from './menu/index.js'
import EMenuItem from './menu-item/index'
import EOption from './option/index'
import ESection from './section/index'
import ESelect from './select/index'
import ETab from './tab/index'
import ETabItem from './tab-item/index'

const components = [
  EButton,
  EInput,
  EMenu,
  EMenuItem,
  EOption,
  ESection,
  ESelect,
  ETab,
  ETabItem
]

export default {
  install: function (Vue, options) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
