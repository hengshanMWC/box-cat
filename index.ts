import { Methods, Options } from './interface'
import { getFormat, getESC, getRegFinish, createRegExp } from './regExp'
export class BoxCat {
  /**
   * constructor
   * @param {object} server 接口
   * @param {object} fetch http请求库实例
   * @param {object} options 其他参数
   * @param {Object} [options->methods = 常用的methods]
   * @param {Object} options->mergeMethods 合并methods
   * @param {Object} options->config 默认的请求配置
   */
  server: object
  fetch: object
  options: Options
  regExp: RegExp
  constructor (server: object, fetch: object , options: Options = {}) {
    this.server = server
    this.fetch = fetch
    this.defaults(options)
    this.apiFor()
  }
  private createRegExp (str): RegExp {
    const arr: string[] = getFormat(str)
    arr[0] = getESC(arr[0])
    arr[1] = getESC(arr[1])
    return createRegExp(arr[0], arr[1])
  }
  private defaults (options) {
    const defaultOptions: Options = {
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
      rule: ':key'
    }
    if (options.mergeMethods) {
      const mergeMethods: Methods = options.mergeMethods
      delete options.mergeMethods
      Object.assign(defaultOptions.methods, mergeMethods)
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.regExp = this.createRegExp(this.options.rule)
  }
  private apiFor () {
    Object.keys(this.server).forEach(key => {
      const method: string = this.getMethod(key)
      if (method) {
        const fn: Function = this.newFunction(method, this.server[key])
        this[key] = fn
      } else {
        console.warn(`film:没有匹配到${key}所需的请求方式`)
      }
    })
  }
  private getMethod (name: string) {
    const methods: Methods = this.options.methods
    return Object.keys(this.options.methods).find(key => methods[key].find(val => name.toLocaleLowerCase().includes(val.toLocaleLowerCase())))
  }
  private newFunction (method: string, url: string) {
    const urls: string[] = url.split(this.regExp)
    const params: string[] = url.match(this.regExp)
    return (id, data, config) => {
      return this.fetch[method](...this.getParam(urls, params, id, data, config))
    }
  }
  // 解析params路径
  private getParam (urls: string[], params: string[], id: number | string | object, data: object, config: object) {
    const _config: object = this.options.config
    if (urls.length === 1) {
      return [
        urls[0],
        id,
        Object.assign({}, _config, data)
      ]
    } else {
      let url: string
      if (typeof id === 'object') {
        const arr: string[] = []
        let i: number | string, str: string
        for (let key in id) {
          str = '/' + key
          i = params.findIndex(param => param === str)
          if (i !== -1) arr[i] = '/' + id[key]
        }
        url = arr.reduce((total, currentValue, index) => total + currentValue + urls[index + 1], urls[0])
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
