## Features
* 接口文档集中化
* 解决param路径痛点
## introduction
通过api管理文件和HTTP 库的实例（例如axios、fly.io）进行二度封装，实现集中管理api文档
```
// api管理文件的key只要匹配到其中的methods方法名(不区分大小写)就会生成对应的以key为名的方法
const server = {
  // 公共
  postFile: 'wap/file', // * 上传图片
  deleteFile: 'wap/files/:imgId', // * 删除图片
}
let http = new BoxCat(fiy, server)
// 方法返回的是fiy
http.postFile({id: 1})
/*
* 如果是param，第一个路径是params，第二个是data，第3个是其他配置项。非param则第一个是data，第二个是其他配置项
* 当你有多段param的时候，传的是对象
*/ 
http.deleteFile(1).then().catch()
await http.deleteFile({
  imgId: 1
})
```
## Options
```
new BoxCat(host, server, {
  methods: {
    'get': ['get'],
    'post': ['post'],
    'put': ['put'],
    'delete': ['delete'],
    'options': ['options'],
    'head': ['head'],
    'trace': ['trace'],
    'connect': ['connect']
  },
  RegExp: /:[^/]+/g
  mergeMethods: {},
  config: {}
})
```
### host
HTTP 库的实例(axios,fly.io之类)
### server
api的管理文件，key不区分大小写
### options
##### methods
自定义methods
例如：'post': ['ADD', 'post', 'submit']
##### mergeMethods
合并methods
#### config
其他配置
#### RegExp
params的正则
默认 /:[^/]+/g
