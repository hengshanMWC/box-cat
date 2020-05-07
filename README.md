## Features
* 接口文档集中化
* 解决param路径痛点
## introduction
通过api管理文件和HTTP 库的实例（例如axios、fly.js）进行二度封装，实现api文档集中管理
```
// api管理文件的key只要匹配到其中的methods方法名(不区分大小写)就会生成对应的以key为名的方法
const server = {
  // 公共
  postFile: 'wap/file', // * 上传图片
  deleteFile: 'wap/files/:imgId', // * 删除图片
}
let http = new BoxCat(server, axios)
// 方法返回的是promise(相当于axios())
http.postFile({id: 1})
/*
* 如果是param，第一个路径是params，第二个是data，第3个是http请求库的其他配置项。非param则第一个是data，第二个是其他配置项
* 当你有多段param的时候，传的是对象
*/ 
http.deleteFile(1).then().catch()
await http.deleteFile({
  imgId: 1
})
```
## Options
```
new BoxCat(server, engine, {
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
其他配置
