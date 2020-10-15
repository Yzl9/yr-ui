<template>
  <div class="home">
    <yr-menu mode="vertical" :collapse="false">
      <yr-sub-menu index="1">
        <template slot="title">
          书籍
        </template>
        <li>home</li>
      </yr-sub-menu>
      <yr-sub-menu index="2">
        <template slot="title">
          个人中心
        </template>
        <li>home</li>
      </yr-sub-menu>
    </yr-menu>

    <el-col :span="12">
      <el-menu :span="12">
        <el-submenu index="2">
          <template slot="title">语言</template>
          <el-menu-item index="2-1">
            jscript
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>
