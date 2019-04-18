---
title: 重学前端
date: 2019-04-04 09:22:53
tags: JavaScript
---

# 36 浏览器事件

```
<body>
    <input id='input'/>
</body>
<script>
document.body.addEventListener('mousedown', function(e){
    console.log('body');
}, true); // 捕获
document.getElementById('input').addEventListener('mousedown', function(){
    console.log('input');
}, true)
document.body.addEventListener('mousedown', function(){
    console.log('body1');
}, false); // 冒泡
document.getElementById('input').addEventListener('mousedown', function(){
    console.log('input1');
}, false)
</script>
```

最终的顺序是
```
body
input
input1
body1
```

在一个事件发生时，捕获过程跟冒泡过程总是先后发生，跟你是否监听毫无关联。

```
target.addEventListener(type, listener[, options]);
// option: capture...
target.addEventListener(type, listener[, useCapture]);
// useCapture 默认为false
```

默认使用冒泡机制，遇到父元素控制子元素的行为时，可以使用捕获机制。

常用的三个参数：
* 事件名称
* 事件处理函数
* 捕获还是冒泡（useCapture）

事件的处理函数不一定是函数，也可以是个javaScript具有handleEvent方法的对象
```
var o = { handleEvent:event => console.log()}
document.body.addEventListener('click', o, false);

```

## 焦点

键盘事件是由焦点系统控制的，一般来说，操作系统也会提供一套焦点系统，但是现代浏览器一般都选择在自己的系统内覆盖原本的焦点系统。

浏览器api来操作焦点
```
document.body.focus
document.body.blur
```

## 自定义事件

只能在 DOM 元素上使用自定义事件。
自定义事件的代码示例如下（来自 MDN）
```
var evt = new Event("look", {"bubbles":true, "cancelable":false});
document.dispatchEvent(evt);
```
这里使用 Event 构造器来创造了一个新的事件，然后调用 dispatchEvent 来在特定元素上触发。

注意，这里旧的自定义事件方法（使用 document.createEvent 和 initEvent）已经被废弃。
# 31 什么是表达式语句？

>事实上真正能干活的语句并不多，其他语句的作用就是产生各种结构，来控制表达式语句执行，或者改变表达式语句的意义。

## 什么是表达式语句？

表达式语句其实是一个表达式，是由运算符链接变量或者直接量构成的

```
变量？
直接量？
直接量就是用语法写出来的具有特定类型的值
```

表达式语句

函数调用
赋值
自增/自减

语法上，并没有限制，可以有无意义的表达式
```
a+b;
```

## 有哪些表达式?

### 主要表达式：primary Expression.

它是表达式的最小单位，它所涉及的语法结构的优先级也是最高的。

primary Expression 还可以是this或者变量，在语法上，把变量称作"标识符引用"

```
this;
myVar;
```

在任何表达式加上圆括号，都被认为是 Primary Expression， 这个机制使得圆括号成为改变运算符优先顺序的手段。


## Member Expression 成员表达式

由主要表达式构成的成员表达式

主要用于访问对象成员 
.语法 // 属性访问
['myVar'] // 字符串的属性访问
new.target // 用于判断对象是否被new调用
super.b // 用于访问父类的属性的语法

```
f`a${b}c` //这是一个是带函数的模板，这个带函数名的模板表示把模板的各个部分算好后传递给一个函数。
```
<!-- ToDo -->

