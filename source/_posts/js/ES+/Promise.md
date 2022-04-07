---
title: Promise
p: js/ES+/Promise
date: 2022-04-07 13:30:18
tags:
keywords:
description:
---

# Promise

## Promise 延时函数实现

```js
/*
* @params time { number } 延迟时间，毫秒
*/
const delay = (time) => {
  return new Promise((resolve)=>{
    setTimeout(()=>resolve(time), time)
  })
}

console.log('1')
delay(1000).then((time)=>{
  console.log('2',time)
})
console.log('3')
delay(1000).then((time)=>{
  console.log('4',time)
})
```
## Promise 手写

## Promise.all

## Promise.race

## 参考资料
[Promise/A+规范](https://promisesaplus.com)
[【中文翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566)

<script src="https://cdn.jsdelivr.net/npm/live2d-widget@3.0.4/lib/L2Dwidget.min.js"></script>
<script type="text/javascript">
L2Dwidget.init();
</script>
