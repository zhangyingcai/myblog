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