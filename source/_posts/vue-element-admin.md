---
title: vue-element-admin
date: 2019-02-25 13:41:34
tags: vue-element-admin
categories: Vue
---

vue-element-admin的使用总结

<!-- more -->

# 基础

基于vue2.0,配合使用 Element UI 组件库的一个前端管理后台集成解决方案.

优点：
1.权限验证方案。通过配置不同的角色展示不同的页面，可以前后端配合用于权限配置。

# 权限验证

思路：通过获取当前用户的权限，然后去对比路由表，生成当前用户具有的权限可访问路由表，然后通过router.addRoutes动态挂载到router上。
