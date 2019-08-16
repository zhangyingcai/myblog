---
title: http
date: 2019-08-08 14:15:56
tags:
keywords:
description:
---
http学习

<!-- more -->

跨域之后，后端开启 cors 前端 get 请求变成 OPTIONS 请求

# OPTIONS

# get

# post

# get post 的区别

get post 是什么？

http 协议中的两种发送请求的方法。

使用上

get 参数包含在 URL 上，post 通过 request body 传递参数。

#通信类

## 同源策略和限制？

两个页面的协议，端口和主机都相同，则两个页面具有相同的源。
同源策略控制了不同源之间的交互。

Cookie、LocalStorage、indexDB无法读取

DOM 无法获得

AJAX 不能发送

## 前后端如何通信

1. AJAX (同源)
2. WebSocket (不限制)
3. CORS

## 创建 AJAX

XMLHttpRequest 对象的工作流程

// 浏览器特征检查
//规定请求类型 ulr 以及是否异步请求
>open(method,url,async)
// 发送请求 string 仅用于 POST 请求
>send(string)

>onreadystatechange
兼容性的处理

事件的触发条件

事件的触发顺序

# http 状态码

## 206 用与大文件的传输，每次传输的都是一部分

# 跨域

## cors

添加 origin 头的 Ajax
添加 origin 白名单

## jsonp

## 原理
## 实现
## 怎么实现

## hash
Hash 改变页面是不刷新的
## postmessage

html5 新增加

Web Worker 运行在后台的 JavaScript

## WebSocket


# 报文组成结构

## 请求报文

请求行 // 又叫首部 请求方法 ulr 协议版本
请求头 // 设置参数相关内容
空行
请求体

## 响应报文

相应行

## http


