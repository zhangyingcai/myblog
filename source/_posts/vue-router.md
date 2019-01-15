---
title: vue-router
date: 2019-01-15 11:50:33
tags: vue-router
---

vue-router的使用总结

# 传参

## 普通模式（传单个值）

```
《路由》/:id
 通过在路由后面添`/:id`,`id`是参数名称
 传参`:to="'/user/'+id"`
 获取`$route.params.id`
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