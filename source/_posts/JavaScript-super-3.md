---
title: JavaScript进阶系列-引用类型
date: 2019-04-28 14:29:20
tags: 值类型和引用类型
categories: JavaScript进阶系列
---

JavaScript进阶系列-引用类型

<!-- more -->

> 引用类型通常叫做类（class），也就是说，遇到引用值，所处理的就是对象。

有句话叫万物皆对象不是没有道理的。现在来了解下 JavaScript 的 Object 对象。
ECMAScript 中的所有对象都由这个对象继承而来，Object 对象中的所有属性和方法都会出现在其他对象中，所以理解了 Object 对象，就可以更好地理解其他对象。

属性
* **constructor** 对创建对象的函数的引用（指针）。对于 Object 对象，该指针指向原始 Object() 函数
* **Prototype** 对该对象的原型对象的引用。 通常用来获取对象的原型对象,默认返回 Object 对象的一个实例。
方法
* **-(String)** 是否有某个属性
* **IsPrototypeOf(object)** 判断该对象是否是某个对象的原型(父是该对象)
* **PropertyIsEnumerable** 返回一个 boolean 值，**是否可枚举(enumberable)**
* **ValueOf()** 返回该对象的原始值

# JavaScript 对象

* Array
* Number
* Boolean
* Date
* String
* Math
* RegExp
* Global

# Browser 对象

* Window
* Navigator
* Screen
* History
* Location

## 总结

内存角度来讲

原始类型保持在栈中，占用固定内存用来保持原始值。
引用类型保存在堆中，变量只负责保存引用类型的地址。

**赋值**语句执行区别，赋值语句是将变量保存的值复制一份到新的变量中，原始类型保存的是值，而引用类型保存的是引用类型的引用。

原始类型

* typeof 来检查原始类型类型( typeof null // object)

引用类型
* object instanceof constructor 来检查引用类型的原型
* new constructor 创建引用类型实例

```
new String(123) instanceof String // true
```
{% asset_img 微信截图_20190428163702.png String %}

如上图 String 对象和 Array 对象有些类似是一个数组+length属性，不过可以观察原型链，他们实现还是不一样的，而且对象原型都 Object 。

[对象参考手册](http://www.w3school.com.cn/js/js_reference.asp)

问题：对象的底层数据结构是什么？

答：上面的对象的数据结构。

问题：JavaScript中的变量在内存中的具体存储形式？

问题：理解值类型和引用类型？

问题：至少可以说出三种判断 JavaScript数据类型的方式，以及他们的优缺点，如何准确的判断数组类型？