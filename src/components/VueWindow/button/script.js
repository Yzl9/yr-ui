import Vue from 'vue'
import { WINDOW_STYLE_KEY } from '../style'
import { SinglePointerEvent } from '../SinglePointerEvent'

export const Button = Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    windowStyle: WINDOW_STYLE_KEY,
  },
  data() {
    return {
      hover: false,
      active: false,
    }
  },
  computed: {
    style() {
      let s = this.windowStyle.button
      this.hover && (s = { ...s, ...this.windowStyle.buttonHover })
      this.active && (s = { ...s, ...this.windowStyle.buttonActive })
      return s
    },
  },
  methods: {
    mousedown(e) {
      e.preventDefault()
      this.active = true
      const unbindUp = SinglePointerEvent.bindUp(document, () => {
        this.active = false
        unbindUp()
      })
    },

    mouseup() {
      if (this.active) {
        this.$emit('click')
      }
    },
  },
})
