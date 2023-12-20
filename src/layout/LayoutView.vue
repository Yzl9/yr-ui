<script setup lang="ts">
import { ref } from 'vue'

const nav = ref([
  {
    name: 'table',
    path: '/yrTable'
  }
])
</script>

<template>
  <div class="box">
    <div class="nav">
      <template v-for="item in nav" :key="item.path">
        <router-link class="link" :to="item.path">
          {{ item.name }}
        </router-link>
      </template>
    </div>
    <div class="content"><RouterView /></div>
  </div>
</template>

<style scoped lang="less">
.box {
  display: flex;
  .nav {
    width: 200px;
    height: 100vh;
    font-size: 20px;
    box-shadow: 0px 3px 1px 1px #383333;
    display: flex;
    flex-direction: column;
    .link {
      text-align: center;
      margin: 12px 0px;
    }
  }
  .content {
    flex: 1;
    padding: 20px 40px;
    background: #333;
  }
}
</style>
