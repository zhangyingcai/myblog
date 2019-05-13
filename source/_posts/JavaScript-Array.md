---
title: Array 对象的方法
date: 2019-05-13 17:59:00
tags:
---

<!-- more -->

# Array.splice() 删除或者替换先有元素

array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

* start 起始位置，如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从 -1 计数，这意味着 -n 是倒数第 n 个元素并且等价于 array.length-n ）；如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。
* deleteCount 要删除的元素的个数
* item1, item2 要添加进数组的元素

return 返回由删除的元素组成的一个数组。

这样原数组就会被改变为我们想要的结构。

# Array.concat() 合并字数组

var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

* 将多个数组合并成一个数组

return 合并的数组。

# Array.includes() 用来判断一个数组是否包含一个指定的值

用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。

arr.includes(valueToFind[, fromIndex])

* valueToFind 需要查找的元素
* fromIndex 从 fromIndex 索引处开始查找 valueToFind 。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

注意：对象数组不能使用includes方法来检测。
