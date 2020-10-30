<template>
  <div class="banner-item">
    <div
      v-show="ready"
      class="el-carousel__item"
      :class="{
        'is-active': active,
        'is-in-stage': inStage,
        'is-hover': hover
      }"
      @click="handleItemClick"
    >
      <slot></slot>
    </div>
    <div class="a" :class="[active ? 'c-is-active' : 'c']">
      <slot name="c"></slot>
    </div>
  </div>
</template>

<script>
import { autoprefixer } from "@/utils/util";
const CARD_SCALE = 0.83;
export default {
  name: "YrCarouselItem",
  props: {
    name: String,
    label: {
      type: [String, Number],
      default: ""
    },
    index: [Number]
  },
  data() {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
  },
  methods: {
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },
    calcCardTranslate(index, activeIndex) {
      const parentWidth = this.$parent.$el.offsetWidth;
      if (this.inStage) {
        return (
          (parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4
        );
      } else if (index < activeIndex) {
        return (-(1 + CARD_SCALE) * parentWidth) / 4;
      } else {
        return ((3 + CARD_SCALE) * parentWidth) / 4;
      }
    },
    calcTranslate(index, activeIndex, isVertical) {
      const distance = this.$parent.$el[
        isVertical ? "offsetHeight" : "offsetWidth"
      ];
      console.log(
        "distance * (index - activeIndex)",
        distance * (index - activeIndex)
      );
      return distance * (index - activeIndex);
    },
    translateItem(index, activeIndex, oldIndex) {
      const parentType = this.$parent.type; // car or default
      const parentDirection = this.parentDirection; // horizontal vertital
      const length = this.$parent.items.length; // long
      if (index !== activeIndex && length > 2 && this.$parent.loop) {
        index = this.processIndex(index, activeIndex, length);
      }
      if (parentType === "card") {
        if (parentDirection === "vertical") {
          console.warn(
            "[Element Warn][Carousel]vertical direction is not supported in card mode"
          );
        }
        this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.active = index === activeIndex;
        this.translate = this.calcCardTranslate(index, activeIndex);
        this.scale = this.active ? 1 : CARD_SCALE;
      } else {
        this.active = index === activeIndex;
        const isVertical = parentDirection === "vertical";
        this.translate = this.calcTranslate(index, activeIndex, isVertical);
      }
      this.ready = true;
    },
    handleItemClick() {
      const parent = this.$parent;
      if (parent && parent.type === "card") {
        const index = parent.items.indexOf(this);
        parent.setActiveItem(index);
      }
    }
  },
  computed: {
    parentDirection() {
      return this.$parent.direction;
    }
  },
  created() {
    this.$parent && this.$parent.updateItems();
  },
  destroyed() {
    this.$parent && this.$parent.updateItems();
  }
};
</script>
<style lang="stylus">
.banner-item {
}

.el-carousel__item {
  opacity: 0;
  transition: all 2s;
}

.is-active {
  opacity: 1;
  transition: all 2s;
}

.a {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: red;
  color: blue;
  font-size: 100px;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.c {
  opacity: 0;
}

.c-is-active {
  top: 40%;
  opacity: 1;
  transition: all 2s;
}
</style>