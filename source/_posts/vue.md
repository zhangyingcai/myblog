---
title: vue
tags: vue
categories: Vue
abbrlink: 24839
date: 2019-01-24 16:40:52
---

记录vue的知识点

<!-- more -->

# 重点

# vue的双向绑定？怎么实现的？
# vue响应式原理

vue内部使用Object.defineProperty()来实现数据响应式，通过这个函数将vue实例data对象的所有属性全部转为getter/setter。然后在属性被访问和修改时通知变化。监听这个变化的是watcher实例对象，在渲染组件的过程中
把属性记录为依赖，在setter被调用时，会通知watcher重新计算，从而导致它关联的组件更新。

>JavaScript 的限制 ( Object.observe 已经被废弃)，Vue 不能检测到对象属性的添加或删除。所以属性必须在`data`对象上存在才能让Vue转化它。

可以通过`Vue.set(object, key, value)`添加到data(或者其他对象)对象上实现响应式
还可以使用`vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：
```
this.$set(this.someObject,'b',2)
```

# 虚拟dom?怎么实现的？

# 声明式渲染
模板语法
插值

```
vue.js的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进DOM的系统。
{{ 参数|单个表达式 }}

单个表达式包括：运算、三目运算
{{ message.split('').reverse().join('') }} // 将字符串翻转
```



# vue的生命周期

beforeCreate // 实例初始化之后，数据观测和事件配置之前，也就是说这时候是不能获取数据和事件的
created // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见。
beforeMount // 在挂载开始之前被调用：相关的 `render` 函数首次被调用。
mounted // `el` 被新创建的`vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 `root `实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。
beforeUpdate // 数据更新前
updated // 数据更新后
beforeDestroy // 销毁之前 适合移除时间、定时器 可能会引起内存泄漏
destroyed // 销毁 在销毁组件，如果有子组件的话，会递归销毁子组件，直到所有的子组件都销毁完毕之后执行

# v-show

```
`v-show`始终渲染元素，通过切换display来控制元素的显示隐藏，有较大的初始渲染开销。
注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。
```

# v-if
```
`v-if`指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回truthy值的时候被渲染。
```

# v-model

```
实现双向绑定 可以添加修饰符
```

# .trim

```
如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

`<input v-model.trim="msg">`
```

# .number 

```
如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：

`<input v-model.number="age" type="number">`
这通常很有用，因为即使在 `type="number"` 时，`HTML` 输入元素的值也总会返回字符串。
如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。(说明`number`的实现是通过`parseFloat()`方法实现的)
```

# .lazy

```
在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 。
添加`lazy`从而转变为使用`change`时间进行同步，也就是在每次改变的时候进行同步。
```

# v-once

```
只赋值一次
```

# 事件修饰符
## .prevent

```
`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`
<form v-on:submit.prevent="onSubmit">...</form>
```
```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

```

# 计算属性

语法
```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

computed:{
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
} // 关键字computed，是vue的一个属性
```

# 计算属性的setter

```
计算属性默认只有getter,不过在需要时你也可以提供一个setter
computed: {
  fullName: { // 计算属性
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。
```

目的：替换模板语法的复杂逻辑

# 计算属性缓存 vs 方法

```
最终结果是完全相同的。
不同的计算属性是基于他们的依赖进行缓存的。只有在相应的依赖发生改变时计算属性才会重新求值。
这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。
调用方法总会再次执行函数。
computed: {
  now: function () {
    return Date.now()
  }
}// 只会返回第一次的时间。
```

# 计算属性 vs 倾听属性

计算属性主要依托于 vue 的响应式 data

```
vue提供了一种更通用的方式观察和响应vue实例上的数据变化。
当你有一些数据需要随着其他数据的变化而变化时，很容易滥用watch,通常使用computed。

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) { // 监听某个数据改变
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

# 倾听器

适用于执行异步或者开销较大的操作。

# vuex

# $nextTick

```
将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
```

# vm.$refs

类型：Object

持有所有 ref 注册的 DOM 元素和组件实例，通过注册的 ref 名称访问 DOM 元素和组件实例 

# vm.$el 

Element

vue 实例的根元素

# vue.$nextTick()

在下次 DOM 更新循环结束之后的延时回调，在数据更新之后立即调用这个方法，获取更新后的DOM

