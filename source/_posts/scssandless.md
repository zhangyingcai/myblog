---
title: scss and less
tags: scss lass
keywords: scss less
description: scss less
abbrlink: 4c58
date: 2019-06-28 11:08:59
---

scss and less

<!-- more -->

# scss

## 变量

使用 $ 来标识变量(老版 sass 使用 ！ 来标识变量)

### 变量声明

$basicbackground-color: red; // 统一背景颜色

使用
```
$background-color: red;
.myHeader{
  background-color: $background-color;
}
```

编译后

```
.myHeader{
  background-color: red;
}
```

### 变量作用域

```
$width: 50px;
nav {
  $width: 100px;
  width: $width
}
div {
  width: $width;
}

//编译后

nav {
  width: 100px;
}

div {
  width: 50px;
}
```

nav 中的 $width 只能应用在 nav {} 中

### 变量名

sass 的变量名可以与 css 中的属性名和选择器名称相同，包括中划线和下划线。

### 嵌套

父选择器的标识符&

```
.container{
  &-header{
    width:50px;
    p{
      color: red;
    }
    span{
      background-color: blue;
    }
  }
  &-footer{
    //
    width: 50px;
  }
  &::after{
    content:'*'
  }
  .other & {
    color: green;
  }
}

// 解析
.container-header {
  width: 50px;
}
.container-header p {
  color: red;
}
.container-header span {
  background-color: blue;
}
.container-footer {
  width: 50px;
}
.container::after {
  content: "*";
}
.other .container {
  color: green;
}
```

