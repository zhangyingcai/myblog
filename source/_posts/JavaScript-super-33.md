---
title: 防抖和节流
date: 2019-07-18 15:05:59
tags:
keywords:
description:
categories: JavaScript进阶系列
---

防抖和节流

<!-- more -->

通常应用在输入查询，滚动加载，抢票，窗口改变等应用场景。

# 防抖

一句话概括：高频函数连续调用时，空闲时间必须大于给定时间。

原理就是利用异步函数来延时执行。

首先实现结束边界版 (结束边界就是在空闲时间结束时执行) es6 版

```js
// func 要防抖的函数
// wait 空闲时间
// flag boolean 开始边界 结束边界
function debounce(func, wait, flag){
  let timer = null;
  return function(){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>func.call(this),wait);
  }
}
```
实现结束边界版 (结束边界就是在空闲时间结束时执行) es5 版

主要是异步函数牵涉到的执行上下文问题

```js
// func 要防抖的函数
// wait 空闲时间
// flag boolean 开始边界 结束边界
function debounce(func, wait, flag){
  var timer = null;
  return function(){
    var self = this;
    if(timer) clearTimeout(timer);
    timer = setTimeout(function(){
      func.call(self)
    },wait);
  }
}
```


实现开始边界版 (开始边界就是在空闲时间开始时执行) es6

通过 flag 来开关这个功能

```js
// func 要防抖的函数
// wait 空闲时间
// flag boolean 开始边界 结束边界
function debounce(func, wait, flag){
  let timer = null;
  return function(){
    if(timer) clearTimeout(timer);
    if(flag){
      // 开始边界
      // 在 timer === null 时立即执行函数
      // 同时开启延时函数 timer = null
      if(!timer){
        func.call(this)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait);
    }else{
      // 结束边界
      timer = setTimeout(()=>func.call(this),wait);
    }
  }
}
```

# 节流

将连续执行优化为每隔一段时间执行

也就是说异步函数已经在执行，那么就不会开另外一个异步函数

我们来代码翻译这句话

```js es5
function throttle (func, wait){
    var timer = null;
    return function(){
        var self = this;
        if(timer) return;
        timer = setTimeout(function(){
            func.call(self)
            timer = null
        }, wait);
    }
}
```

节流立即执行

```js es6
function throttle(func, wait, flag){
  let timer = null
  return function(){
    if(timer) return;
    if(flag){
      func.call(this)
      timer = setTimeout(function(){
        timer = null
      }, wait);
    }else{
      timer = setTimeout(()=>{
        func.call(this)
        timer = null
      }, wait)
    }
  }
}
```

每隔地段时间执行一次

```js
function throttle(func, wait){
  let previous = 0
  return function(){
    let now = +new Date()
    if(now - previous >= wait){
      func.call(this)
      previous = now
    }
  }
}
```

# 注意

通常防抖和节流函数是用在异步函数中的，所以 定义函数的地方 不能使用 箭头函数

例如例子中的 return function()

错误用法，无法获取被点击的对象

```js
button.addEventListener('click', () => {
     this.classList.toggle('on');
});
```

# lodash

lodash 防抖函数实现

```
_.debounce(func, [wait=0], [options={}])
```