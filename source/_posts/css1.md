---
title: css1
abbrlink: 7b0b
date: 2019-06-09 22:58:43
tags:
keywords:
description:
---

写出你所知道的 Block Elements(Block-level Elements) 、 inline Elements 、 Replaced Elements / Empty Elements

<!-- more -->

## 问题
写出你所知道的 Block Elements(Block-level Elements) 、 inline Elements 、 Replaced Elements / Empty Elements ?

CSS 中的元素类型

### 替换和不可替换元素

元素本身的特点，可以分为替换和不可替换元素

#### 替换元素 Replaced Element/ Empty Elements

替换元素是浏览器根据元素的标签和属性，来决定元素的具体显示内容。
例如 `<img>` 标签的 scr 属性的值来读取图片的信息并显示出来，而如果查看 html 代码，则看不到图片的实际内容；又列如会根据 input 的 type 属性来决定显示输入框还是单选按钮。

html 中的 `<img>` `<input>` `<select>` `<textarea>` `<video>`都是可替换元素。

#### 不可替换元素

html 中大部分元素是不可替换元素，即其内容直接展示。

### 块级元素

默认情况下块级元素会新起一行。并且会横向充满其父元素的内容区域。

常见的块级元素

`<address>` `<div>` `<article>` `<aside>` `<audio>` `<canvas>` `<section>` `<header>` `<p>` `<form>` `<h1>`到`<h6>`等

特点：

* 总是新起一行。
* 高度、行高以及顶和底边距都可控制。
* 宽度缺省是它的容器的 100% 除非设定一个宽度。

与行内元素相比

* 可以包含行内元素和块级元素

### 行内元素

特点：

* 和其他元素都在一行上
* 高，行高以及顶和底边距不可变
* 宽度就是他的文字或者图片的宽度，不可改变

与块级元素相比：
* 一般情况下只能包含数字和其他行内元素。
* 默认情况下，行内元素不会新起一行。

`<span>` `<i>` `<strong>` `<br>` `<a>`

几乎所有的可替换元素都是行内元素。

### display

其实就是对 display 属性的考察，因为 diplay 可以改变，所以元素的形态是经常可以切换的。

#### inline-block 

将元素呈现为内联元素，但是对象的内容作为块级元素。

然后，同级的元素作为内联元素排在一行上，允许空格。

#### IE下块元素如何实现display:inline-block的效果？

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


## img 标签的 alt 属性 和 title 属性有什么区别？

alt 标签内容是 img src 属性内容获取失败之后展示
title 是鼠标移动到图片的时候显示

## 何为 BFC 如何触发？

BFC 是 块级格式化上下文 （block fromatting context）是按照块级盒子布局的。
块级格式化上下文包含创建它的元素内部的所有内容，并且在当前块级格式化上下文中盒子竖着排列。但是 BFC 不包含子元素 BFC 的子元素。

形成 BFC 的条件：
* 根元素或者其他包含它的元素。
* float 不为 none
* position 的值不是 static 或者 relative。
* display 的值是 inline-block、table-cell、flex、table-caption、grid 或者 inline-flex 
* overflow 的值不是 visible。

也就是说，当看到这些属性的时候，就代表了当前元素已经创建了一个 BFC。

对浮动定位与清除浮动都很重要。
浮动定位和清除浮动时只会应用于同一个 BFC 内的元素。
浮动不会影响其他 BFC 中元素的布局，清除浮动只能清除同一 BFC 内的元素。
外边距折叠（margin collapsing）也只会发生在同一个 BFC 的块级元素之间。

**重点**
1. 子元素一个接一个的垂直排列
2. box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 box 的 margin 会发生重叠。
3. 每个元素的左外边缘（margin-left）与包含块的左边（contain box left）相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此，除非这个元素自己形成了一个新的BFC。
4. BFC 的区域不会与 float box 重叠。
5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是如此。
6. 计算BFC的高度时，浮动元素也参与计算。


主要解决的问题：

处理浏览器溢出的内容：如果一个没有高度或者高度为 auto 的盒子的子元素是浮动元素，则该盒子的高度是不会被撑开的，可以通过父级创建 BFC来包含浮动元素，这时的父级的高度要计算浮动元素的高度。

创建新的BFC来避免相邻的 div 之间的外边距合并。

避免文字环绕问题。

* 处理溢出的内容

