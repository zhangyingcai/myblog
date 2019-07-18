---
title: 变量提升
tags: 变量提升
categories: JavaScript进阶系列
abbrlink: 30046
date: 2019-05-20 10:32:26
---
JavaScript进阶系列 - 变量提升

每次技术更新都是为了解决历史问题。

<!-- more -->

# 常识

现在已经达成共识：默认情况下应当使用 let 而不是 var ，对需要受到保护的变量使用 const 。
在声明之后使用变量。
const 必须 赋值。

# 变量的作用域与变量提升

在 ES6 之前，JavaScript 中只存在着函数作用域。
ES6 之后引入 let const 两个变量声明关键字 和 块级作用域。
> ES5 之前 if switch for 语句是不会产生作用域的，能够产生作用域的有 **函数** ，ES6 之后可以
> 作用域（Scope）即代码执行过程中的变量、函数或者对象的可访问区域，作用域决定了变量或者其他资源的可见性
>JavaScript 中的作用域主要分为**全局作用域**（Global Scope）与**局部作用域**（Local Scope）两大类，在 ES5 中定义在函数内的变量即是属于某个局部作用域，而定义在函数外的变量即是属于全局作用域

在 JavaScript 中，所有绑定的声明在控制流到达他们出现的作用域时被初始化。这里的作用域就是 执行上下文(Execution Context)
每个执行上下文分为 内存分配（Memory Creation Phase）与 执行（Execution）这两个阶段

## 变量提升

>函数声明和变量声明总是被 JavaScript 解释器隐式地提升 (hoist) 到包含他们的作用域的最顶端。很明显的，语言自身定义和函数形参已经处于作用域顶端, 并被赋值为 undefined。

下面两段代码等价
```
function foo() {
  if (false) {
      var x = 1;
  }
  return;
  var y = 1;
}
function foo() {
  var x, y;
  if (false) {
      x = 1;
  }
  return;
  y = 1;
}
```

可以看到 不管会不会被执行 JavaScript 引擎都会将 var 修饰的变量声明找出来放到作用域的顶部，但是不会提升 **赋值** 语句

```
function foo() {
    if(true) {
        var temp = 5;
         console.log(temp);
    }
    
    console.log(temp);
}

function bar(） {
    if(true) {
        let temp = 5;
        console.log(temp);
    }
    
    console.log(temp);
}

foo(); // 5 和 5
bar(); // 5 和 "ReferenceError: temp is not defined
```

## 暂时性死区

当 JavaScript 引擎检视下面的代码块有变量声明时，对于 var 声明的变量，会将声明提升到函数或全局作用域的顶部，而对 let 或 const 的时候会将声明放在暂时性死区内。

任何在暂时性死区内访问变量的企图都会导致"运行时"错误(runtime error)。只有执行到变量的声明语句时，该变量才会从暂时性死区内被移除并可以安全使用。

## 函数提升

**函数声明**(要理解函数声明和函数表达式)中， 整个函数体都会提升到作用域的顶部。

```javascript
function test() {
    foo(); // TypeError "foo is not a function"
    bar(); // "this will run!"
    var foo = function () { // 函数表达式被赋值给变量'foo'
        alert("this won't run!");
    }
    function bar() { // 名为'bar'的函数声明
        alert("this will run!");
    }
}
test();
```

下面打印什么？ ToDo why?
```
foo(); // TypeError
if (true){
  function foo() {console.log('a')}
} else {
  function foo() {console.log('b')}
}
```

## 注意

在 JavaScript 中，一个作用域中的名称有以下四种：

* 语言自身定义(Language-defined): 所有的作用域默认都会包含this和arguments。

* 函数形参(Formal parameters): 函数有名字的形参会进入到函数体的作用域中。

* 函数声明(Function decalrations): 通过function foo() {}的形式。

* 变量声明(Variable declarations): 通过var foo;的形式。

需要记住的最最重要的特例就是**名称解析顺序**(name resolution order)。
记住一个名称进入一个作用域一共有四种方式。
我上面列出的顺序就是他们解析的顺序。总的来说，如果一个名称已经被定义了，他绝不会被另一个拥有不用属性的同名名称覆盖。这就意味着，函数声明比变量声明具有更高的优先级。但是这却不意味着对这个名称的赋值无效，仅仅是声明的部分会被忽略而已。但是有下面几个例外：

内置的名称 arguments 的行为有些怪异。他似乎是在形参之后，函数声明之前被声明。这就意味着名为 arguments 的形参会比内置的 arguments 具有更高的优先级，即使这个形参是undefined 。这是一个不好的特性，不要使用 arguments 作为形参。
任何地方试图使用this作为一个标识都会引起语法错误，这是一个好的特性。
如果有多个同名形参，那位于列表最后的形参拥有最高的优先级，即使它是 undefined 。

# 面试题

打印结果题目

## 1
```
(function(){var a = b =1;})()
console.log(typeof)
```
## 2
```
var foo = 1;
function bar() {
    if (!foo) {
      var foo = 10;
    }
    alert(foo);
}
bar(); // alert(10)
```

```
let foo = 1;
function bar() {
    if (!foo) {
      let foo = 10;
    }
    alert(foo);
}
bar(); // alert(1)
```

```
const foo = 1;
function bar() {
    if (!foo) {
      const foo = 10;
    }
    alert(foo);
}
bar(); // alert(1)
```
## 3
```
var a = 1;
function b() {
    a = 10;
    return;
    function a() {}
}
b();
alert(a); // alert(1)
```

怎么解决？ 创建临时作用域

```
function foo() {
    var x = 1;
    if (x) {
        (function () {
            var x = 2;
            // some other code
        }());
    }
    // x is still 1.
}
```

