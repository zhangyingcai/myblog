---
title: jquery中$的实现方式
date: 2018-12-10 17:12:08
tags:  jQuery
categories: jQuery
---

# 实现方式(网上找的)

```

<script>
　　(function(w){
        //工厂
        function jQuery(selector, context){
            return new jQuery.fn.init(selector, context);
        }
        //给原型提供一个简写方式
        jQuery.fn = jQuery.prototype = {

        };
        //init才是jQuery中真正的构造函数
        var init = jQuery.fn.init = function(selector, context){
            // 构造函数
        };
        //把构造函数的原型，替换为jQuery工厂的原型
        //这么做的目的是为了实现jQuery的插件机制，让外界可以通过jQuery方便的进行扩展
        init.prototype = jQuery.fn;
        w.jQuery = w.$ = jQuery;
    }(window));
</script>
```

<!-- more -->
[原链接](http://www.cnblogs.com/ldq678/p/9666914.html)

```
(function(w){
    // dosomthing
    w.jQuery = w.$ = jQuery;
  })(window)
```

目的：通过全局对象window可以调用对象jQuery或者$

然后我们声明一个对象jQuery
```
  (function(w){
    function jQuery(selector, context){}
    w.jQuery = w.$ = jQuery;
  })(window)
```
效果:
![效果](/images/微信截图_20181210172609.png)


大功告成！但是jQuery显然是更深一层次的做法。示例方式是将原型转换为简化方法fn。然后在jQuery原型上添加一个init方法。

# 工厂模式

什么是工厂模式？怎么在javascript使用？

工厂模式是用来创建对象的一种最常见的设计模式。我们不暴露创建对象的具体逻辑，而是将逻辑封装到一个函数中，如示例中的jQuery函数，那么这个函数就可以被视为一个工厂。

工厂模式根据抽象程度的不同可以分为：简单工厂，工厂方法和抽象工厂。

[工厂模式](https://www.jianshu.com/p/11918dd0f694)

# toggle 切换显示/隐藏

[mdn类似的例子](https://developer.mozilla.org/zh-CN/docs/Web/Events/toggle)