---
title: javascript 基础
date: 2018-12-26 09:03:29
tags: 原始类型
---

# 基础

<!-- more -->

# 原始类型

原始类型是那几种？null是对象吗？

6种   number string boolean null undefined symbol

我的理解：
* number  9527
* string '9527',"9527"
* boolean true,false
* Null null
* undefined
* symbol （ECMAScript 6新定义）

首先，原始类型存储的都是值，是没有函数可以调用的。

```
undefined.toString()
null.toString()
```
会报`Cannot read property 'toString' of null`这个错误。
此时你肯定会有意外，比如下面这种情况
{% asset_img 微信截图_20181226091322.png This is an example image %}
为什么这时候的`'1'`是可以调用这么多函数的？其实在这种情况下，`'1'`已经不是原始类型了，而是被强制转换成了`String`类型，也就是对象类型，所以可以调用`toString`函数。

除了会在必要的情况下强制转换类型以外，原始类型还有一些坑。

`number`类型是浮点类型的，在使用的过程中会遇到某些bug，比如`0.1+0.2!=0.3`。
`string`类型是不可变的，无论你在`string`类型上调用任何方法，都不会对值有改变。
除 `Object` 以外的所有类型都是不可变的，这里是值本身无法被改变。`JavaScript` 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变，然后这些类型的值被称为"原始值"。
`null`有的人会认为他是`object`,其实这是历史遗留问题。虽然`typeof null`会输出`object`。在 `JS` 的最初版本中使用的是 `32` 位系统，为了性能考虑使用低位存储变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 `Bug` 却是一直流传下来。

拓展：

最新的 `ECMAScript` 标准定义了 7 种数据类型:包括以上6种类型和object。

# 对象类型

对象类型和原始类型的不同之处？函数参数是对象会发生什么问题？

`js`中除了原始类型之外的其他的都是原始类型。
不同：原始类型存储的是值，对象类型存储的是地址。
函数参数是对象会发生，函数中修改了参数值，对象的值也跟着改变。

小题：
```
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

通过字面量创建的是一个新对象。

>在 `Javascript` 里，对象可以被看作是一组属性的集合。用对象字面量语法来定义一个对象时，会自动初始化一组属性。

# typeof vs instanceof

语法：
```
typeof operand
operand:对象或者原始值

instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
object instanceof constructor
object: 要检测的对象
constructor: 某个构造函数
```
instanceof 典型的用法是判断是否继承关系，用于测试对象是不是特定构造函数的实例。

# 类型转换


来自：掘金-前端面试之道