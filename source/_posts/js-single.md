---
title: 使用js实现单例模式
tags: 单例
abbrlink: 186
date: 2018-12-14 19:20:39
---

先上代码：惰性单例的精髓！！！

```
//单例模式抽象，分离创建对象的函数和判断对象是否已经创建
// func 构造函数
// arguments 参数
var getSingle = function(func,arguments){
    var result;
    return function(arguments){
        return result || (result = func.apply(this, arguments));
    }
}
```
形参fn是我们的构造函数，我们只要传入任何自己需要的构造函数，就能生成一个新的惰性单例。
比如说传入创建一个女朋友的构造函数，并且调用getSingle(),就能生成一个新的女朋友。如果以后再调getSingle(),也只会返回刚才创建的那个女朋友。至于新女朋友——不存在的。