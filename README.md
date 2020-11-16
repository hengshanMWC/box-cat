## Features
Api factory
## Scene
      请求数据这部分，贯穿着整个前端生涯，不知你又是怎样去管理这部分模块。接口一对一写成函数然后export出去？直接this.$fetch('userInfo/1')?前者冗余，后者碎片化不好维护。
      那些业务场景简单的还好，如果像后台管理那种，动不动上百个接口，如果不用一个足够简单的结构去维护这些接口，越到后期，成本越昂贵。
      所以，box-cat就是为了解决这个痛点而生，通过足够简单的结构object来维护接口，并自动生成接口函数
      
## Introduction
box-cat只是解决接口的集中管理。到最后调用的本体还是我们传的http请求库

通过接口对象和HTTP请求库（例如axios、fly.js）进行二度封装，实现api集中管理。
```js
// script引入
<script src="https://unpkg.com/box-cat/dist/boxCat.js"></script>
BoxCat.createProxy
```

```js
// a.js
import { createApis, createProxy } from 'box-cat'
// server其中的key只要匹配到其中的method(不区分大小写)就会生成对应的以key为名的接口函数
const server = {
  // 接口函数: 接口
  postFile: 'wap/file',
  deleteFile: 'wap/files/:imgId',
  getUserUpFile: 'wap/file/:userId/:imgId
}
export default createApis(server, axios)
// createApiProxy返回一个proxy
// export default createProxy(server, axios)
```
```js
// a1.js
import http from './a.js'
// 方法使用和对应的HTTP请求库一样
http.postFile({id: 1}).then().catch()
/*
* 如果路径带的有param，则第一个参数是params，http请求库的参数往后顺延
* 当你有多段param的时候，传的是对象
*/ 
await http.deleteFile(1)
await http.getUserUpFile({
  userId: 1,
  imgId: 10
})
```
## method
__createApi__：返回所有接口方法

__createApiProxy__：返回Proxy实例，惰性生成接口方法。当判断不支持proxy时，内部会优雅降级为createApi
## Options
```js
// createApi和createApiProxy默认参数配置
createApis(server, response, {
  methods: {
    'get': ['get'],
    'post': ['post'],
    'put': ['put'],
    'delete': ['delete'],
    'options': ['options'],
    'head': ['head'],
    'trace': ['trace'],
    'connect': ['connect'],
    'patch': ['patch']
  },
  mergeMethods: {},
  rule: ':param',
  methodsRule: 'startsWith'
  config: {}
})
```
### server
api的管理文件，key不区分大小写
### response
HTTP 请求库(axios,fly.io之类)
### options
##### methods
自定义methods,用于匹配接口函数名
例如：'post': ['ADD', 'post', 'submit']
##### mergeMethods
合并methods
##### rule
param的匹配规则
##### methodsRule
默认是：startsWith
匹配方法 'startsWith' | 'endsWith' | 'includes'
#### config
其他配置,相当于axios的config
