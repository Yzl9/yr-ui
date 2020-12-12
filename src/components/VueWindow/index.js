import MyWindow from './window/index.vue'
import { StyleBlack, StyleWhite, StyleMetal, StyleFactory } from './style'

export { WindowResizeEvent, fixPosition } from './window/script'
export { StyleBlack, StyleWhite, StyleMetal, StyleFactory }

export function install(vue, options = { prefix: 'hsc-window' }) {
  const { prefix } = options
  vue.component(`${prefix}`, MyWindow)
  vue.component(`${prefix}-style-black`, StyleBlack)
  vue.component(`${prefix}-style-white`, StyleWhite)
  vue.component(`${prefix}-style-metal`, StyleMetal)
}

export { windows } from './windows'

export const WindowType = MyWindow
