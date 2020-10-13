<script>
import { type } from "os";
export default {
  name: "YrMenu",
  computed: {
    isMenuPopup() {
      return (
        this.mode === "horizontal" ||
        (this.mode === "vertical" && this.collapse)
      );
    }
  },
  render(h) {
    const component = <ul role="menubar">{this.$slots.default}</ul>;
    return component;
  },
  data() {
    return {
      openedMenus:
        this.defaultOpeneds && !this.collapse
          ? this.defaultOpeneds.slice(0)
          : []
    };
  },
  props: {
    mode: {
      type: String,
      default: "vertical"
    },
    defaultOpeneds: Array,
    collapse: Boolean
  },
  provide() {
    return {
      rootMenu: this
    };
  }
};
</script>

<style lang="stylus" scoped></style>