---
title: js-api
date: 2019-01-23 09:30:02
tags: jsapi
---

用于平常学到的js知识点

<!-- more -->

# Array.prototype.includes

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

语法：
```
arr.includes(searchElement)
arr.includes(searchElement, fromIndex)

返回值：
Boolean
```

用于判断数组中是否存在某个值

## includes() 作为一个通用方法

includes() 方法有意设计为通用方法。它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)。下面的例子展示了 在函数的arguments对象上调用的includes() 方法。

```
(function() {
  console.log([].includes.call(arguments, 'a')); // true
  console.log([].includes.call(arguments, 'd')); // false
})('a','b','c');
```

# element.scrollIntoView() 让当前的元素滚动到浏览器窗口的可视区域

语法
```
element.scrollIntoView(); // 等同于element.scrollIntoView(true) 
element.scrollIntoView(alignToTop); // Boolean型参数 
element.scrollIntoView(scrollIntoViewOptions); // Object型参数
```
[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)