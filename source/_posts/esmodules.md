---
title: 前端模块化
tags: 模块化
abbrlink: 39772
date: 2019-03-07 13:33:51
---

归纳 模块化

<!-- more -->

# 意义

模块化的意义是为了抽离公共代码，把相同、相似的功能放到一个组件，实现一个组件完成一个功能的设计，方便开发和维护，降低开发成本，形成一套高效的工具
隔离作用域，避免变量冲突
* 使用自执行函数来编写模块化（在一个单独的函数作用域中执行）
```
()(function(){
    // code
})
```
* AMD：使用requireJS来编写模块化（依赖必须提前声明好）
异步模块加载
```
define('./index.js', function(code){
    // code 是index返回的内容
})
```
* CMD：使用seaJS(支持动态引入依赖文件)
```
define(function(require, exports, module) {  
  var indexCode = require('./index.js'); // indexCode 是index返回的内容
});
```
* CommonJS：node中带的模块化
同步加载
```
var fs = require('fs');
```
* UMD 兼容AMD、CommonJS模块化语法
* ES modules:es6 引入的模块化

## 你怎么理解模块化编程？（网易2019秋招）

什么是模块化编程？ 为什么要模块化编程？怎么做？

有哪些实例？ AMD/Common/ES6 module

=》了解他们的运作原理

函数封装，将复杂函数进行解耦，但是容易导致命名的全局污染

封装文件之后，文件相互依赖的问题不好做

最原始的是 立即执行函数。

NodeJs 采用的是 Common 规范