---
title: String对象的方法
date: 2019-05-13 18:08:01
tags:
---
<!-- more -->

# String.prototype​.concat() 合并字符串并返回新的字符串

强烈建议使用 赋值操作符（+, +=）代替 concat 方法

# String.prototype​.includes() 判断一个字符串是否包含在另一个字符串中

str.includes(searchString[, position])

* searchString 要查询的字符串
* position 可选，起始位置

retrun  boolean

注：区分大小写

# String.prototype​.indexOf() 指定值的第一次出现的索引

str.indexOf(searchValue[, fromIndex])

* searchValue 要查询的字符串
* fromIndex 可选，起始位置

retrun  索引 未找到返回 -1

注：区分大小写

# String.prototype​.substr() 返回一个字符串中从指定位置开始到指定字符数的字符。

str.substr(start[, length])

