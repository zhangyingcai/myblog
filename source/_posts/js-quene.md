---
title: 用栈实现队列
date: 2018-12-14 19:35:36
tags: quene
---

先上代码

```
function Quene() {
  var stack1 = [],
    stack2 = []
  this.push = function(node) {
    stack1.push(node)
  }

  this.pop = function() {
    if (stack2.length == 0) {
      if (stack1.length == 0) {
        return null
      } else {
        var len = stack1.length
        for (var i = 0; i < len; i++) {
          stack2.push(stack1.pop())
        }
        return stack2.pop()
      }
    } else {
      return stack2.pop()
    }
  }
}
```

栈有入栈和出栈，实现队列就是将两个栈，通过栈顶和另一个的栈底相连，然后一个栈一直执行入栈，另一个一直执行出栈就可以了。