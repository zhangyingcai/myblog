---
title: 闭包
date: 2019-04-30 15:06:48
tags: 闭包
categories: JavaScript进阶系列
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
