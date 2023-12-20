# 简单说下

以前用vue2做项目写了个tabs，是可以用this拿到$children,但是 vue3 在setup里面是没this,原因是在 setup() 内部，this 不会是该活跃实例的引用（即不指向vue实例），因为 setup() 是在解析其它组件选项之前被调用的，所以 setup() 内部的 this 的行为与其它选项中的 this 完全不同。这在和其它选项式 API 一起使用 setup() 时可能会导致混淆。因此setup函数中不能使用this。所以Vue3为了避免我们错误的使用，直接将setup函数中的this修改成了 undefined）


