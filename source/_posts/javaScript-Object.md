---
title: 每天一个知识点之Object
date: 2019-04-24 14:33:47
tags: Object
---

每天一个知识点之Object

<!-- more -->

## Object.assign(target, ...sources)

参数

target // 目标对象
sources // 源对象

返回值

目标对象 target

特性：
* 目标对象和源对象有相同的键，则属性被源对象覆盖。
* 只能拷贝只能拷贝源对象中可枚举的属性
* 该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。
* String类型和 Symbol 类型的属性都会被拷贝。
* 不会跳过那些值为 null 或 undefined 的源对象。

其他要点

* 继承的属性和不可枚举的属性不能拷贝

```
const obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});

const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }
```

* 拷贝数组

```
const foo = Object.assign({}, [1,2,3]) // {0: 1, 1: 2, 2: 3}
```

* 拷贝字符串

```
const foo = Object.assign({}, '123') // {0: 1, 1: 2, 2: 3}
```
* 原始类型会被包装，null 和 undefined 会被忽略。

```
const foo = Object.assign({}, null) // {}
const foo1 = Object.assign({}, undefined) // {}
const foo2 = Object.assign({}, {a:null}) // {a:null}
const foo3 = Object.assign({}, 10) // {}
const foo4 = Object.assign({}, true) // {}
const foo5 = Object.assign({}, Symbol('foo')) // {}
```

* 异常会打断后续拷贝
