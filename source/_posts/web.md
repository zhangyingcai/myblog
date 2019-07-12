---
title: web总结
tags: 面试题
categories: 面试题
abbrlink: 46455
date: 2019-03-07 19:21:49
---

面试题总结

<!-- more -->

# CSS
# css实现图片自适应宽高？
自适应宽和高 // 根据当前父级元素的大小自动更新大小
```
img{
    max-width:100%;
    min-height:100%;
}
```
等比例缩放图片的话
```
img{
    width:100%;
    height:auto;
}
```

# Ajax

目的：网页能够快速将增量更新展示到页面上，而不用刷新页面，能够快速响应用户的操作，提升了用户体验。

交互模型：

同步异步的区别：同步暂停当前脚本等待服务器处理结果，异步的话是继续执行当前脚本，服务器又返回时处理结果

# JavaScript

# 异步加载js的方案

默认情况javascript是同步加载的，所以通常js文件放到文档底部，优先展示样式。
* defer 只支持IE
* async
* 使用document创建script,插入到DOM中，加载完毕后callback
```
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript"; 
    if (script.readyState) { //IE 
        script.onreadystatechange = function () { 
            if (script.readyState == "loaded" || script.readyState == "complete") { 
                script.onreadystatechange = null; callback(); 
                } 
            };
    } else { //Others: Firefox, Safari, Chrome, and Opera 
        script.onload = function () { callback(); };
    }
    script.src=url;
    document.body.appendChild(script);
}
```

# 网站可用性、可访问性


面试总结

# box-sizing

```
content-box // 标准盒模型 `width` 与 `height` 只包括内容的宽和高
border-box // width = border + padding + 内容的高度
```

# promise用法

# 清除浮动的方法，应用场景以及为什么清除浮动。float

clear:both;
overflow:auto;

## 浮动到底是什么

浮动是元素脱离文档流。

清除浮动的方式:

```
// 现代浏览器clearfix方案，不支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}

// 全浏览器通用的clearfix方案
// 引入了zoom以支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearfix{
    *zoom: 1;
}

// 全浏览器通用的clearfix方案【推荐】
// 引入了zoom以支持IE6/7
// 同时加入:before以解决现代浏览器上边距折叠的问题
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}
```

BFC 是块状格式化上下文

