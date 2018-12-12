---
title: js中一般怎么实现继承
date: 2018-12-10 19:05:59
tags: js
---

学习一下js的继承实现。
<!-- more -->

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

[效果](/images/微信截图_20181211092617.png)

##特点

1. 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
2. 父类新增原型方法/原型属性，子类都能访问到
3. 简单，易于实现

##缺点：

1. 可以在子类构造函数中，为子类实例增加实例属性。如果要新增原型属性和方法，则必须放在new Animal()这样的语句之后执行
2. 无法实现多继承
3. 来自原型对象的引用属性是所有实例共享的
4. 创建子类实例时，无法向父类构造函数传参

TODO：写这个的时候还是有点蒙。