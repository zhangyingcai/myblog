---
title: JavaScript进阶系列-Event Loop
tags: Event Loop
categories: JavaScript进阶系列
abbrlink: 18146
date: 2019-04-25 10:43:57
---

前端工程师必须要懂得33个知识点 Event Loop

<!-- more -->

# Event loop

javaScript 的并发模型基于**事件循**。

在了解执行栈之前先来了解一些概念

## 运行时概念( runtime concepts)

如图
{% asset_img 微信截图_20190424215443.png 堆栈模型 %}

## 栈(stack)

先进后出

## 堆(heap)

对象被分配在一个堆中，是一个用于表示一大块非结构化的内存区域

## 队列(queue)

先进先出

## 什么是执行栈(调用栈)？

执行栈，就是代码执行期间调用函数形成的调用栈。是引擎在追踪函数执行流的一种机制。
当执行环境中调用了多个函数时，我们能够追踪到哪个函数正在执行，执行的函数又调用了哪个函数。

todo 什么时间创建栈？个数限制？

答：javaScript 是一门单线程的语言，这意味着它只有一个调用栈。

单个栈的数量是有限制的
```
function func() {
  func()
}
func()
//Maximum call stack size exceeded
```

[调用栈](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)
[[译] JavaScript 如何工作：对引擎、运行时、调用堆栈的概述](https://juejin.im/post/5a05b4576fb9a04519690d42)

* 当脚本要执行一个函数时，引擎把该函数添加到栈中并执行
* 任何被这个函数调用的函数会进一步添加到调用栈中，并且会运行到他们被上个程序调用的位置
* 当函数运行结束后，引擎将他从调用栈中取出，并在主代码列表中继续执行代码
* 如果栈调用的空间比分配给它的内存空间大，则会导致"栈溢出"

## Event Loop 中异步代码的执行顺序？ Event Loop 是什么？

上面说到什么是执行栈，也就是说 javaScript 引擎在执行代码的时候，遇到函数会将函数压入执行栈，函数执行完弹出栈。

但是遇到异步代码怎么办？

异步代码会被挂起，并在需要执行的时候放到队列中，宏任务放到宏任务队列队尾，微任务放到微任务队列队尾，当当前执行栈为空时，从队列中获取需要执行的代码并执行。
本质上异步还是同步。

异步函数被分为 **宏任务** 和 **微任务**

宏任务包括 script (同步代码) ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

微任务包括 process.nextTick ，promise ，MutationObserver，其中 process.nextTick 为 Node 独有。

Event Loop 的执行顺序

* 执行一个宏任务（栈中没有就从事件队列中获取，同步代码也是宏任务）

* 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中

* 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）

* 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染

* 渲染完毕后，JS引擎线程继续，开始下一个宏任务（从宏任务队列中获取）


事件循环模型的特性，永不阻塞

# 当 eventloop 遇到了  promise

```
function testSometing() {
    console.log("2");
    return "5";
}
function testAsync() {
    console.log("7");
    return Promise.resolve("8");
}
function test() {
    console.log("1");
    new Promise((resolve) => {
        resolve(Promise.resolve(testSometing()));
    }).then((val) => {
        const v1 = val
        console.log(v1);
        new Promise((resolve) => {
            resolve(Promise.resolve(testAsync()));
        }).then((val) => {
            const v2 = val
            console.log(v2);
            console.log(v1, v2,'5,8');
        })
    })
}
test();
var promise = new Promise(
    (resolve) => {
        console.log("3");
        resolve("6");
    });//3
promise.then((val) => console.log(val));
console.log("4")
```
```
function testSometing() {
    console.log("2");
}
function testAsync() {
    console.log("7");
    return Promise.resolve("8");
}
function test() {
    console.log("1");
    new Promise((resolve) => {
        resolve(Promise.resolve(testSometing()));
    }).then((val) => {
        const v1 = val
        console.log(v1);
        new Promise((resolve) => {
            resolve(Promise.resolve(testAsync()));
        }).then((val) => {
            const v2 = val
            console.log(v2);
            console.log(v1, v2,'5,8');
        })
    })
}
test();
var promise = new Promise(
    (resolve) => {
        console.log("3");
        resolve("6");
    });//3
promise.then((val) => console.log(val));
console.log("4")
```

[总结：JavaScript异步、事件循环与消息队列、微任务与宏任务](https://juejin.im/post/5be5a0b96fb9a049d518febc)

问题：为何 try里面放 return， finally还会执行，理解其内部机制？

问题：JavaScript如何实现异步编程，可以详细描述 EventLoop机制

问题：宏任务和微任务分别有哪些？

问题：可以快速分析一个复杂的异步嵌套逻辑，并掌握分析方法

问题：使用 Promise实现串行

问题：Node与浏览器 EventLoop的差异

问题：如何在保证页面运行流畅的情况下处理海量数据