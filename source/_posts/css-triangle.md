---
title: 用css画三角形
date: 2018-12-11 18:22:42
tags: css
---

```
.triangle{
    height:0;
    width:0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
}

```

画出的是一个倒立的三角形, 改为border-bottom就是一个正立的三角形。其中是底边为100px,高度为100px的等腰三角形。

<!-- more -->

# border画多边形的原理

```
.box{
    width: 100px;
    height: 100px;
    margin:10px;
    border-left:100px solid red;
    border-right:100px solid blue;
    border-top:100px solid yellow;
    border-bottom:100px solid green;
}
```

[盒子模型](/images/微信截图_20181212091150.png)

如上图的盒子模型，可以明显的看出，border实际上是一个等腰梯形。

当宽度为0时

[宽度为0](/images/微信截图_20181212092124.png)

四个边框变成四个等腰三角形。

TODO：继续深入了解，解决梯形的问题