---
title: 每天一个知识点之Object
tags: Object
categories: Object
abbrlink: 51899
date: 2019-04-24 14:33:47
---

每天一个知识点之Object

<!-- more -->

## Object.prototype​.assign(target, ...sources)

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

```
const target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
}); // target 的 foo 属性是个只读属性。

Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
```

## Object.hasOwnProperty()

>hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是是否有指定的键

>所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。