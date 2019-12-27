---
title: howBrowserWork
date: 2019-12-27 09:11:48
tags:
keywords:
description:
---

how browser work

<!-- more -->

# 8.调用栈


console.trace() 输出当前函数的调用关系

每调用一个函数，JavaScript 会为其创建执行上下文，并压入执行栈。然后 JavaScript 引擎会执行函数代码。
如果函数A调用了一个函数B，JavaScript会为函数B调用执行上下文并压入调用栈**栈顶**。
函数执行完之后，JavaScript引擎会返回值并将该函数的执行上下文出栈。
调用栈是有长度限制的，会有栈溢出的风险。

```js
function runStack (n) { if (n === 0) return 100; return runStack( n- 2);}runStack(50000)
```

相同的例子：斐波那契数列

尾递归优化为什么会没有效？目前大多数浏览器不支持尾递归

如何避免栈溢出的问题？

调用栈是后进先出，那么当存在闭包时，某个函数的执行上下文还存在，那么其他函数的出栈是否受影响？

算法经典思想：循环消除尾递归

正解是循环代替递归