---
title: web总结
tags: 面试题
categories: 面试题
abbrlink: 46455
date: 2019-03-07 19:21:49
---

面试题总结

<!-- more -->

# CSS
# css实现图片自适应宽高？
自适应宽和高 // 根据当前父级元素的大小自动更新大小
```
img{
    max-width:100%;
    min-height:100%;
}
```
等比例缩放图片的话
```
img{
    width:100%;
    height:auto;
}
```

# Ajax

目的：网页能够快速将增量更新展示到页面上，而不用刷新页面，能够快速响应用户的操作，提升了用户体验。

交互模型：

同步异步的区别：同步暂停当前脚本等待服务器处理结果，异步的话是继续执行当前脚本，服务器又返回时处理结果

# JavaScript

# 异步加载js的方案

默认情况javascript是同步加载的，所以通常js文件放到文档底部，优先展示样式。
* defer 只支持IE
* async
* 使用document创建script,插入到DOM中，加载完毕后callback
```
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript"; 
    if (script.readyState) { //IE 
        script.onreadystatechange = function () { 
            if (script.readyState == "loaded" || script.readyState == "complete") { 
                script.onreadystatechange = null; callback(); 
                } 
            };
    } else { //Others: Firefox, Safari, Chrome, and Opera 
        script.onload = function () { callback(); };
    }
    script.src=url;
    document.body.appendChild(script);
}
```

# 网站可用性、可访问性


面试总结

# box-sizing

```
content-box // 标准盒模型 `width` 与 `height` 只包括内容的宽和高
border-box // width = border + padding + 内容的高度
```

# promise用法

# 清除浮动的方法，应用场景以及为什么清除浮动。float

clear:both;
overflow:auto;

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

BFC 是块状格式化上下文

[浮动到底是什么？](https://www.jianshu.com/p/09bd5873bed4)

# 千分位分割数字，并自定义保留小数位数

## 正则表达式
```
function money(num){
    return (''+num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
```
首先考虑的是小数点，在小数点的地方进行位置划分
//g;
//g全局匹配

/(\d)(?=(\d{3})+\.)/g;
\d:匹配一个数字字符，等价于[0-9]
这里最难理解的就是(?=(\d{3})+\.)，且看语法：
x(?=y)：正向肯定查找，匹配后面带有y的x项目

那么在这里意思是：查找一个和"."之间带有一个或多个连续3位数字的数字（x）
```
/**
 *num 要分隔的数字（必填）
 *n 保留的小数位数（可选）
 *symbol 分隔数字使用的符号（可选，默认为","）
 */ 
function splitNum(num,n,symbol) {
    if(!num)throw new Error('splitNum需要传入一个待转换的数据');
    if(typeof num!=='number')throw new TypeError('num参数应该是一个number类型');
    if(n<0)throw new Error('参数n不应该小于0');
    var hasDot=parseInt(num)!=num;//这里检测num是否为小数，true表示小数
    var m=(n!=undefined&&n!=null)?n:1;
    num=m==0?num.toFixed(m)+'.':hasDot?(n?num.toFixed(n):num):num.toFixed(m);
    symbol=symbol||',';
    num=num.toString().replace(/(\d)(?=(\d{3})+\.)/g,function(match, p1,p2) {
        return p1 + symbol;
    });
    if(n==0||(!hasDot&&!n)){//如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
        num=num.substring(0,num.indexOf('.'));
    }
    return num;
}
```
## 
```
function money(num){
    // 先把数字换成字符串，然后转换成数组，反转之后，再组合成字符串
    var reverseStr = num.toString().split('').reverse().join('');
    // 用正则替换，每隔3位加一个逗号
    reverseStr = reverseStr.replace(/(\d{3})/g,'$1,');
    // 处理正好三位的情况，如 123 -> ,123
    reverseStr = reverseStr.replace(/\,$/,'');
    // 把加了逗号的字符串反转回正常的顺序
    reverseStr = reverseStr.split('').reverse().join('');
    return reverseStr;
}
```
## (123456.123).toLocaleString('en-US')  ie11以上支持
[mdn参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#)

# '123add12da1' 截取数字

'123add12da1'.split(/[^\d]/).join('') // 转换成字符串
'123add12da1'.match(/\d/g) // 转换成数组

# 判断对象的类型

```
const isType =  type => target => `[object ${type}]` === Object.prototype.toString.call(target)
```

Object.prototype.toString 使用了闭包 一个函数
注意：type 类型首字母大写

# 打包时候的注意事项

css 引入顺序，如果引入了类库和自定义样式，应最后引入自定义样式，否则会被类库样式覆盖。

图片路径修改，

# vue-router 钩子使用情况

# rem

rem 相对  html 根元素
css3 新增的一个相对单位

# border 简写


# textarea 相关属性

腾讯面试题目


