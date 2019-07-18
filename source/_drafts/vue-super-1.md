---
title: vue-super-1
tags: vue
abbrlink: 9b98
---

vue 常见面试内容

<!-- more -->

# 改变数组或者对象的数据，但是页面没有更新

像这种问题引起的常见操作是修改了引用类型（可以查看之前的文章）

而我们知道 Vue 是通过 Object.defineProperty() 来劫持各个属性的 getter 和 setter, 在数据变动时发布消息给订阅者，但是因为 Object.defineProperty() 的限制无法监听到对象的添加或删除无法被监听到，而数据的响应式处理是在初始化实例时操作的，如果我们其他事件添加或者删除属性，就没有办法监听到，这也是为什么要跟换为 proxy() 的原因， proxy() 可以原生监听一个对象，而且不需要嵌套添加监听。

使用 指定方法（比如数组的一些方法）或者全局方法 $set

赋值多个新属性时，使用声明创建，使用 Object.assign() 或者其他


# vue弹窗后如何禁止滚动条滚动

在移动端的时候，弹出遮罩层后，我们仍然可以滚动页面。

使用 .prevent 阻止默认事件。监听 touchmove 方法。

去除滚动条，可以添加 document.body.style.overflow='hidden'

# Vue 常见的标签

`v-html` 元素的 innerHTML 方法
`v-bind` 单向绑定
`v-show` 通过修改 diplay 来显示和隐藏
`v-if` 条件
`v-on` 绑定一个或多个事件，可以使用事件修饰符，按键修饰符
`v-for` 列表渲染，可以是数组或者对象，也可以是函数
`v-model` 双向绑定

# vue 生命周期的理解

beforeCreate // 实例初始化之后，数据观测和事件配置之前，也就是说这时候是不能获取数据和事件的
created // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见。
beforeMount // 在挂载开始之前被调用：相关的 `render` 函数首次被调用。
mounted // `el` 被新创建的`vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 `root `实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。
beforeUpdate // 数据更新前
updated // 数据更新后
beforeDestroy // 销毁之前 适合移除时间、定时器 可能会引起内存泄漏
destroyed // 销毁 在销毁组件，如果有子组件的话，会递归销毁子组件，直到所有的子组件都销毁完毕之后执行

# vue 组件通信

- 父子组件通信

父组件通过 props 传递数据给子组件，子组件通过 emit 发送事件传递数据给父组件，这两种方式是最常用的父子通信实现办法。

这种父子通信方式也就是典型的单向数据流，父组件通过 props 传递数据，子组件不能直接修改 props(注意如果是对象是可以修改的，但是不建议这么做)， 而是必须通过发送事件的方式告知父组件修改数据。

.sync 属性是个语法糖，可以很简单的实现子组件与父组件通信


```
<!--父组件中-->
<input :value.sync="value" />
<!--以上写法等同于-->
<input :value="value" @update:value="v => value = v"/>
<!--子组件中-->
<script>
  this.$emit('update:value', 1)
</script>
```

* 兄弟组建通信

对于这种情况可以通过查找父组件中的子组件实现，也就是 this.$parent.$children，在 $children 中可以通过组件 name 查询到需要的组件实例，然后进行通信。可以把父子组件都看作一个元素。

* 任意组件
这种方式可以通过 Vuex 或者 Event Bus 解决，另外如果你不怕麻烦的话，可以使用这种方式解决上述所有的通信情况

# computed 和 watch 区别

computed 是计算属性，依赖其他的响应属性，并且 computed 的值有缓存，只有当计算值变化才会返回内容

watch 监听到值的变化就会执行回调。通常使用 computed 来替换 watch 。

# keep-alive 组件有什么作用

组件切换的时候可以防止组件多次渲染，通过使用 keep-alive 组件包裹需要缓存的组件。
独有的两个钩子是 activated 和 deacivated .
从缓存中取出渲染的时候触发 activated
组件切换时缓存到内存中触发 deactivated 

# vue 的双向绑定

# $nextTick

下次 Dom 更新循环结束之后执行延时回调。在修改数据之后立即使用这个方法，获取更新后的 Dom