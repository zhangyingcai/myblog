---
title: JavaScript进阶系列-原始类型
tags: 原始类型
categories: JavaScript进阶系列
abbrlink: 30131
date: 2019-04-28 14:28:17
---
JavaScript进阶系列-原始类型
<!-- more -->

6种原始类型
string
number
boolean
null
undefined
symbol [ES6新增]

* number  9527
* string '9527',"9527"
* boolean true,false
* Null null
* undefined undefined
* symbol （ECMAScript 6新定义）

特性：
* 基本类型的*值*不能被改变
* boolean 表示一个逻辑实体，可以有两个值：true 和 false。
* null 类型只有一个值： null
* 一个没有被赋值的变量会有个默认值 undefined
* symbol 是唯一的并且是不可更改的，类似 C 语言里的枚举类型

ps: 拼接字符串，数字相加减这些都是返回一个新的*值*，然后将这个值给予你的变量

```
var bar = "baz";
console.log(bar);               // baz
var UCbar = bar.toUpperCase();
console.log(bar);               // baz
console.log(UCbar);             // BAZ
```

这些是对于基本类型是不会改变值的，对于引用类型就不同了，下节详细了解。

```
let foo = 5;

// 定义一个貌似可以改变基本类型值的函数
function addTwo(foo) {
   foo += 2;
}
addTwo(foo);
console.log(foo) // 5
```

## JavaScript中的基本类型包装对象

除了 null 和 undefined 之外，所有基本类型都有对应的包装对象。

string | String
number | Number
boolean | Boolean
symbol | Symbol

## Symbol

* Symbol() 来创建 Symbol 类型，每个 Symbol() 返回的值都是唯一的。

```
const symbol1 = Symbol();
const symbol2 = Symbol();
symbol1 === symbol2 // false
```

* Symbol() 参数用来放 Symbol 的描述，是一个可选的字符串。无法使用 new 运算符。
```
const symbol = new Symbol(); // TypeError:Symbol is not a constructor

```

* Symbol() 创建的 Symbol 类型不是全局的，需要全局的需要使用 Symbol.for() 方法和  Symbol.keyFor()。

* Symbols 在 for...in 迭代中不可枚举。作为对象的属性时，使用 Object.getOwnPropertySymbols() 获取，Object.getOwnPropertyNames() 则不行。

```
var obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (var i in obj) {
   console.log(i); // logs "c" and "d"
}
```

* 当使用 JSON.strIngify() 时以 symbol 值作为键的属性会被完全忽略。

```
JSON.stringify({[Symbol("foo")]: "foo"});                 // '{}'
```

ToDo:如下图发现一个有趣的事,关于 new 的实现。new 新创建一个对象实例。
{% asset_img 微信截图_20190428150619.png %}

问题：从内存来看 null 和 undefined 本质的区别是什么？

答：值 null 是一个字面量，它不像 undefined 是全局对象的一个属性。null 是指变量未指向任何对象，所以常用来将对象置空，释放对象的内存。但是它是存在的，只不过没有类型和值。

undefined 是全局对象的一个属性。一个没有被赋值的变量的类型是 undefined 。

问题：规定了几种语言类型？

问题：Symbol类型在实际开发中的应用、可手动实现一个简单的 Symbol？

问题：基本类型对应的内置对象，以及他们之间的装箱拆箱操作？

问题：null == undefined ? why ?