---
title: vue-element-admin
tags: vue-element-admin
categories: Vue
abbrlink: 25206
date: 2019-02-25 13:41:34
---

vue-element-admin的使用总结

<!-- more -->

# 基础

基于vue2.0,配合使用 Element UI 组件库的一个前端管理后台集成解决方案.

优点：
1.权限验证方案。通过配置不同的角色展示不同的页面，可以前后端配合用于权限配置。
2.和element-ui有配套的组件，基本满足了项目的需求，而且是大团队在维护便于项目开发和问题解决。

# 页面布局

layout作为内容页基础模板，所有的页面跳转都是在这里完成的。
包含导航、侧边栏、面包屑以及内容。
可以根据自己的需求创建一级模板layout。
通过嵌套路由只更新页面appmain和导航栏、侧边栏的数据。
点击侧边栏通过重定向`redirect: '/site/index'`切换到当前路径下的默认页面。
侧边栏基于`element-ui`和`el-menu`改造

# 权限验证

思路：通过获取当前用户的权限，然后去对比路由表，生成当前用户具有的权限可访问路由表，然后通过router.addRoutes动态挂载到router上。

# 问题
