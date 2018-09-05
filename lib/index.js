import Drag from './drag'
import Drop from './drop'

const VueLeave = {
  install(Vue, options) {
    Vue.component(Drag.name, Drag)
    Vue.component(Drop.name, Drop)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueLeave)
}

export default VueLeave
