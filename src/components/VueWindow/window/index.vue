<template>
  <transition
    name="fade"
    @after-leave="$emit('close')"
    @after-enter="$emit('open')"
  >
    <div
      v-show="isOpen"
      class="window"
      :style="styleWindow"
      ref="window"
      :id="windowId"
      @mousedown="activate"
      @touchstart="activate"
    >
      <div
        class="titlebar"
        v-show="showTitle"
        :style="styleTitlebar"
        ref="titlebar"
      >
        <div class="title">
          <template v-if="$slots.title">
            <slot name="title" />
          </template>
          <template v-else>{{ title }}</template>
        </div>
        <template v-if="closeButton">
          <my-button @click="closeButtonClick">&times;</my-button>
        </template>
      </div>
      <div class="content" :style="styleContent" ref="content" :id="contentId">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import { WindowType } from './script'
export default WindowType
</script>

<style lang="stylus" scoped>
.window
  display flex
  flex-flow column
  position absolute
  // border-radius 4pt 4pt 0 0


.titlebar
  display flex
  flex-flow row nowrap
  // border-radius: 4pt 4pt 0 0
  font-family sans-serif
  padding 0.5em
  flex 0 0 auto
  user-select none
  border-top-left-radius 4px
  border-top-right-radius 4px

.title
  flex-grow 1
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

.content
  flex-grow 1
  // padding 0.5em
  height 100%


.draggable-handle
  cursor move


.fade-enter,
.fade-leave-to
  opacity 0
  transform scale(0.9)


.fade-enter-active,
.fade-leave-active
  transition 0.2s
</style>
