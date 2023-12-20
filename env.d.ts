/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 定义vue组件以及类型注解
  const component: DefineComponent<{}, {}, any>
  export default component
}
