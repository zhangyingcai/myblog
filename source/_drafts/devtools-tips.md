---
title: devtools tips
tags: 前端调试技巧
abbrlink: 8ed2
---

前端调试技巧
前端 Chrome 原生工具使用小技巧

<!-- more -->

# 写在前面

`F12` 或者 `Ctrl+shift+P` 可以召唤出**调试界面**

# 定位 Dom 绑定的事件

## 查看原生绑定的事件函数代码
 
所谓原生就是通过 addEventListener 方法绑定到 dom 元素上。这个好办：

* 审查绑定事件的元素（对着它右键->审查元素）,也可以 f12 然后选择目标元素
* 在弹出的 Elements 视图的控制台，右侧点击**Event Listeners**页签
* 然后就能看到所有绑定在该元素的事件了，点开后，找到 handler ，右击鼠标，选择 **Show Function Definitio** 菜单。就能跳到绑定到该元素的事件函数的源码位置了

## 查看 jquery 绑定的事件

在使用 jquery 绑定事件的时候我们通过上面方式跳转的都是一个地方。在这里交大家一个方法：

# 快速切换文件

我们可以在 source 选项卡中查找当前网站的所有资源，但是如果资源比较多怎么办

这时候可以使用 open file 快捷键 `Ctrl + p(cmd+p on mac)` ,就能快速查找到你项目的文件。

# 截取整个页面||单个元素的图片

有的时候我们想截取整个网页的图片或者单个元素的图片，这时候怎么办呢？

`Ctrl + Shift + P (Command + Shift + P on mac)`

然后输入 Capture 就能找到相关的命令

选择 `Capture full size screenshot` 然后敲击回车键 就会将整个网站

可以使用快捷键 `Ctrl + Shift + C (Command + Shift + C on mac)`选择某个原始，然后使用快捷键 `Ctrl + Shift + P`
选择 `Capture node screenshot` 然后敲击回车键 就会将这个元素的图片截取下来。