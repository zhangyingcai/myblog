---
title: 闭包
tags: 闭包
categories: JavaScript进阶系列
abbrlink: 7415
date: 2019-04-30 15:06:48
---

JavaScript进阶系列 - 闭包

<!-- more -->

# 闭包(Closures)

在了解闭包之前，有一些概念必须了解，这些是形成闭包的先决条件。

## 词法作用域 (lexical scoping)

```
var age = 10;
function Tom(){
    var name = 'Tom';
    function say(){
        console.log('My name is '+name);
        console.log('My age is '+age);
        console.log(person);
    }
    say();
}
//Tom();
function Person(){
    var person = 'person';
    Tom();
}
Person();
// My name is Tom
// My age is 10
// error: person is not defined
```

```
var age = 10;
function Person(){
    var person = 'person';
    function Tom(){
        var name = 'Tom';
        function say(){
            console.log('My name is '+name);
            console.log('My age is '+age);
            console.log(person);
        }
        say();
    }
    Tom();
}
Person();
// My name is Tom
// My age is 10
// person
```

上面 Tom() 创建了一个局部变量 name 和一个名为 say() 的函数， say() 是定义在 Tom() 里的内部函数，仅在该函数体内可用。say() 内没有自己的局部变量，然而它可以访问到外部函数的变量，所以 say() 可以使用父函数 Tom() 中声明的变量 name 。但是，如果有同名变量 name 在 say() 中被定义，则会使用 say() 中定义的 name 。

看到这里你可能就有疑问了，词法作用域到底是什么呢？

它就是指在函数嵌套中，变量解析的一种规则，根据变量在代码中声明的位置，嵌套的函数在查找变量时，如果自己没有声明，那么可以访问外部的变量。

上面两个例子还涉及到 this 的问题。

## 闭包

定义：函数 A 有一个函数 B ，函数 B 引用了函数 A 的变量， 函数 B 就叫做闭包。

### 闭包的使用场景

设计私有的方法和变量，将变量和方法保存在内存当中作为私有变量进行调用。

### 闭包的缺陷

缺点就是常驻内存会增大内存使用量，对页面的影响就是影响性能，使用不当还会造成内存泄漏。
闭包的处理性能也相对较弱。

### 闭包常用来构成偏函数和柯里化。

下面是偏函数的示例，柯里化和偏函数稍微有些区别，放到单独一个模块来说。

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

### 解决循环中创建闭包的问题


```
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

这是在循环中创建闭包的常见错误，这段代码会输出五个6，原因是给 setTimeout 的函数是闭包，循环六次形成六个闭包，这六个闭包在循环环境中被创建，共享了一个**词法作用域**，这个作用域存在一个变量 i ，异步执行的时候循环早已经结束，此时 i = 6 所以输出的都是 6 。

方法1： let ,而且这样不会产生闭包

```
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

方法2：匿名函数

```
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

方法三： 使用闭包

```
function callback(j){
    return function () {
        console.log(j)
    }
}
for (var i = 1; i <= 5; i++) {
  setTimeout(callback(i), i * 1000)
}
```

方法四：setTimeout 的第三个参数

```
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },i * 1000,i)
}
```

变种：

```
<body>
    <ul>
        <li>0</li>
        <li>1</li>
        <li>2</li>
    </ul>
    <script>
        var node = document.querySelectorAll('ul li')
        for(var i = 0;i<node.length;i++){
            node[i].addEventListener('click',function(){
                alert('click'+i)
            })
        }
    </script>
</body>
```

addEventListener 是异步事件 所以最后都是 3 ，是因为没有块级作用用域导致，最后循环出来每个事件输出的都是全局 i

解决办法1：

```
var node = document.querySelectorAll('ul li')
for(var i = 0;i<node.length;i++){
    (function(i){
        node[i].addEventListener('click',function(){
            alert('click'+i)
        })
    })(i)
}
```

解决办法2：
```
 <body>
    <ul>
        <li>0</li>
        <li>1</li>
        <li>2</li>
    </ul>
    <script>
        var node = document.querySelectorAll('ul li')
        Array.from(node).forEach(function(nodeItem,index){
            nodeItem.addEventListener('click',function(){
                alert('click'+index)
            })
        })
    </script>
</body>
```

这里用 forEach 也行成了一个所谓的闭包， forEach 里的执行函数也行成了一个闭包，每个执行体里，index 都是一局部作用域，那为什么用 array,from 呢，我们也可以用 [].slice.call(node) 我们类数组对象转化成真正的数组，因为有些低版本的浏览器不支持摆了。

### 性能

闭包在处理速度和内存消耗方面都有比较大的开销。

例如：在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是，每个对象的创建）。
```
function Persion(name,age){
    this.name = name.toString();
    this.age = Number(age) || 0;
    this.getName = function(){
        console.log(this.name);
    };
    this.getAge = function(){
        console.log(this.age);
    }
}
```
应该这样做

```
function Persion(name,age){
    this.name = name.toString();
    this.age = Number(age) || 0;
}
Persion.prototype.getName = function(){
    console.log(this.name);
};
Persion.prototype.getAge = function(){
    console.log(this.age);
};
```

现在统一将 callback 函数换成了 promise 。

# 面试题

## 1
闭包和变量提升

```
(function(){var a = b =1;})()
console.log(a,b)
```

## 2

```
const arr = [10,12,11,21];
for (var i=0; i<arr.length; i++) {
  setTimeout(function(){
    console.log(i, arr[i])
  }, 300)
}
// 4个相同的 4 undefined
```
如何解决

ES5

### 1
```js
const arr = [10,12,11,21];
for (var i=0; i<arr.length; i++) {
  (function(j){
    setTimeout(function(){
        console.log(j, arr[j])
    }, 300)
  })(i)
}
```

### 2

```js
const arr = [10,12,11,21];
for (var i=0; i<arr.length; i++) {
    setTimeout(function(j){
        console.log(j, arr[j])
    }, 300, i)
}
```

ES6

```js
const arr = [10,12,11,21];
for (let i=0; i<arr.length; i++) {
  setTimeout(function(){
    console.log(i, arr[i])
  }, 300)
}
```

# 深入理解函数

## 函数

函数，只被定义一次，但是可能被调用或者执行任意次。
JavaScript 函数是参数化的，函数的定义会包括一个称为形参的标识符列表，这些参数在函数中会像局部变量一样工作。
函数调用会给形参提供实参的值，函数使用实参的值来计算返回值，作为该函数调用表达式的值。
除了形参之外，每次调用还会有另外一个值————本次调用的上下文，这就是 this 关键字的值。
如果函数挂载在一个对象上，作为一个对象的属性，我们就称它为该对象的一个方法。
当通过这个对象来调用函数时，该对象是此次调用的上下文，也就是该函数 this 的值。
用于初始化一个新创建的对象的函数称为构造函数。

JavaScript 里，函数即对象，可以把函数赋值给变量，作为参数传递给函数，作为属性，调用方法。

方法调用和函数调用有一个重要的区别，即：调用上下文。任何函数作为方法调用实际上都会传入一个隐式的实参。这个实参是一个对象，方法调用的母体就是这个对象。

作为函数调用，其this值不是全局对象，就是 undefined 。

构造函数调用，如果函数或者方法调用之前有关键字 new ，它就构成构造函数调用。构造函数调用和普通的函数调用以及方法调用在实参处理、调用上下文和返回值方面都有不同。

```js
var o = new Object();
var o = new Object;
```
JavaScript 构造函数调用是允许省略实参列表和圆括号的。