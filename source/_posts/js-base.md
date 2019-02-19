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

在js中类型转换只有三种情况。
* 转换成boolean
* 转换成string
* 转换成number

转换成boolean

# this

>在绝大多数情况下，函数的调用方式决定了`this`的值。`this`不能再执行期间被赋值，并且在函数每次函数被调用时`this`的值可能不会相同。
>`ES5`引入了`bind`方法来设置函数的`this`值，而不用考虑函数如何被调用的
>`ES2015` 引入了支持`this`词法解析的*箭头函数*（它在闭合的执行环境内设置`this`的值）。

全局环境

无论是否在严格模式下，在全局执行环境中`this`指向全局函数。

在严格模式下，`this`将保持他执行环境的值。如果`this`没有被环境定义，那他将保持为undefined。

```
function f1(){
  return this;
}
f1(); // window

function f2(){
  'use strict';
  return this;
}
f2(); // undefined
```
因为f2是被直接调用的，而不是作为对象的属性或方法调用的。

如果想把`this`的值从一个环境传到另一个环境，就需要使用`call`或者`apply`。

```
var obj = {a:'custom'};
var a = 'global';
function whatsThis(arg){
  return this.a;
}
whatsThis();          // 'global'
whatsThis.call(obj);  // 'custom'
whatsThis.apply(obj); // 'custom'
```
当一个函数在其主体中使用this关键字时，可以通过使用函数继承自function.prototype的call或apply方法将this绑定到调用中的特定对象。也就是调用call或apply方法绑定到调用的对象上。
```
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 第一个参数是作为‘this’使用的对象
// 后续参数作为参数传递给函数调用
// call(obj,...arguments)
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// 第一个参数也是作为‘this’使用的对象
// 第二个参数是一个数组，数组里的元素用作函数调用中的参数
// apply(obj,[...arguments])
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```

注：使用call和apply时，如果传递给this的不是一个对象，javascript会使用相关构造函数将其转换为对象。

es5引入了function.prototype.bind。调用f.bind(someObject)会创建一个和f具有相同函数体和作用域的函数，但是在这个*新函数*中，this被永久性的绑定到了bind第一个参数上。

```
function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var h = g.bind({a:'yoo'}); // bind只生效一次！
console.log(h()); // azerty

var o = {a:37, f:f, g:g, h:h};
console.log(o.f(), o.g(), o.h()); // 37, azerty, azerty
```

es6箭头函数：this与封闭词法环境中的this保持一致。全局代码中是window。



当代码被内联on-event函数调用时，this指向监听器当前所在的dom。
注意: 只有最外层的this是这样设置的。
```
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
// dom
<button onclick="alert((function(){return this})());">
  Show inner this
</button>
// 等同于
alert((function(){return this})()); // window
alert((function(){'use strict'; return this})()); // undefined
```

[参见this详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

# == 和 === 的区别

问题：`[]==![]`的结果是什么，`[]==[]`呢?

[参见比较运算符详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)

>JavaScript 有两种比较方式：严格比较运算符和转换类型比较运算符。对于严格比较运算符（===）来说，仅当两个操作数的类型相同且值相等为 true，而对于被广泛使用的比较运算符（==）来说，会在进行比较之前，将两个操作数转换成相同的类型。对于关系运算符（比如 <=）来说，会先将操作数转为原始值，使它们类型相同，再进行比较运算。

>字符串比较则是使用基于标准字典的 Unicode 值来进行比较的。

>比较操作符会为两个不同类型的操作数转换类型，然后进行严格比较。当两个操作数都是对象时，JavaScript会比较其内部引用，当且仅当他们的引用指向内存中的相同对象（区域）时才相等，即他们在栈内存中的引用地址相同。

>当比较数字和字符串时，字符串会转换成数字值。 JavaScript 尝试将数字字面量转换为数字类型的值。 首先, 一个数学上的值会从数字字面量中衍生出来，然后得到被四舍五入后的数字类型的值。
>如果其中一个操作数为布尔类型，那么布尔操作数如果为true，那么会转换为1，如果为false，会转换为整数0，即0。
>如果一个对象与数字或字符串相比较，JavaScript会尝试返回对象的默认值。操作符会尝试通过方法valueOf和toString将对象转换为其原始值（一个字符串或数字类型的值）。如果尝试转换失败，会产生一个运行时错误。
>注意：当且仅当与原始值比较时，对象会被转换为原始值。当两个操作数均为对象时，它们作为对象进行比较，仅当它们引用相同对象时返回true。

类型转换
{% asset_img 16716dec14421e47.png 类型转换 %}


# 构造函数

创建对象的两种方法：字面量方法和构造函数

```
function createPerson(name){
  this.name = name;
  this.greeting = function(){
    alert('Hi! I'm '+name+'.');
  }
}
```

# 当你输入网址的时候发生了什么

[答案在这](https://github.com/skyline75489/what-happens-when-zh_CN#html)

# http2比http1快了多少

[here](https://http2.akamai.com/demo)

```
优化了哪些？
http1请求是队头阻塞的,http2复用同一个tcp链接
http2引入了新的编码机制，并采用二进制传输
http2通过引入`帧`和`流`的方式实现多路复用
http2对header进行了压缩

新的问题
原因：使用的tcp，如果出现丢包的情况，该条线路就会进入阻塞状态，等待重传。

http3采用QUIC 

QUIC 基于 UDP 实现，是 HTTP/3 中的底层支撑协议，该协议基于 UDP，又取了 TCP 中的精华，实现了即快又可靠的协议
```