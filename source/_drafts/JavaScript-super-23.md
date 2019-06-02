---
title: 原型继承与原型链
abbrlink: 30931
date: 2019-05-20 10:35:50
tags: 原型链
categories: JavaScript进阶系列
---
JavaScript进阶系列-原型继承与原型链

<!-- more -->

# 原型继承

## 原型继承实现

```
function Animal(name){
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function(){
        console.log(this.name + " 正在睡觉。");
    }
}
    // 原型方法
Animal.prototype.eat = function(food){
    console.log(this.name + " 正在吃 "+food);
}

// 子类
function Tiger(){}
Tiger.prototype = new Animal();
Tiger.prototype.name = "Tiger";

var tiger = new Tiger();
console.log(tiger.name);
console.log(tiger.eat('sleep'));
console.log(tiger.sleep());
console.log(tiger instanceof Animal); //true 
console.log(tiger instanceof Tiger); //true
```

# 原型链

什么是原型链？
要理解原型链，需要从**函数对象**、**constructor**、new、Prototype、__proto__ 这五个概念入手。

## 什么是原型链

谈到继承的时候 JavaScript 只有一种结构：对象，每个对象都有一个 __proto__ 的属性指向他的构造函数的**原型对象**（是一个对象实例）。该原型对象也有自己的一个原型对象（__proto__ 指向）。

函数通过 prototype 属性查找

## 组合继承

```

function Animal(name){
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function(){
        console.log(this.name + " 正在睡觉。");
    }
}
    // 原型方法
Animal.prototype.eat = function(food){
    console.log(this.name + " 正在吃 "+food);
}

// 子类
function Tiger(value){
    Animal.call(this, value)
}
Tiger.prototype = new Animal();
Tiger.prototype.name = "Tiger";

var tiger = new Tiger();
console.log(tiger.name);

```

## class 关键字实现

```
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

## 函数对象

在 JavaScript 当值 函数即对象。（函数是一等公民）
可以把函数赋值给变量，可以作为参数传递给其他函数，添加属性和调用方法。
凡是由关键字 function 定义的函数都是函数对象，而且，只有函数对象拥有 prototype 属性。指向该函数的原型对象。

## constructor 构造函数

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    };
}
```

我们创建了一个自定义函数 Person() ,构造函数通常使用大写字母开头。

## new 

要创建 Person() 的新实例，必须使用 new 关键字。
new 调用构造函数实际上会经历以下四个步骤。

* 创建一个新对象
* 将构造函数的作用域赋值给新对象 （this 指向新的对象）
* 执行构造函数中的代码
* 返回新的对象

构造函数和其他普通函数没有什么区别，使用 new 操作符号都可以作为构造函数来调用。

注意：构造函数如果返回一个对象的话，会覆盖掉新建的对象。

###构造函数的问题

问题1：创建实例时构造函数每次都要执行

```
const Tom = new Person('Tom', 12, 'cxy');
const lucy = new Person('lucy', 14, 'dd');
Tom.sayName === lucy.sayName // false
```

这样每个实例都有一个独立的 sayName 方法。
通常的解决办法是把方法添加到原型链上。

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

Person.prototype.sayName = function (){
    console.log(this.name);
}
```

## prototype 原型

就像我们上面做的那样，使用原型的好处就是可以让所有的对象实例共享他所包含的属性和方法。