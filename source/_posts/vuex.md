---
title: vuex
tags: vuex
abbrlink: 57376
date: 2019-03-27 17:10:42
---
vuex 记录
<!-- more -->

# vuex 是什么？

vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

全局单例管理组件共享的状态。

# state

单一状态树

用一个对象就包含了全部的应用层级状态。

每一个应用将仅仅包含一个store实例。

```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    }
});
```

## 在 vue 组件中获取 Vuex 状态

vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态

通过根实例注册 store 选项，该store实例会注入到跟组件下的所有子组件中，且子组件能通过 this.$store 访问到。

```
new Vue({
    el:'#app',
    store,
    computed: {
        count() {
            return store.state.count // this.$store.state.count
        }
    }
})
```

## mapState 辅助函数

当一个组件获取多个状态时候，每个都单独生成一个计算属性比较重复和冗余。
```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```
## 使用对象展开运算符
示例
```
    <div id="app">
        <p>{{ count }}</p>
        <p>{{ countAlias }}</p>
        <p>{{ countPlusLocalState }}</p>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.6/vue.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.0/vuex.min.js"></script>
    <script>
        
        const store = new Vuex.Store({
            state:{
                count:0
            }
        });
        new Vue({
            el: '#app',
            store,
            data() {
                return {
                    localCount: 3
                }
            },
            computed:{
                ...Vuex.mapState({
                    // 传字符串参数 'count' 等同于 `state => state.count`
                    count:'count',
                    // 箭头函数可使代码更简练
                    countAlias: state => state.count,
                    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
                    countPlusLocalState (state) {
                    return state.count + this.localCount
                    }
                })
            }
        })
    </script>
```

## getter 可以认为是 store 的计算属性

getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其第一个参数：
```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

### 通过属性访问

Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：

```
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```
Getter 也可以接受其他 getter 作为第二个参数：

```
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```
````
store.getters.doneTodosCount // -> 1
````
我们可以很容易地在任何组件中使用它：
```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```
注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

### 通过方法访问

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
```
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
```
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```
注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

### mapGetters 辅助函数

和 mapstate相同

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
```
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
如果你想将一个 getter 属性另取一个名字，使用对象形式：
```
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

# Mutation

更改 Vuex 中的 store 状态的唯一方法就是提交 mutation .
Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：