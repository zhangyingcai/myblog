---
title: es6
tags: es6
categories: ES6
abbrlink: 14773
date: 2019-01-17 09:16:43
---

es6 笔记

<!-- more -->

# let const var

- var 在全局作用域下声明变量会导致变量挂载在 window 上, let const 不会
- let 声明的变量只在 let 命令所在的代码块内有效。
- const 声明一个只读的常量，一旦声明，常量的值就不能改变。
- let 只能声明一次 var 可以声明多次
- let 不存在变量提升
- const 声明一个只读变量，声明之后不允许改变。

```
for 循环计数器很适合用 let
for (var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);
  })
}
// 输出十个 10
for (let j = 0; j < 10; j++) {
  setTimeout(function(){
    console.log(j);
  })
}
// 输出 12345...
```

变量 i 是用 var 声明的，在全局范围内有效，所以全局中只有一个变量 i, 每次循环时，setTimeout 定时器里面的 i 指的是全局变量 i ，而循环里的十个 setTimeout 是在循环结束后才执行，所以此时的 i 都是 10。
变量 j 是用 let 声明的，当前的 i 只在本轮循环中有效，每次循环的 j 其实都是一个新的变量，所以 setTimeout 定时器里面的 j 其实是不同的变量，即最后输出 12345。（若每次循环的变量 j 都是重新声明的，如何知道前一个循环的值？这是因为 JavaScript 引擎内部会记住前一个循环的值）。

# 变量提升

英文：Hoisting

