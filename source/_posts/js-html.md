---
title: js-html
date: 2019-02-20 16:22:31
tags: html
categories: Html
---

html常用标签的使用与总结

<!-- more -->

# 首先要了解的概念

## 块级元素和内联元素

```
块级元素在页面中以块的形式展现 —— 相对与其前面的内容它会出现在新的一行，其后的内容也会被挤到下一行展现。块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。一个以`block`形式展现的块级元素不会被嵌套进内联元素中，但可以嵌套在其它块级元素中。

内联元素通常出现在块级元素中并包裹文档内容的一小部分，而不是一整个段落或者一组内容。内联元素不会导致文本换行：它通常出现在一堆文字之间例如超链接元素`<a>`或者强调元素`<em>`和 `<strong>`。
```

# head元素内部

## base标签

```
<base> 标签为页面上的所有的相对链接规定默认 URL 或默认目标。

在一个文档中，最多能使用一个 <base> 元素。<base> 标签必须位于 <head> 元素内部。

示例
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title>
<base href="http://www.runoob.com//images/" target="_blank">
</head>
<body>

<p><img src="logo.png" > - 注意这里我们设置了图片的相对地址。能正常显示是因为我们在 head 部分设置了 base 标签，该标签指定了页面上所有链接的默认 URL，所以该图片的访问地址为 "http://www.runoob.com/images/logo.png"</p>

<p><a href="http://www.runoob.com/">runoob.com</a> - 注意这个链接会在新窗口打开，即便它没有 target="_blank" 属性。因为在 base 标签里我们已经设置了 target 属性的值为 "_blank"。</p>

</body>
</html>
```
[示例链接](http://www.runoob.com/try/try.php?filename=tryhtml_base_test)
注：base 会默认将base的链接和src、url链接拼接

# meta

```
用来描述文档的作者、描述、关键字、字符集等等
name的关键字有`author` `keywords` `description`

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

```
小知识点：每个30秒刷新页面
```
    <meta http-equiv="refresh" content="30">
```
# title

```
文字的标题
```

# <script>

```
定义客户端脚本

如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本
```
# <link>

```
<link ref="stylesheet" type="text/css" href="">
```
