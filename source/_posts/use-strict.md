---
title: use-strict
tags: 严格模式
keywords: 严格模式
description: 严格模式
abbrlink: a700
date: 2019-07-11 15:17:58
---

ES5 严格模式都做了哪些事？

<!-- more -->

# 全局变量

严格模式下禁止自动创建全局变量

来看下面的例子
```
a = 3;
window.a // 3
```

```
'use strict'
a = 3;// ReferenceError a is not defined
window.a //
```