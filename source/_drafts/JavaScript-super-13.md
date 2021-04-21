---
title: '立即执行函数, 模块化, 命名空间'
abbrlink: 12446
date: 2019-05-20 10:32:47
tags:
---

# 模块化
## import

静态 import 语句

>目的 导入另一个模块导出的绑定

工程化术语：按需加载

无论是否声明 'strict mode', 导入的模块都运行在严格模式下、

注意：在浏览器下，只有声明 type = "module" 的 script 的标签可以使用 import , 在 script 标签中使用 nomodule 属性，可以确保向后兼容。


## 导入整个模块的内容

```
import * as React from 'react'
```

导入整个 React 模块，并且以 React 为命名空间

## 导入单个接口

```
import { input } from 'antd'
import { input as antdInput } from 'antd'
```

## 仅为副作用导入一个模块

```
import 'common.css'
```

不会导入模块的任何内容，但是会运行导入模块的 全局代码 

## 导入默认值

需要配合 export default 使用
并且只能通过 import name from 'name.js' 导入, 可以重命名

## 动态import

关键字import可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 promise。


import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });
这种使用方式也支持 await 关键字。

let module = await import('/modules/my-module.js');

## 跨模块常量

```
// test.js
export const a = 1

//b.js
import {a} from 'test.js'
```


## 其他

首先 import 执行的时候是在编译时执行， 所以 import, export 只能放到模块的顶层, 同时也导致无法在运行时加载模块

node  中 require 是运行时加载模块，并且是异步的

* 通配符 可用于表示任意的 导入模块