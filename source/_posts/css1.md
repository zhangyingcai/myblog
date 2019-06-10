---
title: css1
date: 2019-06-09 22:58:43
tags:
keywords:
description:
---

写出你所知道的 Block Elements(Block-level Elements) 、 inline Elements 、 Replaced Elements / Empty Elements

<!-- more -->

# 写出你所知道的 Block Elements(Block-level Elements) 、 inline Elements 、 Replaced Elements / Empty Elements

CSS 中的元素类型

## 替换和不可替换元素

元素本身的特点，可以分为替换和不可替换元素

### 替换元素 Replaced Element/ Empty Elements

替换元素是浏览器根据元素的标签和属性，来决定元素的具体显示内容。
例如 `<img>` 标签的 scr 属性的值来读取图片的信息并显示出来，而如果查看 html 代码，则看不到图片的实际内容；又列如会根据 input 的 type 属性来决定显示输入框还是单选按钮。

html 中的 `<img>` `<input>` `<select>` `<textarea>` `<select>` `<video>`都是可替换元素。

### 不可替换元素

html 中大部分元素是不可替换元素，即其内容直接展示。

## 块级元素

默认情况下块级元素会新起一行。并且会横向充满其父元素的内容区域。

常见的块级元素

`<address>` `<div>` `<article>` `<aside>` `<audio>` `<canvas>` `<section>` `<header>` `<p>` `<form>` `<h1>`到`<h6>`等

特点：

* 总是新起一行。
* 高度、行高以及顶和底边距都可控制。
* 宽度缺省是它的容器的 100% 除非设定一个宽度。

与行内元素相比

* 可以包含行内元素和块级元素

## 行内元素

特点：

* 和其他元素都在一行上
* 高，行高以及顶和底边距不可变
* 宽度就是他的文字或者图片的宽度，不可改变

与块级元素相比：
* 一般情况下只能包含数字和其他行内元素。
* 默认情况下，行内元素不会新起一行。

`<span>` `<i>` `<strong>` `<br>` `<a>`

几乎所有的可替换元素都是行内元素。

## display

其实就是对 display 属性的考察，因为 diplay 可以改变，所以元素的形态是经常可以切换的。

### inline-block 将元素呈现为内联元素，但是对象的内容作为块级元素。

然后，同级的元素作为内联元素排在一行上，允许空格。

## IE下块元素如何实现display:inline-block的效果？

有两种方法：
1.先使用display:inline-block属性触发块元素，然后再定义display:inline，让块元素呈递为内联对象（两个display要先后放在两个CSS声明中才有效果，这是IE的一个经典bug，如果先定义了display:inline-block，然后再将display设回inline或block，layout不会消失）。代码如下（...为省略的其他属性内容）：

```
div{display:inline-block;...}
div {display:inline;}
```


2、直接让块元素设置为内联对象呈递（设置属性display:inline），然后触发块元素的layout（如：zoom:1等）。代码如下：

```
div{display:inline; zoom:1;...}
```


# img 标签的 alt 属性 和 title 属性有什么区别？

alt 标签内容是 img src 属性内容获取失败之后展示
title 是鼠标移动到图片的时候显示

# 何为 BFC 如何触发？

BFC 是 块级格式化上下文 （block fromatting context）是按照块级盒子布局的。
块级格式化上下文包含创建它的元素内部的所有内容，并且在当前块级格式化上下文中盒子竖着排列。但是 BFC 不包含子元素 BFC 的子元素。

形成 BFC 的条件：
* 根元素或者其他包含它的元素。
* float 不为 none
* position 的值是 absolute 或 fixed。
* display 的值是 inline-block、table-cell、flex、table-captio、grid 或者 inline-flex 
* overflow 的值不是 visible。

也就是说，当看到这些属性的时候，就代表了当前元素已经创建了一个 BFC。

对浮动定位与清除浮动都很重要。
浮动定位和清除浮动时只会应用于同一个BFC内的元素。
浮动不会影响其他BFC中元素的布局，清除浮动只能清除同一BFC内的元素。
外边距折叠（margin collapsing）也只会发生在同一个BFC的块级元素之间。

主要解决的问题：
处理浏览器溢出的内容。
创建新的BFC来避免相邻的 div 之间的外边距合并。


# padding-top 设置百分比时是基于什么计算的

padding 使用百分比时是基于内容的宽度计算的

## css 参照百分比

* 参照父元素**宽度**的元素： padding margin width text-indent
* 参照父元素**高度**的元素： height
* 参照父元素**属性**的元素： font-size line-height
特殊： **相对定位时**时，top(bottom) left(right) 参照父元素内容区域的**高度**和**宽度**，而**绝对定位**时，参照最近的定位元素包含 Padding 的高度与宽度。

# 通过 CSS 实现图片宽高比固定为 4:3( 图片占满容器的宽度， 但容器宽度并不固定)

或者：图片在自适应过程中，图片的长宽比要保持不变。

使用图片容器进行占位来实现。
块级元素的 padding 设置为百分比的时候，是按照父元素的内容的宽度来设定的，那么我们可以按照比例来设置容器的宽度（padding-top/padding-bottom）, 图片则使用绝对定位来显示在容器的下层。

```
<div class="img">
    <img src="">
</div>
```

```css
.img{
    width:100%;
    position:relative;
    height:0;
    overflow:hidden;
    padding-bottom: 75%; // 4:3
}
.img img{
    positon: absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
}
```
还需要要求 .img 的父级元素也是 block 元素。

# postion 的取值

postion:
* relative: 生成相对定位的元素，相对于其正常位置进行定位。left等生效。
* absolute: 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
* fixed: 生成绝对定位的元素，相对于浏览器窗口进行定位。
* static: 没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
* inherit: 规定应该从父元素继承 position 属性的值。

<script src="https://cdn.jsdelivr.net/npm/live2d-widget@3.0.4/lib/L2Dwidget.min.js"></script>
<script type="text/javascript">
L2Dwidget.init();
</script>
