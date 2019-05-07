---
title: JavaScript进阶系列-偏函数、柯里化、Compose 和 Pipe
date: 2019-04-30 15:06:54
tags: JavaScript
categories: JavaScript进阶系列
---
JavaScript进阶系列-偏函数、柯里化、Compose 和 Pipe
<!-- more -->

# 偏函数

概念：柯理化固定了你函数的某一个或几个参数，返回一个新的函数，接收剩下的参数, 参数个数可能是 1 个，也可能是 2个，甚至更多，调用方式由 f(a, b) 转换为 f(b) 方式调用, a 已经作为参数包装到偏函数当中。

偏函数的实现和 bind 实现方式类似。

```
function mul(a, b){
    return a * b;
}

// 实现一个双倍的函数
// 绑定上下文 this 为 null
let double = mul.bind(null, 2);

double(3) // 6
```

这里利用了闭包的原理，double 函数实际上是
```
function double(...args){
    var a = 2;
    mul(a, ...args)
}
```
这样做的好处是可以将一些参数给包装到函数中，后面只需要调用其他参数，不用重复传入包装的参数，包装的参数可以有多个。

```
// func 目标函数
// argsBound 要包装的参数，可以有多个
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

function mul(a, b){
    return a * b;
}

let partialMul = partial(mul, 5)
partialMul(2) // 10
```
loadsh 库也提供了 _.partial 的实现。

# 函数的柯里化

概念：柯理化是把一个有 n 个参数的函数变成 n 个只有 1 个参数的函数，调用方式由 f(a, b, c) 转换为 f(a)(b)(c) 方式调用。

```
function sum(a, b){
    return a + b;
}

// 柯里化函数
function curry(func){
    return function(a){
        return function(b){
            return func(a,b)
        }
    }
}

// 返回的是一个函数
let currySum = curry(sum);
currySum(1)(2) // 3
```

**仅针对函数参数长度固定**
柯里化需要函数有已知的参数数量是固定的。

但在JavaScript中的函数大多数实现是超越定义的，也可以让函数使用多个参数变量执行。例如 console.log() 

柯里化的高级实现，如 lodash 中的 _.curry 可以实现更复杂的功能。

总结：

* 当我们不想一次次重复传递参数时可以使用偏函数。