---
title: web总结
date: 2019-03-07 19:21:49
tags: 面试题
categories: 面试题
---

面试题总结

<!-- more -->

# CSS
# css实现图片自适应宽高？
自适应宽和高
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