[浮动到底是什么？](https://www.jianshu.com/p/09bd5873bed4)

# 千分位分割数字，并自定义保留小数位数

## 正则表达式
```
function money(num){
    return (''+num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
```
首先考虑的是小数点，在小数点的地方进行位置划分
//g;
//g全局匹配

/(\d)(?=(\d{3})+\.)/g;
\d:匹配一个数字字符，等价于[0-9]
这里最难理解的就是(?=(\d{3})+\.)，且看语法：
x(?=y)：正向肯定查找，匹配后面带有y的x项目

那么在这里意思是：查找一个和"."之间带有一个或多个连续3位数字的数字（x）
```
/**
 *num 要分隔的数字（必填）
 *n 保留的小数位数（可选）
 *symbol 分隔数字使用的符号（可选，默认为","）
 */ 
function splitNum(num,n,symbol) {
    if(!num)throw new Error('splitNum需要传入一个待转换的数据');
    if(typeof num!=='number')throw new TypeError('num参数应该是一个number类型');
    if(n<0)throw new Error('参数n不应该小于0');
    var hasDot=parseInt(num)!=num;//这里检测num是否为小数，true表示小数
    var m=(n!=undefined&&n!=null)?n:1;
    num=m==0?num.toFixed(m)+'.':hasDot?(n?num.toFixed(n):num):num.toFixed(m);
    symbol=symbol||',';
    num=num.toString().replace(/(\d)(?=(\d{3})+\.)/g,function(match, p1,p2) {
        return p1 + symbol;
    });
    if(n==0||(!hasDot&&!n)){//如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
        num=num.substring(0,num.indexOf('.'));
    }
    return num;
}
```
## 
```
function money(num){
    // 先把数字换成字符串，然后转换成数组，反转之后，再组合成字符串
    var reverseStr = num.toString().split('').reverse().join('');
    // 用正则替换，每隔3位加一个逗号
    reverseStr = reverseStr.replace(/(\d{3})/g,'$1,');
    // 处理正好三位的情况，如 123 -> ,123
    reverseStr = reverseStr.replace(/\,$/,'');
    // 把加了逗号的字符串反转回正常的顺序
    reverseStr = reverseStr.split('').reverse().join('');
    return reverseStr;
}
```
## (123456.123).toLocaleString('en-US')  ie11以上支持
[mdn参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#)

# '123add12da1' 截取数字

'123add12da1'.split(/[^\d]/).join('') // 转换成字符串
'123add12da1'.match(/\d/g) // 转换成数组

# 判断对象的类型

```
const isType =  type => target => `[object ${type}]` === Object.prototype.toString.call(target)
```

Object.prototype.toString 使用了闭包 一个函数
注意：type 类型首字母大写

# 打包时候的注意事项

css 引入顺序，如果引入了类库和自定义样式，应最后引入自定义样式，否则会被类库样式覆盖。

图片路径修改，

# vue-router 钩子使用情况

# rem

rem 相对  html 根元素
css3 新增的一个相对单位

# border 简写


# textarea 相关属性

texteara webkit 内核的浏览器会默认设置 resize: both 用户可以调节元素的宽度和高度
resize 的属性包括
none: 不能调节元素的尺寸
horizontal: 调节元素的宽度
vertical: 调节元素的高度

# 列举伪元素

css2 
:before
:after
css1
:first-line 向文本的第一行添加特殊样式。
:first-letter 向文本的第一个字母添加特殊样式。

# 伪类

:first-child 首个子对象
:last-child 最后一个对象
:link 未访问的链接
:visited 已访问的链接
:hover 鼠标移动到链接上
:active 选定的链接

注意：hover 必须在 link 和 visited 之后才能生效
注意：active 必须在 hover 之后才能生效

腾讯面试题目

# 浏览器渲染原理？

#### 自我介绍
#### 介绍下你做的项目，用了什么技术，实现了哪些功能？
#### 说说nginx是什么？聊聊对nginx的原理和你的理解
#### 什么是ssr?原理和具体过程是什么？
#### 浏览器渲染原理
#### 服务端渲染原理
#### 前端如何做测试？如何与服务器做接口测试？
#### 跨域是什么？如何解决？
#### 移动端如何做适配？什么是flex布局？
#### 小程序框架存在哪些问题？如何解决？
#### 上传下载功能你是如何实现的？
#### 说说项目中遇到的问题有哪些？如何解决？
#### 浏览器如何做兼容？


# http 三次握手和四次挥手


# 题目
假设有一个userList
  userList = [
      {
        name: '张三',
        age: 18
      },
      {
        name: '李四',
        age: 19
      },
      {
        name: '王五',
        age: 20
      },
      {
        name: '赵六',
        age: 30
      }
    ]

    请用尽可能简短的代码，将userList转换成如下形式
    userList = [
      {
        name: '张三',
        age: 18,
        index: 1
      },
      {
        name: '赵六',
        age: 30,
        index: 4
      },
      {
        name: '王五',
        age: 20,
        index: 3
      },
      {
        name: '李四',
        age: 19,
        index: 2
      }
    ]


#应用缓存和浏览器缓存有什么区别？

HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。
应用程序缓存为应用带来三个优势：
离线浏览 - 用户可在应用离线时使用它们
速度 - 已缓存资源加载得更快
减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

实现借助manifest文件

<html manifest="demo.appache">

# 实现多个标签页之间通信的几种方法

[暂时](https://www.jianshu.com/p/31facd4934d7)

SharedWorker

# 请写出减少页面加载时间的方法

## 服务端

### 使用分发网络（Content Delivery Network，CDN）

分发网络（CDN），就是将我们的静态文件放到缓存服务器上，用户访问网站时就近缓存服务器获取资源。

解决发布的问题？hash 版本号

###  静态资源缓存，移动端离线缓存

缓存利用可包括：添加 Expires 头，配置 ETag，使 Ajax 可缓存等。其实，恰当的缓存设置可以大大的减少 HTTP请求，也可以节省带宽 。

#### 协商缓存

配置 ETag：即 If-None-Match: 上次 ETag 的内容。浏览器会发出请求询问服务端，资源是否过期；服务端发现,没有过期，直接返回一个状态码为 304、正文为空的响应，告知浏览器使用本地缓存；如果资源有更新，服务端返回状态码 200、Etag 和正文。这个过程被称之为 HTTP 的协商缓存，通常也叫做弱缓存。

### 添加 Expires 头

服务端通过响应头告诉浏览器，在什么时间之前（Expires）或在多长时间之内（Cache-Control: Max-age=xxx），不要再请求服务器了。这个机制我们通常称之为 HTTP 的强缓存。一般会对 CSS、JS、图片等资源使用强缓存，而入口文件（HTML）一般使用协商缓存或不缓存。
### AppCache

AppCache主要利用 manifest 文本文件，告知浏览器被缓存的内容以及不缓存的内容。

## 网络

### 减少请求数量

* 小图片合成雪碧图
* 更小的图片直接使用 base64
* js css 文件选择性合并
* 避免重复的资源请求

### 减少文件大小

* 压缩 css js html 图片文件
* 尽可能控制 DOM 节点数
* 精简 css javascript, 移除注释/空格/重复css和脚本
* 开启 Gzip 脚本

### 合理使用静态资源域名

域名的要求是短小且独立。
短小可以减少头部开销，因为域名越短请求头起始行的 URI 就越短。之所以要求独立，因为独立域名不会共享主域的 Cookie，可以有效减小请求头大小，这个策略一般称之为 Cookie-Free Domain；另外一个原因是浏览器对相同域名的并发连接数限制，一般允许同域名并发 6~8 个连接，域名不是越多越好，每个域名的第一个连接都要经历 DNS 查询（DNS Lookup），导致会耗费一定的时间，控制域名使用在2-4个之间。另外注意：同一静态资源在不同页面被散列到不同子域下，会导致无法利用 HTTP 缓存。

## 书写规范

* 使用外链时 css 放在头部，js 放在尾部 。原因：防止阻塞以减少对并发下载的影响，尽早刷新文档的输出。

### Html

* 避免空的 src 
* 协议自适应（https:// 或者 http:// 更换成 //），优化结构减小 html 文件的大小

### CSS

* 建议使用类选择器，访问比较快
* 不建议比较长的 base64
* 避免表达式
* 避免使用 Filters

### JavaScript

* 减少作用域链查找（ToDo？）
* 减少 Dom 访问和操作，尽量缓存 Dom
* 充分利用事件委托
* 减少渲染和回流，通过批量处理，最后一次更新

### 图片格式

* 颜色较为丰富的图片而且文件比较大的（40KB - 200KB）或者有内容的图片优先考虑 jpg；图标等颜色比较简单、文件体积不大、起修饰作用的图片，优先考虑使用 PNG8 格式；图像颜色丰富而且图片文件不太大的（40KB 以下）或有半透明效果的优先考虑 PNG24 格式。
* 条件允许的，使用新格式WEBP和BPG。
* 用SVG和ICONFONT代替简单的图标。
* 用字蛛来代替艺术字体切图，它可剔除没有使用的字符，从而解决中文字体过大的问题，并编码成跨平台兼容的格式。

### 合理分配资源加载时间

按需加载，包括 CSS 、 js 文件以及图片、业务模块等

* 预加载
* Dom Ready后加载
* onLoad后加载
* 滚动加载

### 减少 DNS 查询

添加DNS预解析

<link rel="dns-prefetch" href>

# js 异步加载方案有哪些？

## $(document).ready()

需要引入 jquery
兼容所有浏览器
```
$(document).ready(function() {
    alert("加载完成！");
});
```
## `<script>` 标签的 async="async" 属性

async 属性是 HTML5 新增属性，需要 Chrome、FireFox、IE9+ 浏览器支持
async 属性规定一旦脚本可用，则会异步执行
async 属性仅适用于外部脚本 (只有在使用 src 时使用)

此方法不能保证脚本按顺序执行
```
<script type="text/javascript" src="xxx.js" async="async"></script>
```
## `<script>` 标签的 defer="defer" 属性

注意： 只有 Internet Explorer 支持 defer 属性。

defer 属性规定是否对脚本执行进行延迟，直到页面加载为止。
如果脚本不会改变文档的内容，可将 defer 属性加入到 `<script>` 标签中，以便加快处理文档的速度
兼容所有浏览器
此方法可以确保所有设置了 defer 属性的脚本按顺序执行

## 动态创建`<script>`标签

兼容所有浏览器
(function(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://code.jquery.com/jquery-1.7.2.min.js";
    var tmp = document.getElementsByTagName('script')[0];
    tmp.parentNode.insertBefore(script, tmp);
})();

# web worker?

web worker

当在 HTML 中执行脚本时，页面的状态是不可响应的，直到脚本结束。这时候如果有比较耗时的操作就会阻塞主线程。

web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。

## new Worker(url)

创建一个 web worker

## Worker.onmessage

接收 postMessage 传递消息，从执行者发送到父页面对象，消息保存在事件对象的 data 属性中. 

## Worker.postMessage()

发送一条消息到最近的外层对象，消息可由任何 JavaScript 对象组成。

## Worker.terminate()

立即终止 worker。该方法不会给 worker 留下任何完成操作的机会；就是简单的立即停止。Service Woker 不支持这个方法。

# 水滴筹题目

## 下面会打印什么？
```js
var a = 5;
function todo(){
    var a = 9
    return function(){
        a = 7
    }
}
todo()()
console.log(a)
```

答：5

## 测试文本的字符大小
```html
<style>
* {
    font-size: 12px !important;
}
#test {
    font-size: 14px;
}
.test1 {
    font-size: 10px;
}
</style>
<div id="test" class="test1">123123</div>
```

答：12px

## 变量提升
```js
console.log(foo())
function foo(){
    return bar()
    var bar = (function(){return 7})()
    function bar(){return 8}
}
```

答：8

## Array.prototype.filter

```js
(function(){
    var greet='Hello Shuidi'
    var togreet = [].filter.call(greet, function(e,i){
        return i>5
    })
    console.log(togreet)
})()
```
答： ["S", "h", "u", "i", "d", "i"]

* 自执行函数
* Array.prototype.filter
* call

## 点击 li 输出索引值
```html
<ul id="test">
    <li>第一条</li>
    <li>第二条</li>
    <li>第三条</li>
  </ul>
  <script>
    let testEl = document.getElementById('test')
    let liArray = document.getElementsByTagName('li');
    testEl.addEventListener('click', function(e){
      var liEl = e.target;
      var i = Array.prototype.indexOf.call(liArray, liEl);
      console.log(i)
    })
  </script>
```

## 实现 get 函数

```js
let obj = {foo: {bar: {name:'dd'}}}
get(obj, 'foo.bar.name') // 输出 dd
obj = {}
get(obj, 'foo.bar.name') // 输出 undefined
get(obj, 'foo.bar.name', 'dd') // 输出 dd

// 函数如下
function get(obj, path, defaultvalue){}
```
答：
```js
// path 默认 string
function get(obj, path, defaultvalue){
    let key = path.split('.').shift()
    if (obj[key]) {
        return get(obj[key], path, defaultvalue)
    } else {
        return defaultvalue
    }
}
```

主要考察递归

## localStorage 相关

```js
localStorage.setItem('show', false)
console.log(localStorage.show || '显示') // false
```

* 第一点 localStorage.show 可以直接拿到 show
* 第二点 localStorage 只能保存字符串

### 给缓存添加时效

请设计 localSrorage 添加时效

## 请解码被多次编码的URl

例子：https%253A%252F%252Fwww.baidu.com%252Ftest%253D1
结果：https://www.baidu.com/test=1


转义函数：
### encodeURIComponent

转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。

包括 : / 

### encodeURI

转义除了 ; , / ? : @ & = + $ 之外的所有字符。

不能转义 : /

### escape

转义除了 @ * _ + - . / 之外的字符

## http

一次完整的 http 请求，期间需要多少次握手？（tcp?）

* 建立连接 三次 断开连接 四次

## 0.1+0.2 ? 0.3

答：>

## 代码题
用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

```
function intToStr(num){
    let num1 = num / 10;
    let num2 = num % 10
    if (num1 < 1) { // 只有一位数字
        return num
    } else {
        return `${num2}${intToStr(Math.floor(num1))}`
    }
}
```
```
function reverse(num){
    const str = String(num)
    return str ? `${num % 10}${reverse(str.slice(0,str.length-1))}` : ''
}
```

```es6
const reverse = num => [...num.toString()].reverse().join('')
```

面试题2

# 压轴题

```
(function(){
    var a = b = 1;
})()
console.log(window.a,window.b)
```
## 传参

```
function fn(obj){
    obj.bar = 'zyc'
}
function fn1(obj){
    obj={
        bar: 'zyc1'
    }
}
function fn2(){
    obj={
        bar: 'zyc2'
    }
}
var obj = {
    bar:'bar'
}
console.log(obj.bar); // bar
fn(obj)
console.log(obj.bar); // zyc
fn1(obj)
console.log(obj.bar); // zyc
fn2(obj)
console.log(obj.bar); // zyc2
```

函数在处理引用传参的时候，在函数当前作用域下，

## 闭包以及解决异步的问题

## 回调地狱

回调地狱是由于回调函数嵌套太多引起的

* 代码难以阅读和维护
* 代码无法定位到错误，回调函数总会将错误抛出到顶层

## object in es5 map in es6

* 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
* Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
* Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
* Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

引申

map set 

set 存储的值是唯一的(想当于一维数组去重)

## 不获取原型链的属性

Object.hasOwnProperty()

所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

### 遍历一个对象

Iterating over the properties of an object

遍历一个对象

注：之前有过面试是英文题目

```javascript
var obj = {}
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key, obj[key])
    }
}
```
## this

```javascript
var obj = {
    bar: 'bar',
    foo: function(){
        let that = this;
        console.log(this.bar, that.bar); // bar bar
        (function(){
            let that = this;
            console.log(this.bar, that.bar); // bar bar
        })();
    }
}
obj.foo()
```

# 快手笔试题

## 请写出一下代码执行结果。

```js
var a = {x: 1}
var b = a;
a.x = a = {n: 1};
console.log(a); // {n:1}
console.log(b); // {x:{n:1}}
```

引申

```js
function test(){
    var a = b = 1;
}
a // ReferebceError
b // ReferebceError
```

## 请写出以下代码执行结果

```js
Function.prototype.a = ()=> alert(1);
Object.prototype.b = () => alert(2);
function A(){};
const a = new A();
a.a(); // TypeError a is not a function
a.b(); // alert(2)
```

## 请写出以下代码执行结果

```js
let a = 0;
console.log(a); // 0
console.log(b); // 暂时性死区 ReferenceError
let b = {};
console.log(c); // function c() {}
function c() {};
```

## 请写出以下代码执行结果

```js
var x = 10;
function a(y) {
  var x = 20;
  return b(y);
}
function b(y) {
  return x+y;
}
a(20); // 30
```

## 请写出以下代码执行结果

```nodejs
console.log(1);
setTimeout(()=> {
  console.log(2)
});
process.nextTick(()=> {
  console.log(3);
});
setImmedite(()=> {
  console.log(4);
});
new Promise(resolve=> {
  console.log(5);
  resolve();
  console.log(6);
}).then(()=> {
  console.log(7);
});
Promise.resolve().then(()=> {
  console.log(8);
  process.nextTick(()=> {
    console.log(9);
    })
})
// 1
// 5
// 6
// 3
// 7
// 8
// 9
// 2
// 4
```

## 请写出以下代码执行结果

```js
[1,2,3,4,5].map(parseInt);
// callback(item, index, array)
// parseInt(num, index)
// [1,NaN,NaN,NaN,NaN]
```

## 请写出最后一个值

```js
1,3,2,3,4,9,?

//32
```

## 请写出以下代码执行结果

```js
typeof typeof typeof [];
// string
```

## 以下CSS最后是什么颜色

```css
<style>
div {color: red}
#title {color: yellow}
div.title {color: blue}
</style>
<div class="title" id="title">abc</div>
// yellow
```

```css
<style>
div {color: red};
#title {color: yellow};
div.title {color: blue};
</style>
<div class="title" id="title">abc</div>
// red
```

```css
<style>
.classA {color: blue}
.classB {color: red}
</style>
<p class="classB classA">123</p>
// red
```

##  请解释一下什么BFC，IFC，FFC。

## visibility: hidden 和 display: none 有什么区别？

visibility: hidden 占用的空间还在，
display: none 都隐藏了

## css中你所知道的长度单位有哪些？有哪些区别？

px(Pixel) 相对长度单位。
像素 px 是相对与显示器屏幕分辨率而言的。

em 相对长度单位 相对于父级元素设定字体大小

rem 现对于 html 根元素设定字体大小

## img 的 alt 和 title有何不同