---
title: Array 对象的方法
abbrlink: 18472
date: 2019-05-13 17:59:00
tags: Array
categories: JavaScript进阶系列
---
Array 对象的方法

<!-- more -->

# Array.prototype​.splice() 删除或者替换现有元素 

**修改了数组**
**3**

array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

* start 起始位置，如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从 -1 计数，这意味着 -n 是倒数第 n 个元素并且等价于 array.length-n ）；如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。
* deleteCount 要删除的元素的个数
* item1, item2 要添加进数组的元素

return 返回由删除的元素组成的一个数组。

这样原数组就会被改变为我们想要的结构。

注意：直接操作原数组

# Array.prototype​.concat() 合并数组

**没有修改数组**
**返回一个新的数组**

var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

* 将多个数组合并成一个数组

return 合并的数组。

# Array.prototype​.includes() 用来判断一个数组是否包含一个指定的值

用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。

arr.prototype​.includes(valueToFind[, fromIndex])

* valueToFind 需要查找的元素
* fromIndex 从 fromIndex 索引处开始查找 valueToFind 。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

注意：对象数组不能使用includes方法来检测。

实现数组去重

```
const arr = [1,2,4,5,1,2,3];
function myFn(arr){
  if (!Array.isArray(arr)) return false;
  const myarr = [];
  for( let a of arr){
    if (!Array.prototype.includes.call(myarr,a)) {
      myarr.push(a);
    }
  }
  return myarr;
}
function myFn1(arr){
  if (!Array.isArray(arr)) return false;
  const myarr = [];
  for( let a of arr){
    if (Array.prototype.indexOf.call(myarr,a) === -1) {
      myarr.push(a);
    }
  }
  return myarr;
}
let arr1 = new Set(arr);
// 利用过滤器实现数组去重
let arr2 = arr.filter((item,index)=>arr.indexOf(item) === index)
// 合并两个数组并去重
function distinct(a, b) {
    let arr = a.concat(b);
    return arr.filter((item, index)=> {
        return arr.indexOf(item) === index
    })
}
```

# Array​.prototype​.sort() 对数组进行排序

**修改了数组**
**返回被修改的数组**

方法用原地算法对数组的元素进行排序，并返回数组。排序算法现在是稳定的。默认排序顺序是根据字符串Unicode码点。

return 排序后的数组。请注意，数组已原地排序，并且不进行复制。

有些场景下需要对数组进行复制后进行排序

arr.sort([compareFunction])

* compareFunction 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。

* firstEl 第一个用于比较的元素。
* secondEl 第二个用于比较的元素。

如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；

如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。

compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

# Array​.prototype​.slice() 浅拷贝数组

* 方法返回一个新的数组对象，这一对象是一个由 begin 和 end（不包括 end ）决定的原数组的浅拷贝。原始数组不会被改变。

* 如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
* 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

# Array​.prototype​.map() 生产新的数组

创建一个新的数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

语法
```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```
* currentValue
* index
* array
* thisArg

用法

map 不会改变原数组，会返回一个新的数组，当你不打算使用返回的新数组的时候，应该使用 foreach 或者 for of 替代。
不应该适用 map 的情况： 不打算使用返回的新数组；callback 没有 return 值。
map 不修改调用它的 原数组 本身，但是可以在 callback 执行时改变原数组。



ToDo
## map 实现

# Array.isArray 判断是否是 Array 引用类型类型

注意：是 Array 对象实现的方法，不在原型链上。

当检测 Array 实例时,  Array.isArray 优于 instanceof ,因为 Array.isArray 能检测 iframes .

示例：
```
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

isArray 实现

通过调用 Object toString 方法转换成字符串，判断是否恒等于 '[object Array]'。

```
Array.isArray = function(value){
  retrun Object.prototype.toString.call(value) === '[object Array]';
}
```

# Array.from() 

返回一个新数组

creates a new , shallow-copied Array instance from an array-like or iterable object

## Array.from(arrayLike[, mapFn[, thisArg]])
## arrayLike 产生数组的来源 

类似数组的对象和可遍历的对象（部署了Iterator接口的，String，ES6新增的Map和Set）

## mapFn 数组的每个函数都会调用，返回的结果将组成新数组
## thisArg  mapFn 需要的参数
```
console.log(Array.from('12')) // ["1", "2"]
console.log(Array.from([1, 2, 3], x => x + x)); // [2, 4, 6]
// map 与 array 相互转换
const arr = [[1,2],[2,1]];
const myMap = new Map(arr);
console.log(Array.from(myMap))
```
[Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

## 将集合转换成数组的方法？

Array.from

slice()

展开运算符 把A集合的元素展开后，用数组[]承载，返回新的数组

```js
[].map.call(obj,)
```
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
map() 方法按照原始数组元素顺序依次处理元素。
注意： map() 不会对空数组进行检测。
注意： map() 不会改变原始数组。
所以map方法返回了一个新的数组，并且数组中每个元素是A里面的元素

# Array.prototype.indexOf() 

在数组找到给定元素的第一个索引（和 String.prototype.indexOf()相同），如果不存在，返回 -1。

## 语法

arr.indexOf(searchElement[, fromIndex = 0])

### searchElement 要查找的元素
### fromIndex 开始查找的位置

大于 0 的数: 在 0 - length-1 范围内正常查找
负数: -n 表示在倒数 第 n 个元素开始查找 n > length 时从 0 开始查找


# Array.prototype.filter()

>var newArray = arr.filter(callback(element[, index[, array]]))[, thisArg]

return 返回测试通过的元素组成的新数组。不会改变旧数组。

element 数组中当前正在处理中的元素。

index 正在处理的元素在数组中的索引

thisArg 执行 callback 时， 用于 this 的值。

## 筛选 age 大于 30 的人

```
const people = [
  {name : 'ziksang1',age:21},
  {name : 'ziksang2',age:10},
  {name : 'ziksang3',age:30},
  {name : 'ziksang4',age:40},
  {name : 'ziksang5',age:50},
  {name : 'ziksang6',age:30},
  {name : 'ziksang7',age:80}
];

const mypeople = people.filter((element)=>{ return element.age > 30 })

```

## filter 实现 交集



## filter 实现 ToDo

```
if (!Array.prototype.`filter`) {
  // func: callback 
  // thisArg: this
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
  }
}
```

# Array.prototype.reduce

执行一个函数将结果汇总为单个返回值。

>arr.reduce(callback(accumulator, currentValue[, currentIndex[, array]])[, initialValue])

* **callback** 操作数组中每个值的函数 有四个参数
* **accumulator** 累计函数上次返回值，第一次是初始值initialValue
* **currentValue** 数组中正在处理的元素
* **currentIndex** 数组中正在处理的元素的索引
* **initialValue** 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

主要使用场景

数组求和，对象属性求和
二维数组转换为一维数组
```js
[[0,1],[2,3],[4,5]].reduce((accumulator, currentValue)=> accumulator.concat(currentValue), [])
```
计算数组中每个元素出现的次数
```
['w','w','w','a','b'].reduce((accumulator, currentValue)=> {
  if (currentValue in accumulator){
    accumulator[currentValue]++
  }else{
    accumulator[currentValue] = 1
  }
  return accumulator
}, {})
```
数组去重
```
['w','w','w','a','b'].reduce((accumulator, currentValue)=> {
  if (!accumulator.includes(currentValue)){
    accumulator.push[currentValue]
  }
  return accumulator
}, [])
```
# Array.prototype.forEach()

> arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);

数组的每个元素都会执行这个函数

# Array.prototype.findIndex()

returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.

# for of 用法

for of 和 for each 的区别