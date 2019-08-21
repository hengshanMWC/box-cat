## Features
* api配置文件转化为方法
* 解决param路径痛点
## Introduce
对暴露get,post之类接口的实例（例如axios、fly.io）二度封装
```
// 默认提供了
let defaultOptions = {
  methods: {
    'get': ['get'],
    'post': ['post'],
    'put': ['put'],
    'delete': ['delete'],
    'options': ['options'],
    'head': ['head'],
    'trace': ['trace'],
    'connect': ['connect']
  }
}
// api配置文件的key只要匹配到其中的methods方法名(不区分大小写)就会生成对应的以key为名的方法
const server = {
  // 公共
  postFile: 'wap/file', // * 上传图片
  deleteFile: 'wap/files/:id', // * 删除图片
}
let http = new Film(fiy, server)
// 方法返回的是fiy
http.postFile({id: 1})
/*
* 如果是param，第一个路径是params，第二个是data，第3个是其他配置项。非param则第一个是data，第二个是其他配置项
* 当你有多段param的时候，传的是数组
*/ 
http.deleteFile(1).then().catch()
await http.deleteFile([1])
```
## Option
```
new Film(host, server, {
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
  mergeMethods: {},
  config: {}
})
```
### host
暴露get，post之类的实例
### server
api的配置文件，key不区分大小写
### options
##### methods
自定义methods
例如：'post': ['ADD', 'post', 'submit']
##### mergeMethods
合并methods
#### config
其他配置
