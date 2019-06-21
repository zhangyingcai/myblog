---
title: JavaScript进阶系列-web安全
tags: JavaScript
categories: JavaScript进阶系列
abbrlink: 64580
date: 2019-05-08 09:36:10
---

JavaScript进阶系列-web安全

<!-- more -->

# Cross-site scripting (XSS) 跨站脚本攻击

问题：什么是 XSS 攻击？ 如何防范 XSS 攻击？ 什么是 CSP ？

XSS 攻击就是攻击者想方设法的将可执行代码注入到网站中。可以放到网页，也可以通过网页放到数据库中，也可以在链接上做文章。攻击者通过执行恶意代码来获取用户信息。

容易发生 XSS 的应用场景：

* 数据从一个不可靠的链接进入 web 应用程序。
* 没有过滤到恶意代码的动态内容被发送给 web 用户。

最简单的就是在我们的输入表单进行注入代码。
```
http://www.xxx.com?name=<script>alert(1)</script> // url 注入
```
这就为啥提醒小白不要去点击一些恶意链接来访问网站，而是直接去访问官网。

XSS 攻击代码一般主要是 JavaScript ,有时候也会包括HTML, FLASH。

攻击目的：

* 获取隐私数据 cookie、session
* 将受害者重定向到一个由攻击者控制的网站（传说中的钓鱼网站）
* 在受害者的机器上进行一些恶意操作(例如用你的机器挖比特币或者成为肉鸡攻击别人的网站)

XSS 类型大致分为以下三种：存储型（永久型）、反射型（非持久性）、基于 DOM

**存储型XSS** 

注入型脚本永久存储在目标服务器上。当浏览器请求数据时，脚本从服务器上传回并执行。
这种情况造成损失非常严重，因为符合要求的访问都会受到攻击。

**反射型XSS**

当用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。Web服务器将注入脚本，比如一个错误信息，搜索结果等 返回到用户的浏览器上。浏览器会执行这段脚本，因为，它认为这个响应来自可信任的服务器。

**基于DOM的XSS**
被执行的恶意脚本会修改页面脚本结构。

XSS 通常使用两种方式进行防御

* 对于用户的输入永远不信任，转义输入输出的内容，对于引号、尖括号、斜杠进行转义
```
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```
对于需要输入代码的应用场景，比如富文本，就需要把正常的过滤，通常采用白名单的形式。

[js-xss仓库](https://github.com/leizongmin/js-xss)
```
var xss = require("xss");
var html = xss('<script>alert("xss");</script>');
console.log(html);
```

# Content-Security-Policy(CSP) 内容安全策略

CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是浏览器实现的。 CSP 是一个额外的安全层，用于检测并削弱某些类型特定的攻击，包括 XSS 和数据注入攻击。

开启 CSP

* 设置网络服务器返回 HTTP 头部 'Content-Security-Policy: (CSP策略指令)'
* meta 添加 '<meta http-equiv="Content-Security-Policy" content="">'

Content-Security-Policy设置

* 只允许加载本站资源
```
Content-Security-Policy: default-src 'self'
```
* 只允许加载 HTTPS 协议图片
```
Content-Security-Policy: img-src https://*
```
* 允许加载任何来源框架
```
Content-Security-Policy: child-src 'none'
```
[CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
[更多请查看相关文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)

总结

输入输出过滤，长度限制。

加载资源限制（http添加资源策略，添加白名单），cookie 操作限制，用户身份令牌+时间戳，https，参数加密解密

# CSRF

跨站请求伪造：诱导用户进入第三方网站，携带当前网站的登录凭证 cookie ，然后使用用户的身份信息进行请求的操作。
添加额外的用户凭证是为了放在

## 防御手段

### 添加验证码

一般在转账，交易，登录等操作使用

### 检查 Referer

> Referer 可以作为一种辅助手段，来判断请求的来源是否是安全的，但是鉴于 Referer 本身是可以被修改的，因为不能仅依赖于  Referer

### token 令牌

普通是 将令牌加密，用户请求携带，服务端校验

高级版要加上时间戳，每个请求的时间都是不一样的

# ddos 攻击

# js 接口调用安全

身份验证+时间戳
参数加密
https(http+ssl)

http 存在中间人攻击威胁，跳转过程可能被恶意网站利用来直接接触用户信息。