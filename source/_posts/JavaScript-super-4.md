---
title: JavaScript进阶系列-类型转换、隐式类型转换
tags: 类型转换
categories: JavaScript进阶系列
abbrlink: 38075
date: 2019-04-29 09:52:57
---

JavaScript 进阶系列-类型转换、隐式类型转换

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

|   参数    |             结果              |
| :-------: | :---------------------------: |
| undefined |          "undefined"          |
|   null    |            "null"             |
|  boolean  |      "true" 或者 "false"      |
|  number   | 数字作为字符串。比如，"1.765" |
|  string   |           无需转换            |
|    []     |              ""               |
|   [5,2]   |             "5,2"             |
|    {}     |       "[object Object]"       |
| Symbol()  |          "Symbol()"           |

# 转换为数字

ECMAScript 提供了两种把非数字的原始值转换成数字的方法，即 parseInt() 和 parseFloat()
。
只有对 String 类型调用这些方法，它们才能正确运行；对其他类型返回的都是 NaN。

|   参数    |                    结果                     |
| :-------: | :-----------------------------------------: |
| undefined |                     NaN                     |
|   null    |                     +0                      |
|  boolean  |       true 被转换为 1,false 转换为+0        |
|  number   |                  无需转换                   |
|  string   | 由字符串解析为数字。例如，"324"被转换为 324 |
|    []     |                     +0                      |
|    [5]    |                      5                      |
|    {}     |                     NaN                     |
|  Symbol   |                    报错                     |

# 转换为 Boolean

|   参数    |              结果              |
| :-------: | :----------------------------: |
| undefined |             false              |
|   null    |             false              |
|  boolean  |            无需转换            |
|  number   | +0,-0 转换为 false,其他为 true |
|  string   |     ''为 false,其他为 true     |
|    []     |              true              |
|    {}     |              true              |
|  Symbol   |              true              |

# 强制类型转换

ECMAScript 中可用的 3 种强制类型转换如下：

- Boolean(value) - 把给定的值转换成 Boolean 型；
- Number(value) - 把给定的值转换成数字（可以是整数或浮点数）；
- String(value) - 把给定的值转换成字符串；

## Boolean() 函数

当要转换的值是至少有一个字符的字符串、非 0 数字或对象时，Boolean() 函数将返回 true。如果该值是空字符串、数字 0、undefined 或 null、NaN，它将返回 false。

## Number() 函数

Number() 函数的强制类型转换与 parseInt() 和 parseFloat() 方法的处理方式相似，只是它转换的是整个值，而不是部分值。

## String() 函数

String() 它可把任何值转换成字符串。

# 隐式类型转换

## 强类型和弱类型

强类型语言要求变量必须先定义后使用，而且除非强制类型转换，否则不会改变变量类型。
弱类型语言不要求声明的对象声明变量类型，在使用的时候根据场景进行判断使用哪种类型，会进行隐式类型转换。

JavaScript 默认自动转换，没有任何警告
隐式类型转换常见场景

## 自动转换 Boolean

例如 if 语句 或者其他需要 Boolean 的地方

```
if (表达式){}
```

## 运算符中的隐式类型转换

### 四则运算符

在非 Numeber 类型进行数学运算符 - \* / 时，会先将非 Number 转换成 Number 类型。
`+` 运算符要考虑字符串的情况，在操作数中存在字符串时，优先转换成字符串，

`+` 运算符其中一个操作数是字符串的话，会进行连接字符串的操作。

```
1+'2' // '12'
```

`+` 操作符的执行顺序是：

- 当一侧操作数为 String 类型，会优先将另一侧转换为字符串类型。
- 当一侧操作数为 Number 类型，另一侧为原始类型，则将原始类型转换为 Number 类型。
- 当一侧操作数为 Number 类型，另一侧为引用类型，将引用类型和 Number 类型转换成字符串后拼接。

### 比较运算符

常见比较运算符

> < >= <=

如果是对象，就通过 toPrimitive 转换对象。
如果是字符串，就通过 unicode 比较大小。

## 对象

只有在 JavaScript **表达式**或**语句**中需要用到数字或字符串时，对象才被隐式转换。

当需要将对象转换为数字时，需要三个步骤

- 调用 valueOf()。如果结果是原始值（不是一个对象），则将其转换为一个数字。

```
3*{valueOf:function () { return 5 }} // 15
```

- 否则，调用 toString() 方法。如果结果是原始值，则将其转换为一个数字。

```
3*{toString:function () { return 5 }} // 15
```

- 否则，抛出一个类型错误。

```
3*{toString:function () { return {} }} //TypeError: C
】annot convert object to primitive value
```

参考

[ECMAScript 类型转换](http://www.w3school.com.cn/js/pro_js_typeconversion.asp)

[JavaScript 的怪癖 1：隐式类型转换](https://justjavac.com/javascript/2013/04/08/javascript-quirk-1-implicit-conversion-of-values.html)

问题：可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用？

问题：{} + {} = ？

"[object Object][object object]"

[JavaScript 中,{}+{}等于多少?](https://justjavac.com/javascript/2012/12/20/object-plus-object.html)

常见错误使用：false

```
Boolean('false') // true
Boolean('undefined') // true
// 这里他们都是字符串
```

问题:如何让：a == 1 && a == 2 && a == 3

```
const a = {
  value:[3,2,1],
  valueOf: function(){this.value.pop()}
}
```
