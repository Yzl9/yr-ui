<script>
import ElCollapseTransition from "@/components/transitions/collapse-transition";
import menuMixin from "./menu-mixin";

export default {
  mixins: [menuMixin],
  name: "YrSubMenu",
  components: { ElCollapseTransition },
  computed: {
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1;
    },
    isMenuPopup() {
      return this.rootMenu.isMenuPopup;
    }
  },
  render(h) {
    const { opened, rootMenu, $slots } = this;
    console.log(this.isMenuPopup);

    const inlineMenu = (
      <el-collapse-transition>
        <ul
          role="menu"
          class="el-menu el-menu--inline"
          v-show={opened}
          style={{ backgroundColor: rootMenu.backgroundColor || "" }}
        >
          {$slots.default}
        </ul>
      </el-collapse-transition>
    );

    return (
      <li>
        <div></div>
        {this.isMenuPopup ? "popupMenu" : inlineMenu}
      </li>
    );
  }
};
</script>

<style lang="stylus" scoped></style>