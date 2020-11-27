---
title: "JavaScript进阶系列- == vs ===, typeof vs instanceof"
tags: "== vs ===, typeof vs instanceof"
categories: JavaScript进阶系列
abbrlink: 64439
date: 2019-04-30 14:50:38
---

JavaScript 进阶系列- == vs ===, typeof vs instanceof

<!-- more -->

# 严格相等 ===

严格相等进行比较前不会进行隐式转换。

比较步骤：

- 首先判断是不是相同类型，如果不是则是不严格相等
- 类型相同，值也相同并且不是 number 类型时，两个值全等
- number 类型时，如果两个值都不是 NaN，值相同时或者两个值分别为 +0 和 -0，两个值全等。

```
NaN === NaN // false
```

# 非严格相等 ==

在比较前进行类型转换成相同类型的，然后进行严格相等校验。

在类型转换时有些规律

- number 和 string 进行比较时会先转换成 number
- number 和 boolean 进行比较时会先转换成 number
- string 和 boolean 进行比较时会先转换成 number
- 其中一方是 Object 会先转换成原始值，在进行 == 判断。

整体的判断流程就是

- 类型是否相同，相同的话判断值是否相同。
- 其中一方是 null 或者 undefined , null 和 undefined 只和自己相等，NaN 不和自己相等。
- 其中一方是 boolean ，将 boolean 转换成 number 。
- 其中一方是 Object 将根据另外一个的类型转换成对应的类型。

[] == ![] 现在应该能正确判断了吧

首先是右边是个表达式，由前两节可知道 [] 转换成 boolean 为 true ,非运算之后就是 false, 此时的左边是 object 右边是 boolean ,右边执行第三步 为 0， 左边是对象，先调用 valueOf 返回 [], 在调用 toString() 返回 "", "" 转换成数字 0， 所以 0===0。

| 比较值列表  |
| :---------: | :---: | :----: | :-----------------: | :-------------------------: | :---------------------------: | :---------------------------: |
| \|Undefined | Null  | Number |       String        |           Boolean           |            Object             |
|  Undefined  | true  |  true  |        false        |            false            |             false             |          IsFalsy(B)           |
|    Null     | true  |  true  |        false        |            false            |             false             |          IsFalsy(B)           |
|   Number    | false | false  |       A === B       |      A === ToNumber(B)      |       A=== ToNumber(B)        |      A=== ToPrimitive(B)      |
|   String    | false | false  |  ToNumber(A) === B  |           A === B           |  ToNumber(A) === ToNumber(B)  |      ToPrimitive(B) == A      |
|   Boolean   | false | false  |  ToNumber(A) === B  | ToNumber(A) === ToNumber(B) |            A === B            | ToNumber(A) == ToPrimitive(B) |
|   Object    | false | false  | ToPrimitive(A) == B |     ToPrimitive(A) == B     | ToPrimitive(A) == ToNumber(B) |            A === B            |

- ToNumber(A) 尝试在比较前将参数 A 转换为数字，这与 +A（单目运算符+）的效果相同。
- ToPrimitive(A)通过尝试调用 A 的 A.toString() 和 A.valueOf() 方法，将参数 A 转换为原始值（Primitive）。

# typeof vs instanceof

## typeof 判断原始类型的类型

```
// Numbers
typeof 1 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写,意思是"不是一个数字"
typeof Number(1) === 'number'; // 不要这样使用!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof返回的肯定是一个字符串
typeof String("abc") === 'string'; // 不要这样使用!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 不要这样使用!

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof blabla === 'undefined'; // 一个未定义的变量,或者一个定义了却未赋初值的变量

// Objects
typeof {a:1} === 'object';

// 使用Array.isArray或者Object.prototype.toString.call方法可以从基本的对象中区分出数组类型
typeof [1, 2, 3] === 'object';

typeof new Date() === 'object';

// 下面的容易令人迷惑，不要这样使用！
typeof new Boolean(true) === 'object';
typeof new Number(1) ==== 'object';
typeof new String("abc") === 'object';

// 函数
typeof function(){} === 'function';
typeof Math.sin === 'function';

```

typeof 对于 null date array object RegExp 返回值都是 object 在做类型比较的时候不是很精确。

### typeof null

原因： 历史原因，在最初版本 null 的内存存储信息是 000 开头，被认为是对象。

## instanceof 判断对象的类型

语法：

```
typeof operand
operand:对象或者原始值

instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
object instanceof constructor
object: 要检测的对象  // 必须是对象呢
constructor: 某个构造函数
```

instanceof 典型的用法是判断是否继承关系，用于测试对象是不是特定构造函数的实例。

实现 instanceof
要点：

- obj 是 null 或者不是对象的时候返回 false
- 每个实例对象都有一个私有属性( **proto** )指向它的原型对象 Prototype
- 该原型对象也有一个自己的原型对象( **proto** ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

```
function myinstanceof(obj, constructor){
  if(obj === null || typeof obj !== 'Object'){ // 去除Null和不是对象的情况
    return false
  }
  // 获得构造函数的原型对象
  const prototype = constructor.prototype
  // 获取对象的原型
  let _proto = obj.__proto__ // 推荐使用 Object.getPrototypeOf(object)
  while(true){
    if(_proto === null){ // 最后一个环节
      return false
    }
    if(_proto === prototype){
      return true
    }
    _proto = obj.__proto__
  }
}
```

参考：
[mdn 原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
[浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/5b0b9b9051882515773ae714)
[mdn instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

问题：

```
 var y = 1, x = y = typeof x;
 x;
```

表达式是从右往左的，x 由于变量提升，类型是 undefined，所以 x=y="undefined"。

```
  (function f(f){
    return typeof f();//"number"
  })(function(){ return 1; });
```

传入的参数为 f 是 function(){ return 1; }这个函数。通过 f()执行后，得到结果 1，所以 typeof 1 返回"number"。这道题很简单，主要是区分 f 和 f()。

```
'use strict'
var foo = {
    bar: function() { console.log(this);return this.baz; },
    baz: 1
  };
  (function(){
    return typeof arguments[0]();//"undefined" function() { return window.baz; }
  })(foo.bar); // function() { return this.baz; }
```

this 当前执行代码的环境对象，这里的执行环境是自执行函数，他的 this 指向 Arguments。

```
var foo = {
    bar: function(){ console.log(this);return this.baz; },
    baz: 1
  }
  typeof (f = foo.bar)();//undefined
```

这里的执行环境是自执行函数，他的 this 指向 window

```
var f = (function f(){ return "1"; }, function g(){ return 2; })();
typeof f;//"number"
```

自执行函数和 **分组选择符** 的使用, 分组选择符通过 , 隔开取最后一个值

## 常见面试题

```
null == undefined // true
null === undefined // false

0 == '0'// true
false == '0'// true
[] == '0' // false
[] == '' // true

```

typeof null == 'object'

有时候会让你判断下面代码有什么问题

```
if (typeof obj === 'object')
```

obj 为 null 时为真
