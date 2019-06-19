---
title: vue-router
tags: vue-router
categories: Vue
abbrlink: 2988
date: 2019-01-15 11:50:33
---

vue-router的使用总结

<!-- more -->

# 传参

## 普通模式（传单个值）

```
//《路由》/:id
// 通过在路由后面添`/:id`,`id`是参数名称
// 传参`:to="'/user/'+id"`
// 获取`$route.params.id`
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```
## 进阶模式

使用`props`将组件和路由解耦

```
// User组件
// 需要将id传入User组件
// 作为User组件的属性直接使用
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

## 对象

有的时候我们要传递一个对象到一个页面或者一个组件

```
// 方法1
// 通过:to='/search?q=vue&other=name'将对象拆分传递
// 可以看到vue-router已经将我们的参数编码了
const router = new VueRouter({
  routes: [
    // 我们可以通过 props 转换成需要的状态，通过创建一个函数返回 props 
    // 在组件通过 props 获取
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

## 修改 props 属性值

不需要通知父组件的时候可以自己复制一份，然后修改。

通过组件props获取的传参是不可修改的，可以在子组件新建变量接受参数。
```
data(){
  return {
    currentQ:this.q
  }
}
```
然后就可以对他进行修改了。
猜测是const类型 todo:了解原理

# 嵌套路由

使用场景，只更改部分页面时使用嵌套路由

# 导航守卫

## 全局守卫

全局守卫有三个：
* router.beforeEach 全局前置守卫 进入路由之前
可以添加进度条、修改文档 title 、可以对用户当前的登录状态进行校验。
* router.beforeResolve 全局解析守卫 在 beforeRouteEnter 之前调用
* router.afterEach 全局后置钩子 进入路由之后
可以添加进度条结束之类的

## 路由独享守卫

beforeEnter

## 路由组件内守卫

beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建
beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this
beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this