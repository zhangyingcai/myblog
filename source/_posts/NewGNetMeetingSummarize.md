---
title: 新云会议项目总结
date: 2019-11-25 10:46:04
tags: 项目
keywords:
description:
---

项目总结

<!-- more -->

# 问题列表

## 1

需求分析。
要求最近的一场会议展示入会按钮。

1.当前时间之后最近的一场会议
2.时间是一直更新的需要动态刷新，比较规则。安排会议展示时间最小单位是分钟，以分钟为最小单位进行比较，限定当前时间的最小分钟为截取时间进行比对。以计时任务为时钟。
3.可以入会的展示入会按钮。

## 2 

需求分析：
文件更新小插件：批量上传，save change -》 update

fs.readdir 异步读取文件夹
fs.lstat 获取文件对象
fs.readFile 异步读取文件内容

```js
const fs = require("fs");
const axios  = require('axios')
 
const basePath = "./";
const dirs = []

const En = 'En' // En-us
const Zh = 'Zh' // Zh-cn

const templateData = {
    android_cannot_arrange_meeting: {
        contentType: 'location_common'
    }
}
const defaultContentType = 'location_common'
const encoding = 'utf-8'
//
fs.readdir(basePath, async function(err, files){
    if(err) {
        console.log(err);
        return
    }
    for(const item of files) {
        const path = `${basePath}${item}`

        const stat = fs.lstatSync(path)
        if (stat.isFile() && /\w(\.html)/.test(item)) {
            const array = item.split('.')
            const typeArray = array[0].split('-')

            const {url, defaultData} = defaultHttpOptions
            let {templateId, lang} = defaultData

            templateId = typeArray[2]
            lang = `${typeArray[3]}-${typeArray[4]}`

            const options = {
                url,
                data: {
                    ...defaultData,
                    templateId,
                    lang
                }
            }
            readFileAndUpdate(path, options)
            fs.watchFile(path, ()=>{
                console.log(`${path} change`)
                readFileAndUpdate(path, options)
            })
        }
    }
})


const defaultHttpOptions = {
    url: 'url',
    defaultData: {
        templateId: '',
        lang: 'Zh-cn',
        contentType: defaultContentType,
        content: ''
    }
}
const post = (options) => {
    const {url, data} = options
    const {templateId, lang, contentType, content} = data

    if (!url, !templateId || !lang || !contentType || !content) {
        throw `url: ${url} data: ${data} 参数有误！`
    }

    axios.post(url, data)
    .then((res)=>{
        const {data} = res
        if (data.code === 200) {
            console.log(`${templateId} ${lang} 成功`)
        } else {
            console.log(`${templateId} ${lang} 失败`, data)
        }
    })
    .catch((err) => {
        console.log(`${templateId} ${lang} 失败`, err.data)
    })
}

// TODO save change and update

const readFileAndUpdate = (path, options)=>{
    fs.readFile(path, encoding, (err, filedata)=>{
        if(err) {
            console.log(err);
            return
        }
        if(!filedata) {
            console.log(`${path} is empty`)
            return
        }
        options.data.content = filedata || ''
        post(options)
    })
}
```

## 3

死循环

iframe 中 的 parent window 是当前最高级的窗口如果已经是最高级的窗口，则指代自己。

iframe 定义了 postMessage 方法，覆盖了 window 的方法。

## 4

css calc 动态计算

```css
.main-video-body {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    min-width: 746px;
    width: calc((100% - 720px) / 3 + 720px);
}
```
## 5

jquery.closest(selector) 实现

```js
closest(el, selector) {
    if(!el || !selector) {
        return undefined
    }
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}
```

react 中如何获取列表 dom 元素

问题是 antd Dropdown 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 

方法一

getPopupContainer={triggerNode => triggerNode.parentNode}

容易引起定位的问题

方法二

jquery.closest  放到没有问题的父元素中,可以通过 jquery.closest 


# redux 的使用方法

# css 滚动条占用内容宽度引起的内容布局改变

解决方案：

添加一个父容器来包装要展示的内容，这样滚动条占用的是**最外层的宽度**。

```css
.ant-modal-content{ // 最外层
  width: 500px;
}
.ant-modal-body { // 父容器
  padding: 10px;
  height: 190px;
  overflow-x: hidden;
  overflow-y: auto;
}
.container { // 内容
  display: flex;
  flex-wrap: wrap;
  width: 517px;
}
```
