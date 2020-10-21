<template>
  <div class="home">
    <yr-menu style="width:50%" mode="vertical" :collapse="false">
      <yr-sub-menu index="1">
        <template slot="title">
          书籍
        </template>
        <yr-menu-item>home</yr-menu-item>
      </yr-sub-menu>
      <yr-sub-menu index="2">
        <template slot="title">
          个人中心
        </template>
        <yr-menu-item>home</yr-menu-item>
      </yr-sub-menu>
    </yr-menu>

    
    <div style="height:200px"></div>
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
