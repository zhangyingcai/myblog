---
title: es6
date: 2019-01-17 09:16:43
tags: es6
categories: ES6
---

es6笔记

<!-- more -->

# 变量提升

英文：Hoisting

[很有意思的题目](https://juejin.im/post/5c6a0fa451882562851b3cdd)

`变量提升`变量和函数的声明移动到当前执行上下文(块)的最前面。
应用范围：数据类型、变量、函数

runtime：
1.并不是物理位置的移动，而是在编译阶段被放到内存中。
2.仅提升声明，而不提示初始化

历史原因：
提升存在的根本原因就是为了解决函数间互相调用的情况


```
{
    catName("Chloe");

    function catName(name) {
        console.log("我的猫名叫 " + name);
    }
}
catName("Tom");
```
```
function test1() {
    test2()
}
function test2() {
    test1()
}
test1()
```

>let 不存在 Hoisting
var 在全局作用域下声明变量会导致变量挂载在 window 上，`let``const`两者不会

[tomdn](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)

# 暂时性死区

let、const 因为暂时性死区的原因，不能在声明前使用

>在 ECMAScript 6 中，let（const）将不会提升变量到代码块的顶部。因此，在变量声明之前引用这个变量，将抛出引用错误（ReferenceError）。这个变量将从代码块一开始的时候就处在一个“暂时性死区”，直到这个变量被声明为止。

[tomdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types)

# 原型继承
# 立即执行函数

历史原因：用于模块化，通过函数作用域解决命名冲突、污染全局作用域的问题。
```
(function(){})()
```

# 箭头函数（Arrow Function）

没有自己的this,arguments,super或者new.target这些函数表达式更适用于那些本来需要匿名函数的地方，并且他们不能用作构造函数。
箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。

# 解构赋值

它使得将值从数组，或属性从对象，提取到不同的变量中，成为可能
为了方便从对象数组中提取需要的值
... 剩余运算符

数组模型的解构

```
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
```
可忽略
```
let [a, ,b] = [1, 2, 3]
// a=1
// b=3
```
不完全解构
```
let [a=1, b]=[]; //a=1,b=undefined
```
字符串等
在数组的结构中，结构的目标如果为可遍历对象，皆可进行结构赋值。可遍历对象即实现iterator接口的数据。
```
let [a, b, c, d, e] = 'hello'
```
结构默认值
当解构模式有匹配结果，且匹配结果是undefined时，会触发默认值作为返回结果。
```
let [a=3, b=a] = []
```
```
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20


// Stage 4（已完成）提案中的特性
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
```


# 模板字符串（Template String）

# 对象字面量扩展语法（Enhanced Object Literals）

# 表达式结构（Destructuring）

# 函数参数表达、传参

# 新的数据结构

# 类语法（Classes）

# 生成器

# Promise

# 代码模块化

# Symbol

SE6 引入的一种新的原始数据类型 Symbol ,表示独一无二的值，最大的用法是用来定义对象的唯一属性名。


# Proxy

# for of 替换 for...in

```
const Zootopia=[
    {name:'Nick',gender:1,species:'Fox'},
    {name:'Judy',gender:0,species:'Bunny'}
];
for(const {name,species} of Zootopia){
    console.log(`hi,I am ${name},and I am a ${species}`);
}
```

# Array.forEach 

# Map和Set

Map 对象保存键值对。任何值（对象和原始值）都可以作为一个键或者值。

Map 和 Object 的区别
* 一个 Object 的键只能是字符串或者 Symbols ,但是一个 Map 的键可以是任意值。
* Map 中键值是有序的，而添加到对象中的键则不是。
* Map 的键值对个数可以从 size 中获取，而 Object 的键值对个数只能手动计算。
* Object 都有自己的原型，原型链上的键名有可能和你自己在对象的设置上的键名产生冲突。
