---
title: web-ios
date: 2019-02-26 16:03:47
tags: ios适配
categories: 其他
---
记录在开发过程中遇到的iOS需要适配的问题
<!-- more -->

# mate 相关注意事项汇总

```
<meta charset="utf-8">
<!--主要I是强制让文档的宽度与设备宽度保持1:1，最大宽度1.0，禁止屏幕缩放。-->
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<!--这个也是iphone私有标签，允许全屏浏览。-->
<meta content="yes" name="apple-mobile-web-app-capable">
<!--iphone的私有标签，iphone顶端状态条的样式。-->
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<!--禁止数字自动识别为电话号码，这个比较有用，因为一串数字在iphone上会显示成蓝色，样式加成别的颜色也是不生效的。-->
<meta content="telephone=no" name="format-detection">
<!--禁止email识别-->
<meta content="email=no" name="format-detection">
<!-- 强制横屏或竖屏 -->
<meta name="screen-orientation" content="portrait">//uc
<meta name="x5-orientation" content="portrait">//qq
```

# input输入框自动放大的问题
[runoob](http://www.runoob.com/css/css-rwd-viewport.html)

mate name="viewport" 添加 "user-scalable=no" 禁止手动缩放

# shrink-to-fit(自适应宽度)
下面的代码可以让网页的宽度自动适应手机屏幕的宽度
```
<meta name="viewport" content="width=device-width,initial-scale=1">
```
iOS9以上生效要添加"shrink-to-fit=no"
原因如下
```
Viewport meta tags using"width=device-width" cause the page to scale down to fit content that overflows the viewport bounds.
You can override this behavior by adding "shrink-to-fit=no" to your meta tag as shown below.
The added value will prevent the page from scaling to fit the viewport.
```

# 记录一个由于IOS mobile chrome由transition引发的问题

测试出来只有在iOS12.1.14版本 的mobile charome上出现的问题 版本72.0.3626.101

问题是阅读页面吊顶，用户点击当前页面显示隐藏顶部操作栏，在手机上出现闪烁，每次的初始位置在元素下方很远的位置

```
.transHead{// 默认上移77px
    transition: all .2s linear;
    transform: translateY(-77px);
    -webkit-transform: translateY(-77px);
    -ms-transform: translateY(-77px);
    -moz-transform: translateY(-77px);
    -o-transform: translateY(-77px);
}
.moveIn { // 点击后移入页面动画
    transform: translateZ(0)!important;
    -webkit-transform: translateZ(0)!important;
    -ms-transform: translateZ(0)!important;
    -o-transform: translateZ(0)!important;
    -moz-transform: translateZ(0)!important;
}
```
仔细检查transform没有发现问题，偶然发现淘宝大神写的一篇文章[这里](https://blog.csdn.net/ft6302244/article/details/44939783)
发现transition会导致这个问题，果断使用排除法测试，真的是这个属性的问题（苦笑）。
Google关键字“Chrome transition blink”和“Chrome transition bug”
解决方案：
* -webkit-backface-visibility: hidden;（设置进行转换的元素的背面在面对用户时是否可见：隐藏）perspective:1000;(观察者与z=0平面的距离，使具有三维位置变换的元素产生透视效果)
* -webkit-transform-style: preserve-3d; （设置内嵌的元素在 3D 空间如何呈现：保留 3D ）

亲测上述两种方法都是有效的。不过第二种方法有时候会复现。

# webkit 私有属性 -webkit-overflow-scrolling: touch 运行独立的滚动区域和触摸回弹