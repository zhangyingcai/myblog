---
title: TypeScript
date: 2019-10-09 19:57:31
tags:
keywords:
description:
---
## TypeScript 学习记录

[传送门--TypeScript 入门教程 (墙裂推荐)](https://ts.xcatliu.com/basics/primitive-data-types)
<!-- more -->

## 原始数据类型

JavaScript 原始数据类型： null undefined string number boolean symbol

### null 和 undefined

null 和 undefined 是所有类型的子类型
也就是说所有类型都兼容子类型，可以给它赋值 null 或者 undefined

### sting

```
let str: string = '123'
```

### number

```
let num: number = 123
```

### boolean

```
let isNum: boolean = false
```

注意：使用 Boolean() 创建的包装类型 不是 boolean 而是 boolean 对象

## 任意值 any

可以是任何值

## 类型推论

当变量没有指定类型时，TypeScript 会依照类推论的规则推断出一个类型。并且一个便利确定为一个类型时，无法赋值为另外一个类型。

## 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

在使用的过程中会依照类推论的规则推断出一个类型，并且一个便利确定为一个类型时，无法赋值为另外一个类型。

## 对象的类型

当我们想要定义一个对象的类型时可以使用 interface,在赋值的时候，变量的形状和接口的形状必须保持一致，未定义的属性始终无法被添加

```
interface Person {
    name: string;
    age: number;
    country?: string
}
```

### 可选属性

属性名称 ？ 为可选属性

### 任意属性

当我们希望一个接口允许有任意的属性

```
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male',
    a: '123'
};
```

使用 [propName: string] 定义了任意属性取 string 类型的值。同时不限制个数,但是不能喝已经定义的字段相同。 

### 只读属性

在 变量名称前添加 readonly

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：