---
title: 算法题目
abbrlink: 36608
date: 2019-04-23 18:30:39
tags: leetcode
categories: leetcode
---

# 时间复杂度

# 给定两个数组，写一个方法来计算它们的交集。

<!-- more -->

给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
```
let intersection = (...arg) => arg[0].filter(v => arg[1].includes(v));
// 但是[1,2,2,1] [2] 返回 [2,2]
```

>这道题两种思路，空间换时间，或者不用额外空间就提升时间复杂度。

>空间换时间的思路是用个 Hash 表来存数组1的元素以及出现的个数（此处需要遍历n次，并存一个n级别的空间）。
>遍历数组2，发现数组2里有 Hash 表里的值就存到Result数组里，并把 Hash 表内该值次数减一（为0之后就Delete）。如果不存在 Hash 表里，就跳过。这样时间复杂度就是 (m+n)

>不用额外空间，就用遍历n的时候，判断值在不在m里，如果在，把m里的该值 push 到 Result 数组里，并将该值从m数组里删掉（用 splice ）。这样就是不用额外空间，但是提高了时间复杂度。

最终实现
时间
```
const intersect = (nums1, nums2) => {
  const map = {}
  const res = []
  for (let n of nums1) {
    if (map[n]) {
      map[n]++
    } else {
      map[n] = 1
    }
  }
  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n)
      map[n]--
    }
  }
  return res
}
```

# 给定一个数组，去重

## 可以新建数组
```
const arr = [1,2,3,4,5,1,2,3];
const arr1 = [];
for(let item of arr){
  // includes indexOf
  if(!arr1.includes(item)){
    arr1.push(item);
  }
}
```
## 不可新建数组

# 最长重复的字符 可以有多个

## 最长重复字符

str = 'abwwwcwwwwwwbwwwwccccc'; 输出 w

```
function myFn(str){
  const arr = str.split('');
  let tempObj = {};
  let finObj = {};
  for(let i=1; i<arr.length; i++){
    if(arr[i]===arr[i-1]){// 重复
      if(!tempObj[arr[i]]){ // 不存在
        tempObj[arr[i]] = 2
      }else{// 存在
        tempObj[arr[i]]++
      }
    } else { // 重复断裂
       if(!finObj[arr[i-1]]){ //
         finObj[arr[i-1]] = 1
       }
       if(tempObj[arr[i-1]]>finObj[arr[i-1]]){ //存在
        finObj[arr[i-1]] = tempObj[arr[i-1]]
       } 
       tempObj[arr[i-1]] = 1
    }
  }
  let max = 0;
  let maxKey = '';
  for (let key in finObj) {
    if (finObj[key] > max) {
      max = finObj[key]
      maxKey = key
    }
  }
  return maxKey
}
```