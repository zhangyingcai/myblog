---
title: date
tags: date
categories: Vue
abbrlink: 50601
date: 2019-01-15 16:55:10
---

date.js 处理日期的函数

<!-- more -->

```
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 用法
// 可以使用filter
dateFilter(number) {
    // js默认是毫秒，先转换为毫秒
    const date = new Date(number * 1e3)
    return formatDate(date, 'yyyy.MM.dd hh:mm:ss')
}
```