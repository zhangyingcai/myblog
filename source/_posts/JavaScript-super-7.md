---
title: '函数作用域, 块级作用域和词法作用域'
abbrlink: 29441
date: 2019-04-30 15:06:42
categories: JavaScript进阶系列
tags:
keywords:
description:
---

函数作用域, 块级作用域和词法作用域

<!-- more -->

首先我们要了解一些常识，重要的放前面！！！
同时也是我们学习闭包的前置条件！

# 基本知识

>作用域：作用域是程序源代码中定义变量的区域。
>作用域目的：作用域规定了如何查找、在哪查找变量的规则，也就是确定了当前执行代码对变量的访问权限。

```
//权威指南 3.10

一个变量的作用域 (scope) 是程序源代码中定义这个变量的区域。
全局变量拥有全局作用域，在 JavaScript 代码中的任何地方都是有定义的。
在函数内声明的变量只在函数体内有定义，他们是局部变量，作用域是局部的。
函数参数也是局部变量，他们只在函数体内有定义。
```

常识：

ECMAScript6之前只有全局作用域和函数作用域，let const 之后才有块级作用域

词法作用域也成为静态作用域是在代码编写时已经确定了作用域。

好了，这些是我们需要知道的知识，接下来会讲解每一个知识点。

# 作用域

最简单的解释就是：作用域规定了如何查找、在哪查找变量的规则，也就是确定了当前执行代码的访问权限

# 变量作用域

> 一个变量的作用域 (scope) 是程序源代码中定义这个变量的区域。

还有全局变量和局部变量的区分

>在全局声明的变量拥有全局作用域，在 JavaScript 代码中的任何地方都是有定义。
>在函数内声明的变量只在函数体内有定义，他们是局部变量，作用域是局部的。
>函数参数也是局部变量，他们只在函数体内有定义。
>JavaScript 是基于词法作用域的语言：通过阅读包含变量定义在内的源码就能知道变量的作用域，也就是说在写出来的时候已经确定了变量的作用域

## 注意点

在函数体内，局部变量相对于同名全局变量拥有高优先级。

```es5
var name = 'zyc';
var firstname = 'z';
function showName(){
  console.log('zyc')
}
function test(func){
  var name = 'dalao';
  firstname = 'da'
  func = function(){
    console.log('dalao')
  }
  func() // dalao
}
test(showName);
showName() // zyc
name // zyc
firstname // da
```
可以看到我们的全局变量在函数中被修改，这不是我们想要的效果，所以在函数中声明变量要使用 var ，避免覆盖全局变量。
如果没有这个全局变量，则会隐式生成一个全局变量，可以通过开启**严格模式**来消除。

```js
function test(){
  myname = 'zyc'
  var tom = 'Tom'
}
test()
console.log(myname) // zyc
console.log(tom) // ReferenceError tom is not defined
```

我们在全局环境访问函数作用域中的 tom 无法访问

```js
function test(){
  myname = 'zyc'
}
console.log(myname) // ReferenceError myname is not defined
```
```js
'use strict';
function test(){
  myname = 'zyc'
}
test()
console.log(myname) // ReferenceError myname is not defined
```

```js
function test(){
  'use strict';
  myname = 'zyc'
}
test()
console.log(myname) // ReferenceError myname is not defined
```

## 变量提升

变量未声明但是我们可以使用叫变量提升。

# 函数作用域

ECMAScript6之前只有全局作用域和函数作用域

>函数作用域：变量在声明他们的函数体以及这个函数体嵌套的任意函数体内都是有定义的。

我的理解就是函数体的子嵌套函数可以访问父函数体的变量。这种关系是可以继承的，子嵌套函数可以访问父、爷函数体的变量。

```js
function test(){
  function foo(){
    var tom = 'Tom'
    console.log(tom) // Tom
  }
  foo()
  console.log(tom) // ReferenceError Tom is not defined
}
test()
```

```
var name = 'zyc'; // 全局变量

function foo() { // 全局变量
    console.log(name);
}

foo(); // zyc

function bar() {
    var name = 2;
    foo(); // zyc 这里调用全局变量
}

bar();
```

权威指南中的例子：
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f(); // 在这里执行
}
checkscope(); // local scope
```
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()(); // 这里执行 
// local scope
```

两段代码都会打印'local scope'。

> JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f() ，这种绑定在执行 f() 时依然有效。

两段代码有什么不同呢？

# 词法作用域

词法作用域又叫静态作用域

>JavaScript 是基于词法作用域的语言：通过阅读包含变量定义在内的源码就能知道变量的作用域，也就是说在写出来的时候已经确定了变量的作用域

>全局变量在程序中始终都是有定义的。局部变量在声明它的函数体内以及所嵌套的函数内始终是有定义的。

# 作用域链

这是个抽象的概念。

如果将一个局部变量看做是自定义实现的对象的属性的话，那么每一段代码都有一个与之关联的作用域链 (scope chain)

这个作用域链可以看做是一个对象列表或者链表，这组对象定义了这段代码作用域中的变量。

当 JavaScript 需要查找变量的值的时候，会从链中的第一个对象开始查找，如果有就会直接使用这个值，如果没有就会继续查找下一个对象，如果链上不存在就会抛出一个引用错误 (ReferenceError)。

在 JavaScript 的最顶层代码中 (不包含在任何函数定义内的代码)，作用域链是由一个全局对象组成。

> 在不包含嵌套的函数体内，作用域链上有两个对象，第一个是定义函数参数和局部变量的对象，第二个是全局对象。
> 包含嵌套的函数体内，作用域链上至少有三个对象。

# 块级作用域

什么是块级作用域？
ES6 怎么引入的块级作用域？哪些？

相信这些问题都是在看块级作用域的疑惑。

块级作用域：在一些类似 c 语言的编程语言中，`{` 内的每一段代码都具有各自的作用域，而且变量在声明他们的代码段之外是不可见的。

块级作用非常严格，就是作用域之外无法访问作用域内的变量。

ES6 中规定了 let 和 const 来支持块级作用域。

同时 ES5 之前 for if switch 是不会产生作用域的，ES6 之后有些不同，需要我去查一些资料。