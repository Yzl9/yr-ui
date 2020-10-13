<template>
  <div class="home">
    <yr-menu mode="vertical" :collapse="false">
      <yr-sub-menu>
        <template>
          个人中心
        </template>
        <li>home</li>
      </yr-sub-menu>
    </yr-menu>
    <el-col :span="12">
      <el-menu :collapse="true" :span="12">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">选项4</template>
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
