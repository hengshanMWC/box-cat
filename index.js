export default class Film {
  /**
   * constructor
   * @param {object} host http请求库实例
   * @param {object} server 接口
   * @param {object} options 其他参数
   * @param {Object} [options->methods = 常用的methods]
   * @param {Object} options->mergeMethods 合并methods
   * @param {Object} options->config 默认的请求配置
   */
  constructor (host, server, options = {}) {
    this.host = host
    this.server = server
    this.defaults(options)
    this.apiFor()
  }
  defaults (options) {
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
    if (options.mergeMethods) {
      let mergeMethods = options.mergeMethods
      delete options.mergeMethods
      Object.assign(defaultOptions.methods, mergeMethods)
    }
    this.options = Object.assign({}, defaultOptions, options)
  }
  apiFor () {
    let _this = this
    Object.keys(_this.server).forEach(key => {
      let method = _this.getMethod(key)
      if (method) {
        let fn = _this.newFunction(method, _this.server[key])
        Object.defineProperty(_this, key, { value: fn })
      } else {
        console.warn(`film:没有匹配到${key}所需的请求方式`)
      }
    })
  }
  getMethod (name) {
    let methods = this.options.methods
    return Object.keys(this.options.methods).find(key => methods[key].find(val => name.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) !== -1))
  }
  newFunction (method, url) {
    let _this = this
    let urls = url.split(/:[^/]+/g)
    return (id, data, config) => {
      return _this.host[method](..._this.getParam(urls, id, data, config))
    }
  }
  // 解析params路径
  getParam (urls, id, data, config) {
    let _config = this.options.config
    if (urls.length === 1) {
      return [
        urls[0],
        id,
        Object.assign({}, _config, data)
      ]
    } else {
      let url
      if (Array.isArray(id)) {
        url = id.reduce((total, currentValue, index) => total + currentValue + urls[index + 1], urls[0])
      } else {
        url = urls[0] + id + urls[1]
      }
      return [
        url,
        data,
        Object.assign({}, _config, config)
      ]
    }
  }
}
