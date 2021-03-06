---
title: Markdown的基本使用
tags: Markdown
categories: Markdown
abbrlink: 64441
date: 2018-11-29 16:15:26
---

记录markdown的使用方法

<!-- more -->

# 标题

在想要设置为标题的文字前面加#来表示
一个#是一级标题，二个#是二级标题，以此类推。支持六级标题。

注：标准语法一般在#后跟个空格再写文字。

示例:
```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```
效果如下：
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题

# 字体

### * 加粗

`**[要加粗的文字]**`用两个*号包起来

### 斜体

`*[要斜体的文字]*`用一个*号包起来
`_[要斜体的文字]_`用一个_号包起来

### 斜体加粗

`***[要斜体加粗的文字]***`用三个*号包起来
`**_[要斜体加粗的文字]_**`用三个*号包起来

### 删除线

`~~[要删除线的文字]~~`用两个`~`号包起来

示例：
```
**这是加粗的文字**
*这是倾斜的文字*
_这是倾斜的文字_
***这是斜体加粗的文字***
**_这是斜体加粗的文字_**
~~这是加删除线的文字~~
```
效果如下：
**这是加粗的文字**
*这是倾斜的文字*
_这是倾斜的文字_
***这是斜体加粗的文字***
**_这是斜体加粗的文字_**
~~这是加删除线的文字~~

注:加粗hexo不能用 捂脸

# 引用

在引用的文字前加>即可。引用也可以嵌套，如加两个>>三个>>>
n个...
貌似可以一直加下去，但没神马卵用

示例：
```
>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
```
效果如下:
>这是引用的内容
>>这是引用的内容
>>>>>这是引用的内容

# 分割线

三个或者三个以上的 - 或者 * _。行内不能有其他东西，也可在*号中间插入空格。

示例:
```
---
----
***
*****
```
效果如下：

----
***
*****
注：效果一样 o(*￣︶￣*)o，hexo 三个-没用 ￣□￣｜｜

# 图片

语法：
```
![图片alt](图片地址 ''图片title'')

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加
```
示例：
```
![小猪佩奇](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543491437191&di=d1111fbe37d3bd83c8121132d6117c4f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180802%2F01%2F1533145434-yGPirmnoVd.jpg ''小猪'')
```
效果如下：
![小猪佩奇](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543491437191&di=d1111fbe37d3bd83c8121132d6117c4f&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180802%2F01%2F1533145434-yGPirmnoVd.jpg '小猪')

# 超链接

语法：
```
[超链接名](超链接地址 "超链接title")
title可加可不加
```
示例：
```
[百度](https://baidu.com "@百度")
```

[百度](https://baidu.com "@百度")

注：Markdown本身语法不支持链接在新页面中打开,如果想要在新页面中打开的话可以用html语言的a标签代替。
```
<a href="超链接地址" target="_blank">超链接名</a>
```

# 列表

无序列表使用* - + 作为列表标记
注:标记和内容之间要加空格

示例:
```
* red
* green
* yellow

- red
- green
- yellow

+ red
+ green
+ yellow
```
效果如下:
* red
* green
* yellow

- red
- green
- yellow

+ red
+ green
+ yellow

有序列表使用数字接着一个英文句号
注:标记和内容之间要加空格

示例：
```
3. red
2. green
1. yellow
```
3. red
2. green
1. yellow

注:有序的起始数只和第一个有关

# 表格

语法：
```
|表头|表头|表头|表头|
|---|---:|-:|:-|
|内容|居中|居右|居左|
|内容|居中|居右|居左|

-有一个就行
```
效果如下：

|表头|表头|表头|表头|
|---|---:|-:|:-|
|内容|居中|居右|居左|
|内容|居中|居右|居左|

注：很显然 hexo并没有用

# 下划线

语法：
```
<u>123</u>
```
效果如下：
<u>123</u>
注：使用的是html标签

# 颜色、字体、字体大小

语法：
```
<font color=#ee0000 size=9 face="黑体">我是黑体</font>
<font color=#00ee00 size=8 face="宋体">我是宋体</font>
<font color=#ee00ee size=7 face="微软雅黑">我是微软雅黑</font>
<font color=#ee0000 size=6 face="黑体">我是黑体</font>
<font color=#00ee00 size=5 face="宋体">我是宋体</font>
<font color=#ee00ee size=4 face="微软雅黑">我是微软雅黑</font>
<font color=#ee0000 size=3 face="黑体">我是黑体</font>
<font color=#00ee00 size=2 face="宋体">我是宋体</font>
<font color=#ee00ee size=1 face="微软雅黑">我是微软雅黑</font>

color 16进制颜色
size  6-1分别对应h1-h6共6个级别
face  字体
```
效果如下：
<font color=#ee0000 size=9 face="黑体">我是黑体</font>
<font color=#00ee00 size=8 face="宋体">我是宋体</font>
<font color=#ee00ee size=7 face="微软雅黑">我是微软雅黑</font>
<font color=#ee0000 size=6 face="黑体">我是黑体</font>
<font color=#00ee00 size=5 face="宋体">我是宋体</font>
<font color=#ee00ee size=4 face="微软雅黑">我是微软雅黑</font>
<font color=#ee0000 size=3 face="黑体">我是黑体</font>
<font color=#00ee00 size=2 face="宋体">我是宋体</font>
<font color=#ee00ee size=1 face="微软雅黑">我是微软雅黑</font>

# 代码

语法：
```
单行代码
`代码内容`

多行代码块
(```)
    代码块
(```)
```
效果如下

单行代码
`代码内容`

多行代码块
```
    代码块
```

# 流程图

示例：
```
flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&
```
效果如下
flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&

注：hexo 不支持