import { createPopper } from '@popperjs/core'

class Popper {
  constructor() {
    this._count = 2000
  }
  static _c(source, target, options) {
    this._count++
    createPopper(source, target, options)
  }
  
  static _d(placement, uid) {
    let pop = document.createElement('div')
    pop.innerText = placement
    pop.dataset.key = `e-button-popper-${this._uid}`
    pop.classList.add('e-popper')
    pop.style.zIndex = this._count
    return pop
  }
}
export default Popper