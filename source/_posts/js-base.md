---
title: javascript 基础
date: 2018-12-26 09:03:29
tags: 原始类型
categories: JavaScript
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

## 从内存来看 null 和 undefined 本质的区别是什么？

值 null 是一个字面量，它不像 undefined 是全局对象的一个属性。null 是指变量未指向任何对象，所以常用来将对象置空，释放对象的内存。但是它是存在的，只不过没有类型和值。


undefined 是全局对象的一个属性。一个没有被赋值的变量的类型是 undefined 。

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
[mdn原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

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

实现instanceof 
要点：
* obj 是null 或者不是对象的时候返回 false
* 每个实例对象都有一个私有属性( __proto__ )指向它的原型对象Prototype
* 该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。
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

## Object.getPrototypeOf(object)

在 ES5 中，如果参数不是一个对象类型，将抛出一个TypeError异常。在 ES2015 中，参数会被强制转换为一个 Object。

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
因为 f2 是被直接调用的，而不是作为对象的属性或方法调用的。

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
当一个函数在其主体中使用 this 关键字时，可以通过使用函数继承自 function.prototype 的 call 或 apply 方法将this 绑定到调用中的特定对象。也就是调用 call 或 apply 方法绑定到调用的对象上。
```
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 第一个参数是作为 'this' 使用的对象
// 后续参数作为参数传递给函数调用
// call(obj,...arguments)
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// 第一个参数也是作为 'this' 使用的对象
// 第二个参数是一个数组，数组里的元素用作函数调用中的参数
// apply(obj,[...arguments])
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```

注：使用 call 和 apply 时，如果传递给 this 的不是一个对象， javascript 会使用相关构造函数将其转换为对象。

es5 引入了 function.prototype.bind 。调用f.bind(someObject)会创建一个和 f 具有相同函数体和作用域的函数，但是在这个*新函数*中， this 被永久性的绑定到了 bind 第一个参数上。

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

es6 箭头函数：this 与封闭词法环境中的 this 保持一致。全局代码中是 window 。



当代码被内联 on-event 函数调用时，this 指向监听器当前所在的 dom 。
注意: 只有最外层的 this 是这样设置的。
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

# 深浅拷贝

[assign详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
## 概念
深拷贝：对象类型赋值时新建一个对象，分配了内存，指向不同的对象互不干扰
浅拷贝：对象类型赋值时复制了地址，指向同一个对象，改了一个另外一个也发生改变

浅拷贝通过`Object.assign`实现
```
针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
```
## 语法
### Object.assign(target, ...sources)
参数
target
目标对象。
sources
源对象。
### 返回值
目标对象。

深拷贝通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决。[参考](https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5bed40d951882545f73004f6)
但是也有局限性
* 会忽略 undefined
* 会忽略 symbol
* 不能序列化函数
* 不能解决循环引用的对象

推荐使用[lodash的深拷贝函数](https://lodash.com/docs#cloneDeep)

# 构造函数
如果函数用来初始化(使用new运算符)一个新建的对象，称之为构造函数
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
# 绝对路径与相对路径

```
相对路径
./ 当前目录
../ 父级目录
/ 当前项目的根目录
```

# location

属性
```
location.search //返回`?`以及`?`以后的部分
location.hash // 返回一个URL的锚部分
location.host // 返回一个URL的主机名

```

# 判断一个对象是否有值

```
Object.keys(obj).length // es6
```

# Number 和 0

# 奇怪的用法

```
// 转义
function htmlEncodeJQ ( str ) {
    return $('<span/>').text( str ).html();
}
// 解码
function htmlDecodeJQ ( str ) {
    return $('<span/>').html( str ).text();
}
```

# 防抖和节流

```
const debounce = (func, wait = 50)=>{
  let timer,args
  return  function(...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{func.apply(this, args)}, wait)
  }
}
```

这是一个简单的防抖函数，只能在延时函数执行时执行动作。如果想立即执行动作，需要添加immediate选项用于表示是否立即执行。
并且在执行时间间隔不会执行下一个动作。
```
const debounce = (func, wait = 50, immediate=true)=>{
  let timer,args
  return  function(...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{func.apply(this, args)}, wait)
    if(immediate){
      func.apply(this, args)
      clearTimeout(timer)
    }
  }
}
```
```
/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce (func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

节流：多次执行优化成没隔一段时间执行一次
```
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
      // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
```

# JavaScript标准库

## decodeURI() 解码

## in 

# Event loop

javaScript 的并发模型基于“事件循环”。

在了解执行栈之前先来了解一些概念

## 运行时概念( runtime concepts)

如图
{% asset_img 微信截图_20190424215443.png 堆栈模型 %}

## 栈(stack)

先进后出

## 堆(heap)

对象被分配在一个堆中，是一个用于表示一大块非结构化的内存区域

## 队列

先进先出

## 什么事执行栈(调用栈)？

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

异步函数被分为 *宏任务* 和 *微任务*

宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

微任务包括 process.nextTick ，promise ，MutationObserver，其中 process.nextTick 为 Node 独有。

Event Loop 的执行顺序

* 执行一个宏任务（栈中没有就从事件队列中获取）

* 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中

* 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）

* 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染

* 渲染完毕后，JS引擎线程继续，开始下一个宏任务（从宏任务队列中获取）


事件循环模型的特性，永不阻塞

[总结：JavaScript异步、事件循环与消息队列、微任务与宏任务](https://juejin.im/post/5be5a0b96fb9a049d518febc)

# 常见的内存泄漏

1.意外的全局变量

未定义的变量会在全局对象创建一个新变量，如下。

function foo(arg) {
    bar = "this is a hidden global variable";
}

创建的变量随着 window 而一直存在知道 window 被销毁才能被释放。

解决办法：严格模式，注意代码规范，使用完毕之后置空

2.被遗忘的计时器或回调函数

计时器setInterval

```
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource);
    }
}, 1000);
```

节点 node 随着定时器一直存在，node 被移除它所占用的内存也不会被销毁，除非定时器被销毁。

```
var node = document.getElementById('node');
function onClick(event) {
    node.innerHTML = 'text';
}

node.addEventListener('click', onClick);
```

添加监听事件属于异步？
上面添加观察者的例子，形成循环引用，无法释放内存，现代浏览器引擎通过*标记清除算法*已经可以识别这类循环引用了。
解决办法移除监听事件 removeEventListener 。


## 闭包



