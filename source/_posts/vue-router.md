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

# <router-link>

通过 tag 属性生成别的标签。

# <router-link> to

string | location

内部实现是在点击之后，立刻将 to 的值传递到 router.push()


replace 调用 router.replace() 导航后不会留下 history 记录。
append 是否添加基路径

# histroy

hash 模式

history 利用 histroy.pushState API 来完成 URL 跳转而无需重新加载页面

## history api

使用 history API 与浏览器历史记录进行交互

注：下载也被当做一个 HistoryItem 对象，因此，history.onVisited等事件也会被下载所触发。

### history.search()

在浏览器历史记录里查找符合给定条件的 history.HistroyItem 

### history.getVistits()

获取指定页面的访问集信息。

### history.addUrl()

添加指定页面的访问

### history.deleteUrl()

移除浏览器历史记录中所有对指定URL的访问

### history.deleteRange()

移除指定时间段内对用户指定页面的访问。

### history.deleteAll()

移除浏览器历史记录中的所有访问

### back()

back() 方法可加载历史列表中的前一个 URL（如果存在）。

调用该方法的效果等价于点击后退按钮或调用 history.go(-1)。

### forward()

forward() 方法可加载历史列表中的下一个 URL。

调用该方法的效果等价于点击前进按钮或调用 history.go(1)。  

### go()

go() 方法可加载历史列表中的某个具体的页面。

该参数可以是数字，使用的是要访问的 URL 在 History 的 URL 列表中的相对位置。（-1上一个页面，1前进一个页面)。或一个字符串，字符串必须是局部或完整的URL，该函数会去匹配字符串的第一个URL。
