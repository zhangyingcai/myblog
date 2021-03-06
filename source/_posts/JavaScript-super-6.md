---
title: 'JavaScript进阶系列-this, call, apply 和 bind 以及箭头函数'
tags: 类型转换
categories: JavaScript进阶系列
abbrlink: 38128
date: 2019-04-30 14:50:47
---

JavaScript进阶系列-this, call, apply 和 bind 以及箭头函数

<!-- more -->

# this

当前执行代码的环境对象。

>在绝大多数情况下，函数的调用方式决定了`this`的值。`this`不能再执行期间被赋值，并且在函数每次函数被调用时`this`的值可能不会相同。
>`ES5`引入了`bind`方法来设置函数的`this`值，而不用考虑函数如何被调用的
>`ES2015` 引入了支持`this`词法解析的**箭头函数**（它在闭合的执行环境内设置`this`的值）。

无论是否在严格模式下，在全局执行环境中`this`指向全局函数。

在严格模式下，`this`将保持他执行环境的值。如果`this`没有被环境定义，那他将保持为 undefined 。

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

# call()

[mdn call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

定义：**func.apply(thisArg, ...args)**

* thisArg 在 func 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（number，string，boolean）的 this 会指向该原始值的自动包装对象。strict mode 下是 undefined;
* args 参数列表

# apply()

[mdn apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

定义：**func.apply(thisArg, [argsArray])**

* thisArg 在 func 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（number，string，boolean）的 this 会指向该原始值的自动包装对象。strict mode 下是 undefined;

* argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

# call 和 apply 的区别就是参数不同

# bind()

es5 引入了 function.prototype.bind 。调用f.bind(someObject)会创建一个和 f **具有相同函数体和作用域的函数**，但是在这个**新函数**中， this 被永久性的绑定到了 bind 第一个参数上。

这个函数可以反复被调用，不过 this 指针已经无法改变。

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

# 箭头函数（Arrow Function）

没有自己的 this , arguments , super 或者 new.target 这些函数表达式更适用于那些本来需要匿名函数的地方，并且他们不能用作构造函数。
箭头函数不会创建自己的 this ,它只会从自己的作用域链的上一层继承this。
应用场景： 当我们需要维护一个 this 上下文的时候
比如
```
var self = this
```

不合适的场景：定义函数的方法，且该方法中包含 this
```
var Person = {
    'age': 18,
    'sayHello': ()=>{
        console.log(this.age);
      }
};
var age = 20;
Person.sayHello();  // 20
// 此时 this 指向的是全局对象

// 正常使用
var Person1 = {
    'age': 18,
    'sayHello': function () {
        console.log(this.age);
    }
};
var age = 20;
Person1.sayHello();   // 18
// 此时的 this 指向 Person1 对象
```
需要动态 this 的时候
```
// 错误使用
var button = document.getElementById('userClick');
button.addEventListener('click', () => {
     this.classList.toggle('on');
});
```
button 的监听函数是箭头函数，所以监听函数里面的 this 指向的是定义的时候外层的 this 对象，即 Window，导致无法操作到被点击的按钮对象

[参见this详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

[ call、apply 和 bind 的原生实现 —— github](https://github.com/Abiel1024/blog/issues/16)

# this 总结

# 题目

请分析以下代码会打印什么？

```javascript
var obj = {
    bar: 'bar',
    foo: function(){
        let that = this;
        console.log(this.bar, that.bar); // bar bar
        (function(){
            let that = this;
            console.log(this.bar, that.bar); // undefined undefined
        })();
    }
}
obj.foo()
```

```javascript
var number = 10;
function fn() {
  console.log(this.number);
}
var obj = {
  number: 2,
  show: function(fn) {
    this.number = 3;
    fn(); // 10
    console.log(arguments, arguments[0])
    arguments[0](); // undefind
  }
};
obj.show(fn);
```

```javascript
var x = 10;
var obj = {
    x: 20,
    f:function(){
        const that = this;
        console.log(this.x)
        console.log(that.x)
        test()
        function test(){
            const that = this;
            console.log(this.x) // 10
            console.log(that.x) // 10
        }
    }
}
obj.f()
```
```javascript
let x = 10;
var obj = {
    x: 20,
    f:function(){
        const that = this;
        console.log(this.x)
        console.log(that.x)
        test()
        function test(){
            const that = this;
            console.log(this.x) // undefined
            console.log(that.x) // undefined
        }
    }
}
obj.f()
```