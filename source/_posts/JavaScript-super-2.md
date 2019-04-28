---
title: JavaScript进阶系列-原始类型
date: 2019-04-28 14:28:17
tags: 原始类型
categories: JavaScript进阶系列
---
JavaScript进阶系列-原始类型
<!-- more -->

6种原始类型
string
number
boolean
null
undefined
symbol [ES6新增]

特性：
* 基本类型的*值*不能被改变
* boolean 表示一个逻辑实体，可以有两个值：true 和 false。
* null 类型只有一个值： null
* 一个没有被赋值的变量会有个默认值 undefined
* symbol 是唯一的并且是不可更改的，类似 C 语言里的枚举类型

ps: 拼接字符串，数字相加减这些都是返回一个新的*值*，然后将这个值给予你的变量

```
var bar = "baz";
console.log(bar);               // baz
var UCbar = bar.toUpperCase();
console.log(bar);               // baz
console.log(UCbar);             // BAZ
```

这些是对于基本类型是不会改变值的，对于引用类型就不同了，下节详细了解。

```
let foo = 5;

// 定义一个貌似可以改变基本类型值的函数
function addTwo(foo) {
   foo += 2;
}
addTwo(foo);
console.log(foo) // 5
```

## JavaScript中的基本类型包装对象

除了 null 和 undefined 之外，所有基本类型都有对应的包装对象。

string | String
number | Number
boolean | Boolean
symbol | Symbol

ToDo:如下图发现一个有趣的事,关于 new 的实现。new 新创建一个对象实例。
{% asset_img 微信截图_20190428150619.png %}
