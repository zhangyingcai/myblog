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

通过数据劫持+订阅发布者模式实现的。
首先是数据劫持：数据劫持就是 Vue 在实例化的时候，将 data 和 props 属性进行深度遍历，通过 Object.defineProperty() 来给所有的属性添加 set 和 get 方法。在 get 中进行数据的依赖收集，在 set 里数据更新时触发通知。

然后是 complice 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，并将更新函数绑定到订阅者的 update 函数当中。

vue 内部使用 Object.defineProperty() 来实现数据响应式，通过这个函数将 vue 实例 data 对象的所有属性全部转为 getter/setter 。然后在属性被访问和修改时通知变化。监听这个变化的是 watcher 实例对象，在渲染组件的过程中
把属性记录为依赖，在 setter 被调用时，会通知 watcher 重新计算，从而导致它关联的组件更新。

>JavaScript 的限制 ( Object.observe 已经被废弃)，Vue 不能检测到对象属性的添加或删除。所以属性必须在`data`对象上存在才能让Vue转化它。

可以通过`Vue.set(object, key, value)`添加到data(或者其他对象)对象上实现响应式
还可以使用`vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：
```
this.$set(this.someObject,'b',2)
```
我们来模拟一遍过程以及怎么使用 proxy 来实现

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

# vm.mixins

类型 **Array<Object>**


接受一个混入对象的数组。
这些混入实例对象可以通过和实例相同钩子来合并要完成的逻辑。mixin 钩子按照传入的顺序依次调用，并且在调用组件自身钩子之前被调用。
```
var mixin = {
  created: function () { console.log(1) }
}
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// => 1
// => 2
```

## keyup 对于键盘按键时间监听

v-bind:keyup.enter

监听键盘 Enter 按下的时候触发

## proxy 实现数据监听

```
const onWatch = (obj, setBind, getLogger) => {
  const handler = {
    get(target, property){
      getLogger(target, property, receiver)
      return Reflect.get(target, property)
    },
    set(target, property, value, receiver){
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

# 内置过滤器

2.0 已经移除了内置过滤器

# vue的核心

数据驱动和组件化

然后就是：数据驱动的实现是 数据劫持 + 发布订阅者 模式
组件化：
所有的组件都是 Vue 实例，并且接收相同的选项对象

# 路由懒加载写法

```
// 我所采用的方法
const router = new VueRouter({
  routes: [
    path: '/app',
    component: () => import('./app'),  // 引入组件
  ]
})
// Vue路由文档的写法:
const app = () => import('./app.vue') // 引入组件
const router = new VueRouter({
  routes: [
    { path: '/app', component: app }
  ]
})
```

# 项目总结

## 首先要考虑的是权限验证和安全性

不同的权限对应不同的路由，同时侧边栏也需要根据不同的权限异步生成。

登录： 登录，验证用户名密码正确之后返回 token，然后根据 token 获取用户信息和对应的role。动态算出其应有权限的路由，通过 router.addRoutes 动态挂载这些路由。
根据 token 白名单

关键点1：保证刷新之后能够记录用户的当前登录状态，通过将 token 缓存，比如放到 cookie 中。
关键点2：动态挂载路由的时候，有时候挂载时没有执行 next() 方法
关键点3：动态添加的路由，并不能动态的删除，这就导致一个问题，当用户的权限发生变化的时候，或者用户登出的时候，我们只能通过刷新页面的方式，才能清空我们之前注册的路由。


所有的 vue-router 注册的路由信息都是存放在 matcher 之中的，所以当我们想清空路由时，只需要新建一个空的 router 对象，并将 router.matcher 值赋值给 之前的路由，
```
import Router from 'vue-router'
const router = new Router()
export function resetRoute(){
  const newRouter = new Router()
  router.matcher = newRouter.mathcer
}
```

实现通过不刷新页面更新路由

## 解决跨域问题：

前端使用 代理 mock-server

后端配置 cors origin 头是 通配符或者指定域名

## jest 单元测试

## MVVM

Model-View-ViewModel 的缩写
Model:代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑。被称为是数据层，只关注数据本身。
View:用户操作界面。当 View-Model 对 Model 进行更新的时候，会通过数据绑定更新到 View。
View-Model: 业务逻辑层，View 需要什么数据，ViewModel就要提供这个数据，View有某些操作，ViewModel就要响应这些操作，所以它是 Model for View。


# 组件化

组件化，就是将页面拆分成多个组件，每个组件依赖的 CSS、JavaScript、模板、图片等资源放在一起开发和维护。组件的资源是相互独立的，组件在系统内部可复用，组件和组件之间可以嵌套。
# 组件注册

组件注册有两种方式

## 全局注册
Vue.component(tagName, options)
## 局部注册

