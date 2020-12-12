import Vue from 'vue'
import { naturalSize } from '../dom'
import { DraggableHelper } from '../draggable_helper'
import { ResizableHelper } from '../resizable_helper'
import { WINDOW_STYLE_KEY } from '../style'
import { windows } from '../windows'
import { ZElement } from '../z_element'
import MyButton from '../button/index.vue'
import { v4 as uuidv4 } from 'uuid'

const instances = []

export const WindowType = Vue.extend({
  components: { MyButton },
  props: {
    resizeSiders: {
      type: Array,
      default: () => [],
      // [
      //   'Top',
      //   'TopLeft',
      //   'TopRight',
      //   'Bottom',
      //   'BottomLeft',
      //   'BottomRight',
      //   'Left',
      //   'Right',
      // ],
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      // eslint-disable-next-line vue/no-boolean-default
      default: true,
    },
    closeButton: {
      type: Boolean,
      default: false,
    },
    resizable: {
      type: Boolean,
      default: false,
    },
    isScrollable: {
      type: Boolean,
      default: false,
    },
    activateWhenOpen: {
      type: Boolean,
      // eslint-disable-next-line vue/no-boolean-default
      default: true,
    },
    windowId: {
      type: String,
      default: () => 'id' + uuidv4(),
    },
    contentId: {
      type: String,
      default: () => 'id' + uuidv4(),
    },
    title: {
      type: String,
      default: '',
    },
    positionHint: {
      type: String,
    },
    overflow: {
      type: String,
      default: 'visible',
    },
    padding: {
      type: Number,
      default: 0,
    },
    zGroup: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
    },
    top: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    minWidth: {
      type: Number,
      default: 1,
    },
    minHeight: {
      type: Number,
      default: 0,
    },
    maxWidth: {
      type: Number,
    },
    maxHeight: {
      type: Number,
    },
  },
  data() {
    return {
      draggableHelper: null,
      resizableHelper: null,
      zElement: null,
      openCount: 0,
      zIndex: 'auto',
    }
  },
  inject: {
    windowStyle: WINDOW_STYLE_KEY,
  },
  computed: {
    styleWindow() {
      return {
        ...this.windowStyle.window,
        zIndex: this.zIndex,
        overflow: this.overflow,
      }
    },

    styleTitlebar() {
      return this.windowStyle.titlebar
    },

    styleContent() {
      const style = { ...this.windowStyle.content }

      if (this.resizable) {
        // style.padding = '0'
      } else if (this.padding != undefined) {
        style.padding = `${this.padding}px`
      }

      if (this.isScrollable) {
        style.overflow = 'auto'
      }

      return style
    },
  },
  watch: {
    resizable: {
      handler: function onResizableChange() {
        console.error("prop 'resizable' can't be changed")
      },
    },
    isOpen: {
      handler: 'onIsOpenChange',
    },
    zGroup: {
      handler: 'onZGroupChange',
    },
    left: {
      handler: 'onLeftChange',
    },
    top: {
      handler: 'onTopChange',
    },
    width: {
      handler: 'onWidthChange',
    },
    height: {
      handler: 'onHeightChange',
    },
    positionHint: {
      handler: 'setInitialPosition',
    },
  },
  mounted() {
    instances.push(this)
    this.zElement = new ZElement(
      this.zGroup,
      zIndex => (this.zIndex = `${zIndex}`)
    )
    this.isOpen && this.onIsOpenChange(true)
    windows.add(this)
  },

  beforeDestroy() {
    windows.delete(this)
    this.zElement.unregister()
    this.resizableHelper && this.resizableHelper.teardown()
    this.draggableHelper && this.draggableHelper.teardown()
    instances.splice(instances.indexOf(this), 1)
  },
  methods: {
    windowElement() {
      // const el = document.querySelector(`#${this.windowId}`)
      // return el
      return this.$refs.window
    },

    titlebarElement() {
      return this.$refs.titlebar
    },

    contentElement() {
      // const el = document.querySelector(`#${this.contentId}`)
      // return el
      return this.$refs.content
    },
    activate() {
      this.zElement.raise()
      this.$emit('activate')
    },

    onIsOpenChange(isOpen) {
      if (isOpen) {
        this.$nextTick(() => {
          if (this.openCount++ == 0) {
            this.setWindowRect(this)
            this.setInitialPosition()
          }
          this.resizable && this.onWindowResize()
          this.onWindowMove()
          if (this.draggable) {
            this.draggableHelper = new DraggableHelper(
              this.titlebarElement(),
              this.windowElement(),
              {
                onMove: () => this.onWindowMove(),
                onMoveStart: () => this.$emit('move-start'),
                onMoveEnd: () => this.$emit('move-end'),
              }
            )
          }
          this.resizable && this.initResizeHelper()
        })
        this.activateWhenOpen && this.activate()
      }
    },

    onZGroupChange() {
      this.zElement.group = this.zGroup
    },

    fixPosition() {
      // const w = this.windowElement()
      // const rect = w.getBoundingClientRect()
      // if (rect.left < 0) w.style.left = `0px`
      // if (rect.top < 0) w.style.top = `0px`
      // if (rect.right > window.innerWidth)
      //   w.style.left = `${window.innerWidth - rect.width}px`
      // if (rect.bottom > window.innerHeight)
      //   w.style.top = `${window.innerHeight - rect.height}px`
      if (!this.resizeSiders.length) {
        this.setInitialPosition()
      }
    },

    onLeftChange(left) {
      this.setWindowRect({ left })
      this.onWindowMove(false)
    },

    onTopChange(top) {
      this.setWindowRect({ top })
      this.onWindowMove(false)
    },

    onWidthChange(width) {
      this.setWindowRect({ width })
      this.onWindowResize(false)
    },

    onHeightChange(height) {
      this.setWindowRect({ height })
      this.onWindowResize(false)
    },

    setWindowRect({ width, height, top, left }) {
      const w = this.windowElement()
      if (width != undefined) {
        w.style.width = `${width}px`
      }
      if (height != undefined) {
        const tHeight = contentSize(this.titlebarElement()).height
        w.style.height = `${height + tHeight}px`
      }
      if (left != undefined) {
        w.style.left = `${left}px`
      }
      if (top != undefined) {
        w.style.top = `${top}px`
      }
    },

    initResizeHelper() {
      const { height: titlebarHeight } = naturalSize(this.titlebarElement())
      this.resizableHelper = new ResizableHelper(this.windowElement(), {
        onResize: () => this.onWindowResize(),
        onResizeStart: () => this.$emit('resize-start'),
        onResizeEnd: () => this.$emit('resize-end'),
        minWidth: this.minWidth,
        minHeight: this.minHeight + titlebarHeight,
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight ? this.maxHeight + titlebarHeight : undefined,
        resizeSiders: this.resizeSiders,
      })
    },

    onWindowResize(emitUpdateEvent = true) {
      const w = this.windowElement()
      const t = this.titlebarElement()
      const c = this.contentElement()
      const { width: cW0, height: cH0 } = contentSize(c, this.padding)
      const { width: wW, height: wH } = contentSize(w, this.padding)
      const tH = contentSize(t).height
      const cW1 = wW - (c.offsetWidth - cW0)
      const cH1 = wH - tH - (c.offsetHeight - cH0)
      // c.style.width = `${cW1}px`
      c.style.height = `${cH1}px`
      fixPosition()
      this.$emit('resize', new WindowResizeEvent(cW1, cH1))
      if (emitUpdateEvent) {
        this.$emit('update:width', cW1)
        this.$emit('update:height', cH1)
      }
    },

    onWindowMove(emitUpdateEvent = true) {
      this.fixPosition()
      const { left, top } = this.windowElement().getBoundingClientRect()
      if (emitUpdateEvent) {
        this.$emit('update:left', left)
        this.$emit('update:top', top)
      }
    },

    // todo: cleanup
    setInitialPosition() {
      const el = this.windowElement()
      const { width, height } = naturalSize(el)
      let left
      let top
      if ((this.left !== undefined) != (this.top !== undefined)) {
        throw new Error(
          `Either of left or top is specified. Both must be set or not set.`
        )
      }
      if (typeof this.left == 'number') {
        left = this.left
        top = this.top
      } else {
        const positionString = this.positionHint || 'auto'
        switch (positionString) {
          case 'auto':
            {
              let x = 20
              let y = 50
              let nTries = 0
              do {
                if (
                  instances.every(j => {
                    if (!j.isOpen || this == j) return true
                    const p = leftTop(j)
                    if (p == null) return true
                    const { left, top } = p
                    return distance2(left, top, x, y) > 16
                  })
                ) {
                  break
                }
                x = (x + 40) % (window.innerWidth - 200)
                y = (y + 40) % (window.innerHeight - 200)
              } while (++nTries < 100)
              left = x
              top = y
            }
            break
          case 'center':
            left = (window.innerWidth - width) / 2
            top = (window.innerHeight - height) / 2
            break
          default:
            try {
              const nums = positionString.split('/').map(num => Number(num))
              if (nums.length != 2) throw null
              const [x, y] = nums
              if (!isFinite(x) || !isFinite(y)) throw null
              left = x > 0 ? x : window.innerWidth - width + x
              top = y >= 0 ? y : window.innerHeight - height + y
            } catch (e) {
              throw new Error(`invalid position string: ${positionString}`)
            }
        }
      }
      el.style.left = `${left}px`
      el.style.top = `${top}px`
    },

    closeButtonClick() {
      this.$emit('closebuttonclick')
      this.$emit('update:isOpen', false)
    },
  },
})

function css2num(s) {
  return s !== null ? parseFloat(s) : 0
}

function contentSize(el, padding) {
  const s = window.getComputedStyle(el)
  const width =
    Math.ceil(
      [s.paddingLeft, s.width, s.paddingRight]
        .map(css2num)
        .reduce((a, b) => a + b)
    ) - (padding || 0)
  const height = Math.ceil(
    [s.paddingTop, s.height, s.paddingBottom]
      .map(css2num)
      .reduce((a, b) => a + b)
  )
  return { width, height }
}

export class WindowResizeEvent {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
}

function leftTop(w) {
  const el = w.windowElement()
  const left = parseFloat(el.style.left || 'NaN')
  const top = parseFloat(el.style.top || 'NaN')
  if (!isNaN(left) && !isNaN(top)) return { left, top }
  return null
}

function distance2(x1, y1, x2, y2) {
  const dx = x1 - x2
  const dy = y1 - y2
  return dx * dx + dy * dy
}

export function fixPosition() {
  windows.forEach(w => {
    w.fixPosition()
  })
}

window.addEventListener('resize', () => fixPosition())
