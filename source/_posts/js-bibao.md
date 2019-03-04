---
title: 闭包
date: 2018-12-18 09:00:29
tags: 闭包
categories: JavaScript
---

# 闭包

>函数A返回了函数B,并且函数B使用了函数A的变量，函数B就成为闭包。

```
function A(){
    let a = 1;
    function B(){
        console.log(a);
    }
    return B();
}
```

为什么函数A已经调用出栈了，为什么函数B还能引用到函数A中的变量。是否和我有相同的疑问？因为函数A中的变量这时候是存储在堆上的，现在的js引擎可以通过逃逸分析辨别出那些变量需要存储在堆上，哪些需要存储在栈上。

经典面试题：