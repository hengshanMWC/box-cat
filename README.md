## Features
* 自动生成http函数
* 接口集中化维护
* 解决param路径痛点
## introduction
通过接口对象和HTTP请求库（例如axios、fly.js）进行二度封装，实现api集中管理
```
// a.js
import { createApi, createApiProxy } from 'box-cat'
// server其中的key只要匹配到其中的method(不区分大小写)就会生成对应的以key为名的方法
const server = {
  // 方法名: 接口
  postFile: 'wap/file',
  deleteFile: 'wap/files/:imgId',
  getUserUpFile: 'wap/file/:userId/:imgId
}
export default createApi(server, axios)
// createApiProxy返回一个proxy
// export default createApiProxy(server, axios)
```
```
// a1.js
import http from './a.js'
// 方法使用和对应的HTTP请求库一样
http.postFile({id: 1}).then().catch()
/*
* 如果路径带的有param，第一个参数是params，第二个是data，第3个是http请求库的其他配置项。非param则第一个是data，第二个是其他配置项
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
```
// createApi和createApiProxy默认参数配置
createApi(server, engine, {
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
### engine
HTTP 请求库(axios,fly.io之类)
### options
##### methods
自定义methods
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
