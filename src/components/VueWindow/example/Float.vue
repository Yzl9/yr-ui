<!--
 * @Author: your name
 * @Date: 2020-10-29 16:22:06
 * @LastEditTime: 2020-10-30 11:54:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sr-v.2.0d:\yzl\work\pc\pr\yr-ui\src\components\VueWindow\example\Float.vue
-->
<template>
  <div>
    <hsc-window-style-metal class="xxxxxxxxxx">
      <template v-for="i in [1, 2, 3]" , :zGroup="0">
        <hsc-window :key="i" :title="`Base Layer #${i}`">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range" />
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-metal>

    <hsc-window-style-black>
      <template v-for="i in [1, 2, 3, 4]">
        <hsc-window :key="i" :title="`Floating Layer #${i}`" :zGroup="1">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range" />
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-black>

    <p>
      Floating windows always appear in foreground of windows on base layer.
    </p>
  </div>
</template>
