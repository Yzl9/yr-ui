<template>
  <yr-carousel :interval="4000" :initial-index="0">
    <yr-carousel-item
      :index="index"
      v-for="(item, index) in imgList"
      :key="index"
    >
      <img :src="item.img" alt="" />
      <div slot="c">ss</div>
    </yr-carousel-item>
  </yr-carousel>
</template>

<script>
import One from "@/assets/img/banner-0.png";
import Two from "@/assets/img/banner-1.png";
import Three from "@/assets/img/banner-2.png";
export default {
  data() {
    return {
      imgList: [
        {
          img: One
        },
        {
          img: Two
        },
        {
          img: Three
        }
      ]
    };
  }
};
</script>

