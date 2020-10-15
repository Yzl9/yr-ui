<script>
import ElCollapseTransition from "@/components/transitions/collapse-transition";
import Bus from "@/utils/bus";
import menuMixin from "./menu-mixin";

export default {
  mixins: [menuMixin],
  name: "YrSubMenu",
  components: { ElCollapseTransition },
  props: {
    index: {
      type: String,
      required: true
    },
    disabled: Boolean
  },
  computed: {
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1;
    },
    isMenuPopup() {
      return this.rootMenu.isMenuPopup;
    }
  },
  methods: {
    handleClick() {
      const { rootMenu, disabled } = this;
      if (
        (rootMenu.menuTrigger === "hover" && rootMenu.mode === "horizontal") ||
        (rootMenu.collapse && rootMenu.mode === "vertical") ||
        disabled
      ) {
        return;
      }
      Bus.$emit("submenu-click", this);
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
        <div onClick={this.handleClick}>{$slots.title}</div>
        {this.isMenuPopup ? "popupMenu" : inlineMenu}
      </li>
    );
  }
};
</script>

<style lang="stylus" scoped></style>