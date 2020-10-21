
<script>
export default {
  name: "YrCarousel",
  props: {
    initialIndex: {
      type: [String, Number],
      default: 0
    }
  },
  render(h, children) {
    setTimeout(() => {
      console.log("c", this);
    }, 1000);
    const component = <ul class="carousel">{this.$slots.default}</ul>;
    return component;
  }
};
</script>

<style lang="stylus" scoped>
.carousel {
  position: relative;
}
</style>