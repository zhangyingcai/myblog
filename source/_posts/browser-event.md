---
title: 浏览器的事件注册机制
date: 2018-12-20 17:56:08
tags: browser event
categories: 浏览器
---

记录学习浏览器的事件机制

<!-- more -->

# 事件触发的三个阶段

* window向事件触发处传播，遇到注册的捕获事件会触发
* 传播到事件触发处触发注册的事件
* 从事件触发处向window传播，遇到注册的冒泡事件会触发

>事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。

```
// 以下会先打印冒泡然后是捕获
node.addEventListener('click',(event) =>{
    console.log('冒泡')
},false);
node.addEventListener('click',(event) =>{
    console.log('捕获 ')
},true)
```

那么我们怎么区分注册的事件是冒泡事件还是捕获事件？

我们通常使用addEventListener注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 useCapture 参数来说，该参数默认值为 false 。useCapture 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性

* capture，布尔值，和 useCapture 作用一样
* once，布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听
* passive，布尔值，表示永远不会调用 preventDefault

>一般来说，我们只希望事件只触发在目标上，这时候可以使用 stopPropagation 来阻止事件的进一步传播。通常我们认为 stopPropagation 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。stopImmediatePropagation 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

```
node.addEventListener('click',(event) =>{
    event.stopImmediatePropagation()
    console.log('冒泡')
},false);
// 点击 node 只会执行上面的函数，该函数不会执行
node.addEventListener('click',(event) => {
    console.log('捕获 ')
},true)
```

stopPropagation只能阻止事件的进一步传播，默认注册的事件还是会执行。
和他相反的是preventDefault方法，用于阻止默认事件的执行，但是会发送事件的进一步传播，通常是对注册事件重新定义时使用。
return false;就等于同时调用了event.stopPropagation()和event.preventDefault()，即会阻止事件冒泡也会阻止默认事件。

# 事件代理

如果一个节点中的子节点是动态生成的话，那么子节点的事件应该注册在符节点上

优点： // 为什么这么做
节省内存提高性能
不需要给子节点注册事件和注销事件

# 跨域

跨域是浏览器自我保护的一个机制：同源策略。提高安全性，用于防止CSRF攻击。CSRF简单讲就是获取用户的登录状态，通过登录状态获取用户信息或者修改信息。

解决方法：
* JSONP 利用<scrtipt>标签没有跨域限制，通过src属性指向一个地址并提供回调函数来接收数据。
缺点： 仅适用于get请求
* CORS 服务端设置`Access-Control-Allow-Origin`。该属性表示哪些域名可以访问资源，如果设置通配符则表示所有资源都可以访问资源。

`document.domain`可以设置一级域名，表示该泛域名下的二级域名都可以访问

* postMessage 用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息。 (ToDo理解)
```
// 发送消息端
window.parent.postMessage('message', 'http://test.com')
// 接收消息端
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```

# localStorage (ToDo实现失效日期)
传入一个字符串，将对象转换成json
```
class Storage{
        constructor(name){
            this.name = 'storage';
        }
        //设置缓存
        setItem(params){
            let obj = {
                name:'',
                value:'',
                expires:"",
                startTime:new Date().getTime()//记录何时将值存入缓存，毫秒级
            }
            let options = {};
            //将obj和传进来的params合并
            Object.assign(options,obj,params);
            if(options.expires){
            //如果options.expires设置了的话
            //以options.name为key，options为值放进去
                localStorage.setItem(options.name,JSON.stringify(options));
            }else{
            //如果options.expires没有设置，就判断一下value的类型
               	let type = Object.prototype.toString.call(options.value);
               	//如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
                if(Object.prototype.toString.call(options.value) == '[object Object]'){
                    options.value = JSON.stringify(options.value);
                }
                if(Object.prototype.toString.call(options.value) == '[object Array]'){
                    options.value = JSON.stringify(options.value);
                }
                localStorage.setItem(options.name,options.value);
            }
        }
        //拿到缓存
        getItem(name){
            let item = localStorage.getItem(name);
            //先将拿到的试着进行json转为对象的形式
            try{
                item = JSON.parse(item);
            }catch(error){
            //如果不行就不是json的字符串，就直接返回
                item = item;
            }
            //如果有startTime的值，说明设置了失效时间
            if(item.startTime){
                let date = new Date().getTime();
                //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
                if(date - item.startTime > item.expires){
                //缓存过期，清除缓存，返回false
                    localStorage.removeItem(name);
                    return false;
                }else{
                //缓存未过期，返回值
                    return item.value;
                }
            }else{
            //如果没有设置失效时间，直接返回值
                return item;
            }
        }
        //移出缓存
        removeItem(name){
            localStorage.removeItem(name);
        }
        //移出全部缓存
        clear(){
            localStorage.clear();
        }
    }
```