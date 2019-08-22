---
title: css
tags: css
categories: CSS
abbrlink: 52116
date: 2019-01-10 16:38:40
---

用于记录css遇到的问题

<!-- more -->

# button

```
type
button的类型。可选值：
* submit:  此按钮将表单数据提交给服务器。如果未指定属性，或者属性动态更改为空值或无效值，则此值为默认值。
* reset:  此按钮重置所有组件为初始值。
* button: 此按钮没有默认行为。它可以有与元素事件相关的客户端脚本，当事件出现时可触发。
* menu: 此按钮打开一个由指定<menu>元素进行定义的弹出菜单。
```

注：默认为submit可以出发输入框回车事件。


# text-overflow

[runoob](http://www.runoob.com/cssref/css3-pr-text-overflow.html)
语法

```
属性确定如何向用户发出未显示的溢出内容信号。它可以被剪切，显示一个省略号（'...'，U + 2026 HORIZONTAL ELLIPSIS）或显示一个自定义字符串。

这个属性并不会强制"溢出"事件的发生，因此为了能让"text-overflow"能够生效，程序员们必须要在元素上添加几个额外的属性，比如"将overflow 设置为hidden"。
```
省略号
```
{
    -webkit-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
}

单行省略
{
    white-space: nowrap; // 不换行
    width: 10rem;
    -webkit-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
}
注：需要适配浏览器
```

# 图片自适应

一般是控制宽度高度自适应

用代码翻译一下就是
```
max-width: 100%;
height: auto;
```

# display

```
默认 inline // 元素会被显示为内联元素，元素前后没有换行符。
block // 元素被显示为块级元素，元素前后有换行符
none // 元素不显示，也不占空间
inherit // 元素继承父元素的属性
inline-block // 行内块元素
```

# word-break

```
指定了在单词内断行
normal // 使用默认的断行规则
break-all // 可在任意字符间断行
keep-all // 文本不断行
break-word // 断行，但是不会断单个单词
```

# box-sizing

box-sizing

content-box：就是默认使用的盒模型，content只包括盒模型的width和height
border-box：content包括content/padding/border

# css3新特性
[用于那些属性需要添加前缀-can i use](https://caniuse.com/)

## 圆角

```
div{
    border:2px solid;
    border-radius: 25px;
}
div{
    border-top-left-radius: 50%;
}

.radius{
            width: 200px;
            height: 200px;
            background-color: aqua;
            /* border-top-left-radius: 100px; */
            /* border-top-right-radius: 100px; */
            border-radius: 100px 100px 50px 20px; // top left 左上角开始顺时针旋转
            border-radius: 100px 50px; //分别代表斜对角的radius值
            border-top-left-radius: 100px 50px; // 分别代表椭圆的x(横)和y(纵)当两者相等时画出的是圆角
        }
注 50%是画圆
```
半圆
```
.radius{
            width: 100px;
            height: 200px;
            background-color: aqua;
            /* border-top-left-radius: 100px; */
            /* border-top-right-radius: 100px; */
            /* border-radius: 100px 50px; */
            border-radius: 100px 0 0 100px;
        }
```
## 伪类选择器
[列表](http://www.runoob.com/cssref/css-selectors.html)

```
a:link
a:visited // 链接点击过之后的颜色
a:hover // 鼠标在元素上的颜色
a:active // 鼠标左键长按的颜色

状态伪类选择器
input:enabled
input:disabled
```

# 隔行换色

```
语法
:nth-child(2) //选择第二个
:nth-child(2n) //选择所有偶数行
:nth-child(2n+1) //选择所有基数行
:nth-child(n+5) //选择从第五行开始
:nth-child(n) //全选

:nth-last-child() // 和上面相同，从最后一个子元素开始算

// 上面计数时包括当前标签里的所有类型的元素都会计数
// 所以都是相同元素的时候没有影响

:nth-of-type() // 从当前限定的元素类型开始计算，用法同上
:nth-last-of-type()
:first-of-type()
:last-of-type()
:only-child() // 当前只有一个子元素时
:only-of-type() // 当前只有一个子元素并且是当前限定的元素类型
```

# 伪元素

[mdn伪类和伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements)

```
语法：
跟伪类很像，但它们又有不同的地方。它们都是关键字，但这次伪元素前缀是两个冒号 `::` ， 同样是添加到选择器后面去选择某个元素的某个部分。

::after
::before
::first-letter
::first-line
::selection
::backdrop
```
示例
```
<style>
.letter::first-letter{
    font-size: 35px;
    color: crimson;
    font-weight: bold;
    float: left;
}
/* 添加float:left首个文字就会下沉 */
.letter::first-line{
    color: #f66
}
/* 首行 */
</style>
```
```
::after{
    content:url();
}
::before // 这两个元素在使用时必须有content
```

# 画对话框

```
.dialog{
            width: 200px;
            height: 50px;
            line-height: 50px;
            background-color: #f66;
            border-radius: 6px;
            position: relative;
        }
        .dialog::before{
            content: '';
            border-width: 10px;
            border-color: transparent; 
            border-style: solid;
            border-right: 10px solid #f66;
            position: absolute;
            top: 15px;
            left: -20px;
        }
```
# 画菱形和平行四边形

要考虑样式的兼容性。
```
画菱形的思路：先画个正方形旋转45度。 单位deg 
.diamond{
            width: 200px;
            height: 200px;
            -ms-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
            background-color: aqua;
        }
平行四边形使用倾斜
.parallel{
            width: 300px;
            height: 200px;
            -ms-transform: skewX(45deg);
            -moz-transform: skewX(45deg);
            -webkit-transform: skewX(45deg);
            -o-transform: skewX(45deg);
            transform: skewX(45deg);
            background-color: aqua;
        }
```

# 五角星和六角星

# 发光字体、立体字

[runoob](http://www.runoob.com/cssref/css3-pr-text-shadow.html)

```
text-shadow: h-shadow v-shadow blur color;

h-shadow	必需。水平阴影的位置。允许负值。
v-shadow	必需。垂直阴影的位置。允许负值。
blur	可选。模糊的距离。
color	可选。阴影的颜色。参阅 CSS 颜色值。
```

# rem

相对于根元素的大小。
em:相对于父元素的大小。
```
html{
    font-size:62.5%; // 10/16*100% 默认16px
}
```

# flex
[参考](http://www.runoob.com/w3cnote/flex-grammar.html)
Flexible Box的缩写，意思是弹性布局

```
display: flex;
// 行内元素也可以
display: inline-flex;
```

## flex-direction 主轴的方向,项目的排列方向
```
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

## flex-wrap 轴线上如何换行

```
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

## flex-flow 是flex-direction和flex-wrap的简写形式

```
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

## justify-content 主轴的对其方式

```
.box {
  justify-content: flex-start(默认值) | flex-end | center | space-between | space-around;
}
// space-between 项目之间的距离都相等
// space-around 项目两侧的间隔都相等，所以项目之间的间隔比与边框的间隔大一倍
```

## align-items 交叉轴上如何对齐

```
.box {
  align-items: flex-start | flex-end | center | baseline | stretch(默认值));
}
// baseline 项目的第一行文字的基线对齐
// stretch 如果项目未设置高度或设为auto，将占满整个容器的高度。
```

## align-conetent align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

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

## flex

flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写。
默认值 0 1 auto

# 伪元素放到父元素的下面

z-index: -1;

# 文字镂空

## 方式1
text-fill-color
text-stroke
```
text-fill-color:#2E208C;
text-stroke: 1px #2E208C;
```
## 方式2
```
text-shadow: 1px 1px #2E208C, -1px -1px #2E208C, 1px -1px #2E208C, -1px 1px #2E208C;
```

# CSS 外边距合并
[CSS 外边距合并](http://www.w3school.com.cn/css/css_margin_collapsing.asp)

注：只有普通文档流中块框的垂直外边距才会发生外边距合并。行内框、浮动框或绝对定位之间的外边距不会合并。

# 渐变色

语法

background: linear-gradient(direction, color-stop1, color-stop2, ...);
线性渐变 - 从上到下（默认情况下）

```
#grad {
  background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(red, blue); /* 标准的语法 */
}
```

从左到右
```
#grad {
  background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
}
```

从左上角到右下角
```
#grad {
  background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
}
```

也可以使用角度

# font-weight

normal	默认值。定义标准的字符。
bold	定义粗体字符。
bolder	定义更粗的字符。
lighter	定义更细的字符。
100
200
300
400
500
600
700
800
900
定义由粗到细的字符。400 等同于 normal，而 700 等同于 bold。
inherit	规定应该从父元素继承字体的粗细。


