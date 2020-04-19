import { ObjectString, ObjectStrings, Engine, Options } from './interface'
import { getFormat, getESC, getRegFinish, createSliceRegExp, createParamsRegExp } from './regExp'
export class BoxCat {
  server: ObjectString
  engine: object
  options: Options
  sliceRegExp: RegExp
  paramsRegExp: RegExp
  constructor (server: ObjectString, engine: Engine , options: Options = {}) {
    this.server = server
    this.engine = engine
    this.defaults(options)
    this.apiFor()
  }
  private createRegExp (str: string) {
    const arr: string[] = getFormat(str)
    arr[0] = getESC(arr[0])
    this.paramsRegExp = createParamsRegExp(arr[0], arr[1])
    arr[1] = getRegFinish(arr[1])
    this.sliceRegExp = createSliceRegExp(arr[0], arr[1])
  }
  private defaults (options: Options) {
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
      rule: ':param',
      methodsRule: 'startsWith'
    }
    if (options.mergeMethods) {
      const mergeMethods: ObjectStrings = options.mergeMethods
      delete options.mergeMethods
      Object.assign(defaultOptions.methods, mergeMethods)
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.createRegExp(this.options.rule)
  }
  private apiFor () {
    Object.keys(this.server).forEach(this.createIng)
  }
  private createIng (key: string) {
    const method: string = this.getMethod(key)
    if (method && this.engine[method]) {
      const fn: Function = this.newFunction(method, this.server[key])
      this[key] = fn
    } else if (this.engine[method]) {
      console.warn(`BoxCat:engine没有${method}方法`)
    } else {
      console.warn(`BoxCat:没有匹配到${key}所需的请求方式`)
    }
  }
  private getMethod (name: string): string {
    const methods: ObjectStrings = this.options.methods
    return Object.keys(this.options.methods)
            .find(key => methods[key].find(val => name.toLocaleLowerCase()[this.options.methodsRule](val.toLocaleLowerCase())))
  }
  private newFunction (method: string, url: string): Function {
    const urls: string[] = url.split(this.sliceRegExp)
    const params: string[] = url.match(this.sliceRegExp).map(param => param.replace(this.paramsRegExp, '$1'))
    return (id: number | string | object, data?: object, config?: object): Function => {
      return this.engine[method](...this.getParam(urls, params, id, data, config))
    }
  }
  // 解析params路径
  private getParam (urls: string[], params: string[], id: number | string | object, data?: object, config?: object): [string, number | string | object, object] {
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
          str = key
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
