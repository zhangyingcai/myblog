---
title: leetcode
tags: leetcode
abbrlink: 374e
---

leetcode

数组中寻找两数的之和

<!-- more -->

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

方法1：循环 复杂度 n^2

```
var nums = [2, 7, 11, 15],target = 9;
function twoSum(target){
  for (var i = 0; i<nums.length-1; i++){
    for(var j = 1; j<nums.length; j++){
      if(nums[i]+nums[j] == target) return [i,j];
    }
  }
}
twoSum(target);
```

方法2: map 复杂度 n

因为要返回下标，可以通过 map 将值和键对换

```
var nums = [2, 7, 11, 15],target = 9;
function twoSum(target){
  var map = new Map();
  for (var i = 0; i<nums.length; i++){
    map.set(nums[i], i);
  }
  for(var j = 1; j<nums.length; j++){
    var sum = target - nums[j];
    if(map.has(sum)) return [map.get(sum),j];
  }
}
twoSum(target);
```