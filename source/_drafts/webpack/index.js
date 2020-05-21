// webpack 热更新原理？
// 现象：不刷新浏览器而将新变更的模块替换旧的模块

// 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。
// 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。
// 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。
// 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
// webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。
// HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
// 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
// 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

// 如何利用webpack 优化前端性能
// 1. 代码压缩  删除多余的代码、注释、简化代码的写法等等方式


// 提高构建速度

// 多入口的情况下 使用CommonsChunkPlugin来提取公共代码
// 通过externals配置来提取常用库
// 利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
// 使用Happypack 实现多线程加速编译

// webpack 打包过程
// 1.读取配置和shell获取并合并参数
// 2.使用获取的参数初始化complier对象，加载所有配置的插件，并执行complier的run方法
// 3.读取配置中的entry获取所有的入口文件
// 4.根据入口文件，调用配置的loader，对模块进行编译，找到模块的依赖，递归本步骤直到所有的入口依赖的文件都经过了编译的处理
// 5.得到每个模块被编译后的最终内容和他们之间的依赖关系。
// 6.根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk,在把每个chunk转换成一个单独的文件加入到输出列表
// 7.确定好输出内容，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

// webpack gulp 的不同
// gulp 是将前端构建过程拆分成多个 task,然后合理的控制 task 的调用关系。
// webpack 需要找到入口，并清楚不同资源应该使用什么loader做何种解析和加工。