[很有意思的题目](https://juejin.im/post/5c6a0fa451882562851b3cdd)

`变量提升`变量和函数的声明移动到当前执行上下文(块)的最前面。
应用范围：数据类型、变量、函数

runtime： 1.并不是物理位置的移动，而是在编译阶段被放到内存中。 2.仅提升声明，而不提示初始化

历史原因：
提升存在的根本原因就是为了解决函数间互相调用的情况

```
{
    catName("Chloe");

    function catName(name) {
        console.log("我的猫名叫 " + name);
    }
}
catName("Tom");
// 我的猫名叫 Chloe
// 我的猫名叫 Tom
```

```
function test1() {
    test2()
}
function test2() {
    test1()
}
test1()
```

> let 不存在 Hoisting
> var 在全局作用域下声明变量会导致变量挂载在 window 上

[tomdn](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)

# 暂时性死区

let、const 因为暂时性死区的原因，不能在声明前使用

> 在 ECMAScript 6 中，let（const）将不会提升变量到代码块的顶部。因此，在变量声明之前引用这个变量，将抛出引用错误（ReferenceError）。这个变量将从代码块一开始的时候就处在一个“暂时性死区”，直到这个变量被声明为止。

[tomdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types)

```
var PI = "a";
if(true){
  console.log(PI);  // ReferenceError: PI is not defined
  const PI = "3.1415926";
}
```

ES6 明确规定，代码块内如果存在 let 或者 const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量 PI 之前使用它会报错。

const 如何做到变量在声明初始化之后不允许改变的？
保证变量指向的内存地址所保存的数据不被改变。
此时，你可能已经想到，简单类型和复合类型保存值的方式是不同的。是的，对于简单类型（数值 number、字符串 string 、布尔值 boolean）,值就保存在变量指向的那个内存地址，因此 const 声明的简单类型变量等同于常量。而复杂类型（对象 object，数组 array，函数 function），变量指向的内存地址其实是保存了一个指向实际数据的指针，所以 const 只能保证指针是固定的，至于指针指向的数据结构变不变就无法控制了，所以使用 const 声明复杂类型对象时要慎重

# 原型继承

# 立即执行函数

历史原因：用于模块化，通过函数作用域解决命名冲突、污染全局作用域的问题。

```
(function(){})()
```

# 箭头函数（Arrow Function）

没有自己的 this,arguments,super 和 new.target
（this,arguments,super 和 new.target 分别指向外层函数的对应变量）
这些函数表达式更适用于那些本来需要匿名函数的地方，并且他们不能用作构造函数。
箭头函数不会创建自己的 this,它只会从自己的作用域链的上一层继承 this。
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

```
function foo(){
  return ()=>{
    return ()=>{
      console.log('id', this.id)
    }
  }
}
var f = foo.call({id:1})
var b = foo.call({id:2})
var c = f.call({id:3})
var d = f.call({id:4})

f()() // id 1
b()() // id 2
c() // id 1
d() // id 1
```

this 无效

```
(function(){
  return [(()=>this.x).bind({x:'inner'})()]
}).call({x:'outer'})
// ['outer']
```

嵌套的箭头函数

<!-- 多重嵌套实现数组插入 -->

```
// vlaue array aftervalue
function insert (value){
  return {into: function(array){
    return {after:function(aftervalue){
      array.splice(array.indexOf(aftervalue)+1,0,value)
      return array
    }}
  }}
}
insert(1).into([0,2,3,4]).after(3)
// 使用箭头函数重写
let insert = (value)=>({into:(array)=>({after:(aftervalue)=>{
    array.splice(array.indexOf(aftervalue)+1,0,value)
    return array
  }})})
```

进阶 部署管道机制(pipeline)，上一个函数的输出是下一个函数的输入

```
const pipeline = (...funcs)=>val=>funcs.reduce((a,b)=>b(a),val)
const plus1 = a=> a + 1
const mult2 = a=> a * 2
const addthenmult = pipeline(plus1, mult2)
let r = addthenmult(5) // 12
```

实现 演算

```
const fix =
```

# call apply bind

语法
call(this,...args) // args 参数列表
apply(this, ...args) // args 参数数组
bind(this, ...args) // 以上两种都支持 es5 实现
作用:重定义 this

# 解构赋值

它使得将值从数组，或属性从对象，提取到不同的变量中，成为可能
为了方便从对象数组中提取需要的值
... 剩余运算符

## 数组模型的解构

```
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

// 剩余运算符
// 适合场景：
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
```

// 数组对象解析

## 可忽略

```
let [a, ,b] = [1, 2, 3]
// a=1
// b=3
```

不完全解构

```
let [a=1, b]=[]; //a=1,b=undefined
```

字符串等
在数组的结构中，结构的目标如果为可遍历对象，皆可进行结构赋值。可遍历对象即实现 iterator 接口的数据。

```
let [a, b, c, d, e] = 'hello'
```

结构默认值
当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。

```
let [a=3, b=a] = []
```

```
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20


// Stage 4（已完成）提案中的特性
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
```

# 模板字符串（Template String）

# 对象字面量扩展语法（Enhanced Object Literals）

# 表达式结构（Destructuring）

# 函数参数表达、传参

## 使用函数默认参数时，不允许有同名参数

```
// 不报错
function fn(name,name){
 console.log(name);
}

// 报错 当使用默认参数时
//SyntaxError: Duplicate parameter name not allowed in this context
function fn(name,name,age=17){
 console.log(name+","+age);
}
```

## 什么时间使用默认参数：当参数为 undefined 时使用

```
function fn(name, age=17){
    console.log(name+","+age);
}
fn('Tom', null) // Tom,null 生效
```

## 函数参数默认值存在默认值死区，在函数参数默认值表达式中，还未初始化赋值的参数值无法作为其他参数的默认值。

```
function f(x,y=x){
    console.log(x,y);
}
f(1);  // 1 1

function f(x=y){
    console.log(x);
}
f();  // ReferenceError: y is not defined
// chrome 最近版本并不报错 ！！！
```

## 不定参数

不定参数用来表示不确定参数个数 ...args 只能放在参数组的最后，而且只有一个
打印出来是个 Array

```
function fn(...args){

}
```

# 新的数据结构

# 类语法（Classes）

# 生成器

# Promise

异步编程的一种解决方案
从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

Promise 状态 pending(进行中) fulfilled(已成功) rejected(已失败)

无法改变这个状态。

Promise 对象只有：从 pending 变为 fulfilled 和从 pending 变为 rejected 的状态改变。只要处于 fulfilled 和 rejected ，状态就不会再变了即 resolved（已定型）。

状态机制的缺点

- 无法取消 Promise, 一旦创建就会立即执行，无法中途取消.
- 如果不设置回调函数， Promise 内部抛出的错误， 不会反应到外部。
- 当处于 pending 状态时，无法得知目前进行到哪一个阶段了.

## then 方法

then 方法接收两个函数作为参数，第一个参数是 Promise 执行成功时的回调 resolve ，第二参数是 Promise 执行失败时的回调 reject，两个函数只会有一个被调用。

大多数浏览器不能终止的 Promise 链里的 rejection, 建议后面都跟上.catch();

通过 .then 方法添加的回调函数，不论什么时候，都会被调用。

通过 .then 可以添加多个回调函数，他们会按照插入顺序并且独立运行。

.then 方法将返回一个 resolved 或者 rejected 状态的 Promise 对象用于链式调用，且 Promise 对象的值就是这个返回值。

# 代码模块化

特点

- ES6 的模块自动开启严格模式，不管你有没有在模块开头添加 use strict
- 模块中可以导入和导出各种类型的变量，如函数，对象，字符串，数字，布尔值，类等
- 每个模块都有自己的上下文，每一个模块内声明的变量都是局部变量，不会污染全局作用域。
- 每一个模块只加载一次(单例)，若再去加载同目录下通文件，直接从内存中读取。

export 与 import

基本用法

- 导出的函数声明与类声明必须要有名称（export default 命令另外考虑）。
- 不仅能导出声明还能导出引用（例如函数）。
  export 命令可以出现在模块的任何位置，但必需处于模块顶层。
  import 命令会提升到整个模块的头部，首先执行。

## export default 命令 重点

- 在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
- export default 中的 default 是对应的导出接口变量。
- 通过 export 方式导出，在导入时要加{ }，export default 则不需要。
- export default 向外暴露的成员，可以使用任意变量来接收。

# Symbol

SE6 引入的一种新的原始数据类型 Symbol ,表示独一无二的值，最大的用法是用来定义对象的唯一属性名。

# Proxy

# for of 替换 for...in

```
const Zootopia=[
    {name:'Nick',gender:1,species:'Fox'},
    {name:'Judy',gender:0,species:'Bunny'}
];
for(const {name,species} of Zootopia){
    console.log(`hi,I am ${name},and I am a ${species}`);
}
```

# Array.forEach

# Map 和 Set

Map 对象保存键值对。任何值（对象和原始值）都可以作为一个键或者值。

相当于是二维数组

Map 和 Object 的区别

- 一个 Object 的键只能是字符串或者 Symbols ,但是一个 Map 的键可以是任意数据类型。
- Map 中键值是有序的，而添加到对象中的键则不是。
- Map 的键值对个数可以从 size 中获取，而 Object 的键值对个数只能手动计算。
- Object 都有自己的原型，原型链上的键名有可能和你自己在对象的设置上的键名产生冲突。

## api

```
Map.set(key, value)
Map.get(key) // return value
Map.size // return 当前 Map 键值对个数
Map.clear() // 清空键值对
Map.delete(key) // 删除键值对 return 操作的结果？boolean
Map.has(key) // 是否含有键值对 return 操作的结果？boolean
Map.forEach((key, value)=>{})

// set 可以是任何类型的唯一值
Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：

+0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复，只会生成一个键是0的键值对
undefined 与 undefined 是恒等的，所以不重复；
NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个，不重复。

// to array
Array.from(map) // 根据键值对转换成数组

// clone
var newmap = new Map(oldmap) // 每次都会迭代一个新的对象

// concat 合并
var first = new Map([[1, 'one'], [2, 'two'], [3, 'three'],]);
var second = new Map([[1, 'uno'], [2, 'dos']]);

// 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的，对应值即 uno，dos， three
var merged = new Map([...first, ...second]);
```

## 遍历方法

```
var mymap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");

for (var [key, value] of myMap) {
    console.log(key + " = " + value);
}
// 0 = zero
// 1 = one

for (var [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
// 同上
/* 这个 entries 方法返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的 [key, value] 数组。 */
// entry 条目/项、输入、河口 entries
// Iterator 迭代器

// 将会显示两个log。 一个是 "0" 另一个是 "1"
for (var key of myMap.keys()) {
  console.log(key);
}
/* 这个 keys 方法返回一个新的 Iterator 对象， 它按插入顺序包含了 Map 对象中每个元素的键。 */

// 将会显示两个log。 一个是 "zero" 另一个是 "one"
for (var value of myMap.values()) {
  console.log(value);
}
/* 这个 values 方法返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的值。 */
```

## Set 允许你存储任何类型的唯一值，无论是原始值还是对象引用

Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：

+0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复；
undefined 与 undefined 是恒等的，所以不重复；
NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个，不重复。

# 字符串

## 判断字符串是否包含子串使用 indexOf() lastIndexOf()

新增

```
String.includes(str) // return boolean
String.startsWith(str) // return boolean 判断参数字符串是否在原字符串的头部
String.endsWith(str) // return boolean 判断参数字符串是否在原字符串的尾部
```

## 字符串重复

```
String.repeat(val) // 返回新的字符串，表示将字符串重复指定次数返回。
// val
// 向下取整 3.2 -> 3
// NaN -> 0
```

## 字符串补全

## 模板字符串

```
`123`&{myvar} // {}可以放表达式
```

# 对象

属性直接写变量，这时候属性名是变量名，属性值是变量值。

```
const age = 12;
const name = "Amy";
const person = {age, name};
person   //{age: 12, name: "Amy"}
//等同于
const person = {age: age, name: name}
```

方法名也可以简写

```
const person = {
    sayHi(){
        console.log("hi");
    }
}
person.sayHi();
```

如果是 Generator 函数，则要在前面加一个星号

```
const obj = {
  * myGenerator() {
    yield 'hello world';
  }
};
//等同于
const obj = {
  myGenerator: function* () {
    yield 'hello world';
  }
};
```

// generator 发电机

## 使用剩余运算符浅拷贝对象 (...) 浅拷贝

```
let person = {name: "Amy", age: 15, eat(){ console.log('I am eating')}};
let someone = { ...person };
someone;  //{name: "Amy", age: 15, eat(){ console.log('I am eating')}}
someone.eat(); // I am eating
```

合并对象

```
let age = {age: 15};
let name = {name: "Amy"};
let person = {...age, ...name};
person;  //{age: 15, name: "Amy"}
```

## 自定义的属性和拓展运算符对象里面属性的相同的时候：自定义的属性在拓展运算符后面，则拓展运算符对象内部同名的属性将被覆盖掉。

```
let person = {name: "Amy", age: 15};
let someone = { ...person, name: "Mike", age: 17};
someone;  //{name: "Mike", age: 17}
```

## Object.assign(target, source_1, ···) 浅拷贝

用于将源对象的所有可枚举属性复制到目标对象中。

数组的处理

```
Object.assign([2,3], [5]);  // [5,3]
```

会将数组处理成对象，所以先将 [2,3] 转为 {0:2,1:3} ，然后再进行属性复制，所以源对象的 0 号属性覆盖了目标对象的 0。

## Object.is(value1,value2)

用来比较两个值是否严格相等。与 (===) 基本相同

与 === 的区别

```
// +0 != -0
Object.is(+0, -0) // false
// NaN
Object.is(NaN,NaN); //true
NaN === NaN  //false
```

# Generator

可用通过关键字 yield 关键字，把函数的执行流挂起，为改变执行流提供了可能，从而为异步编程提供解决方案。
函数的组成：
有两个区分于普通函数的部分

> 一个是在 function 后面，函数名前面有个\*；
> 函数内部有 yield 表达式

其中 \* 表示函数为 generator 函数， yield 用来定义函数内部的状态。

```
function* func(){
 console.log("one");
 yield '1';
 console.log("two");
 yield '2';
 console.log("three");
 return '3';
}
```

调用方式 和普通函数一样，在函数名后面添加(), 但是 Generator 函数不会像普通函数一样立即执行，而是返回一个指向内部状态对象的指针，所以要调用遍历器对象的 iterator 的 next 方法，指针就会从函数头部或者上一次停下来的地方开始执行。

```
var f = func(); // 实例
f.next();
// one
// {value: "1", done: false} 返回值

f.next();
// two
// {value: "2", done: false}

f.next();
// three
// {value: "3", done: true}

f.next();
// {value: undefined, done: true}
```

第一次调用 next 方法时，从 Generator 函数的头部开始执行，先是打印了 one ,执行到 yield 就停下来，并将 yield 后边表达式的值 '1'，作为返回对象的 value 属性值，此时函数还没有执行完， 返回对象的 done 属性值是 false。

第二次调用 next 方法时，同上步 。

第三次调用 next 方法时，先是打印了 three ，然后执行了函数的返回操作，并将 return 后面的表达式的值，作为返回对象的 value 属性值，此时函数已经结束，多以 done 属性值为 true 。

第四次调用 next 方法时， 此时函数已经执行完了，所以返回 value 属性值是 undefined ，done 属性值是 true 。如果执行第三步时，没有 return 语句的话，就直接返回 {value: undefined, done: true}。

函数返回的遍历器对象的方法

一般情况下，next 方法不传入参数的时候， yield 表达式的返回值是 undefined , 当 next 传入参数的时候，该参数作为上一步的 yield 的返回值。

```
function* sendParameter(){
    console.log("strat");
    var x = yield '2';
    console.log("one:" + x);
    var y = yield '3';
    console.log("two:" + y);
    console.log("total:" + (x + y));
}

// next 不传参
var sendp1 = sendParameter();
sendp1.next();
// strat
// {value: "2", done: false}
sendp1.next();
// one:undefined
// {value: "3", done: false}
sendp1.next();
// two:undefined
// total:NaN
// {value: undefined, done: true}

// next传参
var sendp2 = sendParameter();
sendp2.next(10);
// strat
// {value: "2", done: false}
sendp2.next(20);
// one:20
// {value: "3", done: false}
sendp2.next(30);
// two:30
// total:50
// {value: undefined, done: true}
```

return 方法

return 方法返回给定值，并结束遍历 Generator 函数
return 方法提供参数时，返回该参数，不提供该参数时，返回 undefined

# async

async 是 ES7 才有的语法

```
async function name([param[,param[,...param]]]){
  statements
}

// name 函数名称
// param 要传递给函数的参数的名称
// statements 函数体语句
```

async 返回一个 Promise 对象，可以使用 then 方法添加回调函数。

```
async function hello(){
  return "hello"
}
console.log(hello()) // Promise
hello().then(v=>{
  console.log(v) // hello
})
```

async 函数中可能会有 await 表达式， async 函数执行时， 如果遇到 await 就会先暂停执行， 等触发的异步操作完成后， 恢复 async 函数的执行并返回解析值。

await 关键字只在 async function 中有效。

await 针对所跟不同表达式的处理方式

Promise 对象：await 会暂停执行，等待 Promise 对象 resolve, 然后恢复 async 函数的执行并返回解析值。

第一题

```
async function async1() {
    console.log('async1 start');
    await async2();
    await async3()
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
async function async3() {
    console.log('async3');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

第二题

```
new Promise(resolve => {
    console.log('外部 1promise');
    resolve();
  })
    .then(() => {
      console.log('外部 1then');
      new Promise(resolve => {
        console.log('内部 1promise');
        resolve();
      })
        .then(() => {
          console.log('内部 1then');
          Promise.resolve();
        })
        .then(() => {
          console.log('内部 2then');
        });
    })
    .then(() => {
      console.log('外部 2then');
    })
    .then(() => {
      console.log('外部 3then');
    })
    .then(() => {
      console.log('外部 4then');
    })
    .then(() => {
      console.log('外部 5then');
    });
```

第三题

```
new Promise(resolve => {
    console.log('外部 1promise');
    resolve();
  })
    .then(() => {
      console.log('外部 1then');
      new Promise(resolve => {
        console.log('内部 1promise');
        resolve();
      })
        .then(() => {
          console.log('内部 1then');
          return Promise.resolve();
        })
        .then(() => {
          console.log('内部 2then');
        });
    })
    .then(() => {
      console.log('外部 2then');
    })
    .then(() => {
      console.log('外部 3then');
    })
    .then(() => {
      console.log('外部 4then');
    })
    .then(() => {
      console.log('外部 5then');
    });
```

第四题题

```
new Promise(resolve => {
    console.log('外部 1promise');
    resolve();
  })
    .then(() => {
      console.log('外部 1then');
      new Promise(resolve => {
        console.log('内部 1promise');
        resolve();
      })
        .then(() => {
          console.log('内部 1then');
        })
        .then(() => {
          console.log('内部 2then');
        });
    })
    .then(() => {
      console.log('外部 2then');
    })
    .then(() => {
      console.log('外部 3then');
    })
    .then(() => {
      console.log('外部 4then');
    })
    .then(() => {
      console.log('外部 5then');
    });
```
