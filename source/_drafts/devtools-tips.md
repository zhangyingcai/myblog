---
title: devtools tips
tags: 前端调试技巧
---

前端调试技巧

<!-- more -->

# 定位 Dom 绑定的事件

## 查看原生绑定的事件函数代码
 
所谓原生就是通过 addEventListener 方法绑定到 dom 元素上。这个好办：

* 审查绑定事件的元素（对着它右键->审查元素）,也可以 f12 然后选择目标元素
* 在弹出的 Elements 视图的控制台，右侧点击**Event Listeners**页签
* 然后就能看到所有绑定在该元素的事件了，点开后，找到 handler ，右击鼠标，选择 **Show Function Definitio** 菜单。就能跳到绑定到该元素的事件函数的源码位置了

## 查看 jquery 绑定的事件

在使用 jquery 绑定事件的时候我们通过上面方式跳转的都是一个地方。在这里交大家一个方法：

*