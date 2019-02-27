---
title: web-ios
date: 2019-02-26 16:03:47
tags: ios适配
---
记录在开发过程中遇到的iOS需要适配的问题
<!-- more -->
# input输入框自动放大的问题

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