<script>
import Bus from "@/utils/bus";

export default {
  name: "YrMenu",
  componentName: "YrMenu",
  computed: {
    isMenuPopup() {
      return (
        this.mode === "horizontal" ||
        (this.mode === "vertical" && this.collapse)
      );
    }
  },
  mounted() {
    Bus.$on("submenu-click", this.handleSubmenuClick);
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
    uniqueOpened: Boolean,
    defaultOpeneds: Array,
    collapse: Boolean,
    menuTrigger: {
      type: String,
      default: "hover"
    }
  },
  provide() {
    return {
      rootMenu: this
    };
  },
  methods: {
    handleSubmenuClick(submenu) {
      const { index, indexPath } = submenu;
      console.log("indexxxx", index, indexPath);
      let isOpened = this.openedMenus.indexOf(index) !== -1;
      console.log(this.openedMenus, index, "isOpened");
      if (isOpened) {
        this.closeMenu(index);
        this.$emit("close", index, indexPath);
      } else {
        this.openMenu(index, indexPath);
        this.$emit("open", index, indexPath);
      }
    },
    closeMenu(index) {
      const i = this.openedMenus.indexOf(index);
      if (i !== -1) {
        this.openedMenus.splice(i, 1);
      }
    },
    openMenu(index, indexPath) {
      let openedMenus = this.openedMenus;
      if (openedMenus.indexOf(index) !== -1) return;
      // 将不在该菜单路径下的其余菜单收起
      // collapse all menu that are not under current menu item
      if (this.uniqueOpened) {
        this.openedMenus = openedMenus.filter(index => {
          return indexPath.indexOf(index) !== -1;
        });
      }
      this.openedMenus.push(index);
    }
  }
};
</script>

<style lang="stylus" scoped></style>