![](https://user-gold-cdn.xitu.io/2019/6/11/16b4433fe8bac5ce?w=770&h=211&f=png&s=2315)
```
<style>
  .box{
    background-color: #888; // 灰色
  }
  .float{
        background: #73DE80;    /* 绿色 */
        opacity: 0.5;
        border: 3px solid #F31264;
        width: 200px;
        height: 200px;
        float: left;
    }
    .static{                        /* 粉色 */
        background: #EF5BE2;
        opacity: 0.5;
        border: 3px solid #F31264;
        width:400px;
        min-height: 100px;
    }
  </style>
```
```
<div class='box'>
    <div class='float'></div>
    <div class='static'></div>
</div>
```
box 添加 overflow:hidden 属性来形成 BFC

![](https://user-gold-cdn.xitu.io/2019/6/11/16b44343f24c6dc5?w=768&h=198&f=png&s=2422)
* 解决BFC中相邻两个元素外边距折叠的问题

![](https://user-gold-cdn.xitu.io/2019/6/11/16b443463691b09d?w=772&h=318&f=png&s=4355)
```
.box{
    background-color: #888;
    overflow: hidden;
  }
  .float{
        background: #73DE80;    /* 绿色 */
        opacity: 0.5;
        border: 3px solid #F31264;
        width: 200px;
        height: 200px;
    }
    .static{                        /* 粉色 */
        background: #EF5BE2;
        opacity: 0.5;
        border: 3px solid #F31264;
        width:400px;
        min-height: 100px;
    }
    .m-1{
      margin: 10px 0;
    }
```
```
<div class='box'>
    <div class='float m-1'> </div>
    <div class='static m-1'> </div>
</div>
```

box 的两个元素的实际外边距只有 10px 。让其中一个形成BFC就可以解决这个问题。

* 避免文字环绕

![](https://user-gold-cdn.xitu.io/2019/6/11/16b44348f1c4be29?w=765&h=102&f=png&s=9125)
```
.box{
    background-color: #888;
    overflow: hidden;
  }
  .float{
        background: #73DE80;    /* 绿色 */
        opacity: 0.5;
        border: 3px solid #F31264;
        width: 100px;
        height: 20px;
        float: left;
    }
```
```
<div class='box'>
    <div class='float'> </div>
    <p>BFC 是 块级格式化上下文 （block fromatting context）是按照块级盒子布局的。 块级格式化上下文包含创建它的元素内部的所有内容，并且在当前块级格式化上下文中盒子竖着排列。但是 BFC 不包含子元素 BFC 的子元素</p>
</div>
```

将p标签变为新的BFC就可以解决

## padding-top 设置百分比时是基于什么计算的

padding 使用百分比时是基于内容的宽度计算的

### css 参照百分比

* 参照父元素**宽度**的元素： padding margin width text-indent
* 参照父元素**高度**的元素： height
* 参照父元素**属性**的元素： font-size line-height
特殊： **相对定位时**时，top(bottom) left(right) 参照父元素内容区域的**高度**和**宽度**，而**绝对定位**时，参照最近的定位元素包含 Padding 的高度与宽度。

## 通过 CSS 实现图片宽高比固定为 4:3( 图片占满容器的宽度， 但容器宽度并不固定)

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
还需要要求 .img 的父级元素也是 **块级** 元素。

## 最大的正方形

和上个题目一样
块级元素+padding 来确定元素大小

```
div{
    width:100%;
    padding-top/padding-bottom:100%;
}
```

## postion 的取值

postion:
* relative: 生成相对定位的元素，相对于其正常位置进行定位。left等生效。
* absolute: 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
* fixed: 生成绝对定位的元素，相对于浏览器窗口进行定位。
* static: 没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
* sticky: 粘性定位，基于用户滚动的位置。常用**吸顶**盒子。在目标区域滚动，行为和 position:relative 相同，当页面滚动超出目标区域时，他的表现想 position:fixed.
* inherit: 规定应该从父元素继承 position 属性的值。

## rem
em 相对 父元素的属性
rem 相对  html 根元素/css3 新增的一个相对单位

## border 简写

border: 1px solid red;

## textarea 相关属性

texteara webkit 内核的浏览器会默认设置 resize: both 用户可以调节元素的宽度和高度
resize 的属性包括
none: 不能调节元素的尺寸
horizontal: 调节元素的宽度
vertical: 调节元素的高度

## 列举伪元素

css2 
:before
:after
css1
:first-line 向文本的第一行添加特殊样式。
:first-letter 向文本的第一个字母添加特殊样式。

## 伪类

:first-child 首个子对象
:last-child 最后一个对象
:link 未访问的链接
:visited 已访问的链接
:hover 鼠标移动到链接上
:active 选定的链接

注意：hover 必须在 link 和 visited 之后才能生效
注意：active 必须在 hover 之后才能生效


## 浮动到底是什么

浮动是元素脱离文档流。

清除浮动的方式:

```
// 现代浏览器clearfix方案，不支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}

// 全浏览器通用的clearfix方案
// 引入了zoom以支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearfix{
    *zoom: 1;
}

// 全浏览器通用的clearfix方案【推荐】
// 引入了zoom以支持IE6/7
// 同时加入:before以解决现代浏览器上边距折叠的问题
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}
```

## 盒模型

content padding border margin

## box-sizing

border-box: width = content+padding+border

content-box: width = content

## 水平垂直居中

[水平垂直居中](https://juejin.im/post/58f818bbb123db006233ab2a)

## css gpu加速的属性有哪些

## 重绘和回流

重绘：元素的样式改变不影响布局时，浏览器使用重绘更新元素，只需要 UI 层面的像素重新绘制，因此损耗较少。
回流：元素的布局改变，需要重新部分或全部文档的过程称为回流。

引起回流的操作：
元素的添加和移除
元素的大小、位置、内容、字体大小发生改变。
激活伪类(:hover)

其他
页面首次渲染
浏览器窗口大小发生改变
元素内容变化（文字数量或图片大小等等）
添加或者删除可见的DOM元素
激活CSS伪类（例如：:hover）
查询某些属性或调用某些方法

常用的会导致回流的属性和方法

```
clientWidth、clientHeight、clientTop、clientLeft
offsetWidth、offsetHeight、offsetTop、offsetLeft
scrollWidth、scrollHeight、scrollTop、scrollLeft
scrollIntoView()、scrollIntoViewIfNeeded()
getComputedStyle()
getBoundingClientRect()
scrollTo()
```

如何避免

css

避免使用 table 布局。
尽可能在 DOM 树的最末端改变 class 。
避免设置多层内联样式。
将动画效果应用到 position 属性为 absolute 或 fixed 的元素上。
避免使用CSS表达式(例如：calc())

JavaScript

避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性。
避免频繁操作 DOM ，创建一个 documentFragment ，在它上面应用所有 DOM 操作，最后再把它添加到文档中。
也可以先为元素设置 display: none ，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘。
避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。


## 浏览器渲染原理

### 浏览器解析

浏览器把 html 解析成 Dom , CSS 解析成 CSSOM ， 解析完成后将 Dom 和 CSSOM 合并产生了 RenderTree.

Javascript 脚本，主要是通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree.


Rendering Tree 渲染树并不等同于 DOM 树，因为一些像 Header 或 display:none 的东西就没必要放在渲染树中了。

CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element。也就是DOM结点。也就是所谓的Frame。

然后，计算每个 Frame（也就是每个Element）的位置，这又叫 layout 和 reflow(回流) 过程

最后通过调用操作系统 Native GUI 的 API 绘制。

## flex 布局

display: flex 开启，自动建立 BFC 。

容器属性：

### flex-direction 主轴的方向,项目的排列方向
```
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

### flex-wrap 轴线上如何换行

```
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

### flex-flow 是flex-direction和flex-wrap的简写形式

```
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

### justify-content 主轴的对其方式

```
.box {
  justify-content: flex-start(默认值) | flex-end | center | space-between | space-around;
}
// space-between 项目之间的距离都相等
// space-around 项目两侧的间隔都相等，所以项目之间的间隔比与边框的间隔大一倍
```

### align-items 交叉轴上如何对齐

```
.box {
  align-items: flex-start | flex-end | center | baseline | stretch(默认值));
}
// baseline 项目的第一行文字的基线对齐
// stretch 如果项目未设置高度或设为auto，将占满整个容器的高度。
```

### align-conetent 

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

## flex 项目的属性

### order 
项目的顺序，数字越小，排列越靠前，默认值是0

### flex-grow 
定义项目的放大的比例，默认为0，保持自身，即使还有剩余空间，也不放大。
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### flex-shrink 
定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

### flex-basis 属性

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值是 auto ,即项目的本来大小。

可以设置和 width 一样的值。

### flex 属性

flex-grow,flex-shrink,flex-basis 属性的简写

### align-self 属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## css 加载顺序

css 样式渲染顺序

```
<style>
.blue{
color: blue;
}
.red{
color: red;
}
</style>
<div class="blue red">123</div>
<div class="red blue">123</div>
```

两个 div 的字体分别是什么颜色？

答案是：都是红色

因为在 css 样式表中 red 后于 blue，red 中的 color 样式 的优先级比 blue 中 color 高

## display:none 和 visibility:hiddden 的区别

* display: none 的元素不占据任何空间，visibility: hidden 的元素空间保留；
* display: none 会影响 CSS3 的 transition 过渡效果，visibility: hidden 不会；
* display: none 会产生重绘 ( repaint ) 和回流 ( relfow )，visibility: hidden 只会触发重绘；
* 株连性：display: none 的节点和子孙节点元素全都不可见，visibility: hidden 的节点的子孙节点元素可以设置 visibility: visible 显示。visibility: hidden 属性值具有继承性，所以子孙元素默认继承了 hidden 而隐藏，但是当子孙元素重置为 visibility: visible 就不会被隐藏。

