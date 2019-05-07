---
title: JavaScript进阶系列-类型转换、隐式类型转换
date: 2019-04-29 09:52:57
tags: 类型转换
categories: JavaScript进阶系列
---

JavaScript进阶系列-类型转换、隐式类型转换

<!-- more -->

![总纲](/2018/12/26/js-base/16716dec14421e47.png)

# 转换为字符串

ECMAScript 的 Boolean 值、数字和字符串的原始值都是伪对象，这意味着它们可以使用原型对象上面的属性和方法。

ECMAScript 定义所有对象都有 toString() 方法，无论它是伪对象，还是真对象。

```
let obj = {name:'obj'};
obj.toString(); // [object Object]

let arr = [1,2];
arr.toString(); // "1,2"

function func(){}
func.toString() // "function func(){}"

false.toString() // "false"
```

Symbol ??

# 转换为数字

ECMAScript 提供了两种把非数字的原始值转换成数字的方法，即 parseInt() 和 parseFloat()
。
只有对 String 类型调用这些方法，它们才能正确运行；对其他类型返回的都是 NaN。

# 强制类型转换

ECMAScript 中可用的 3 种强制类型转换如下：
* Boolean(value) - 把给定的值转换成 Boolean 型；
* Number(value) - 把给定的值转换成数字（可以是整数或浮点数）；
* String(value) - 把给定的值转换成字符串；

## Boolean() 函数

当要转换的值是至少有一个字符的字符串、非 0 数字或对象时，Boolean() 函数将返回 true。如果该值是空字符串、数字 0、undefined 或 null，它将返回 false。

## Number() 函数
Number() 函数的强制类型转换与 parseInt() 和 parseFloat() 方法的处理方式相似，只是它转换的是整个值，而不是部分值。

## String() 函数
String() 它可把任何值转换成字符串。

参考

[ECMAScript 类型转换](http://www.w3school.com.cn/js/pro_js_typeconversion.asp)

[JavaScript 的怪癖 1：隐式类型转换](https://justjavac.com/javascript/2013/04/08/javascript-quirk-1-implicit-conversion-of-values.html)