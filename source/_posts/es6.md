---
title: es6
date: 2019-01-17 09:16:43
tags: es6
---

es6笔记

<!-- more -->

# 变量提升

英文：Hoisting

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

