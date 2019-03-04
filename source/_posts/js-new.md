---
title: new操作符
date: 2019-03-04 11:23:51
tags: new
categories: JavaScript
---

js中的new操作符
<!-- more -->

# new 的作用

```
// 语法
new constructor([arguments]) // new + 构造函数（参数）

当代码 `new Foo(...)` 执行时，会发生以下事情：

一个继承自 `Foo.prototype` 的新对象被创建。
使用指定的参数调用构造函数 `Foo` ，并将 `this` 绑定到新创建的对象。`new Foo` 等同于 `new Foo()`，也就是没有指定参数列表，`Foo` 不带任何参数调用的情况。
由构造函数返回的对象就是 `new` 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）
```
```
function create(Con, ...args){
    let obj = {}
    Object.setPrototypeOf(obj, Con.prototype)
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}
```
[参考](https://juejin.im/post/5c7b963ae51d453eb173896e?from=timeline&isappinstalled=0)
* 首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
* 然后内部创建一个空对象 obj
* 因为 obj 对象需要访问到构造函数原型链上的属性，所以我们通过 setPrototypeOf 将两者联系起来。这段代码等同于 * obj.__proto__ = Con.prototype
* 将 obj 绑定到构造函数上，并且传入剩余的参数
* 判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 obj，这样就实现了忽略构造函数返回的原始值
