import { getFormat, getESC, getRegFinish, createSliceRegExp, createParamsRegExp } from './utils/regExp'
import createProxy from './utils/proxy'
interface ObjectString {
  [params: string]: string
}
interface ObjectStrings {
  readonly [params: string]: string[]
}
type MethodsRule =
  'startsWith' |
  'endsWith' |
  'includes'
interface Engine {
  get: Function,
  post: Function,
  put: Function,
  delete: Function,
  [params: string]: any,
}
interface Options {
  readonly methods?: ObjectStrings,
  mergeMethods?: ObjectStrings,
  config?: object,
  methodsRule?: MethodsRule,
  readonly rule?: string
}
export default class BoxCat {
  apis: ObjectString
  engine: Engine
  options: Options
  sliceRegExp: RegExp
  paramsRegExp: RegExp
  [params: string]: any
  constructor (apis: ObjectString, engine: Engine , options: Options = {}) {
    this.apis = apis
    this.engine = engine
    this.defaults(options)
    if (typeof Proxy === 'function') {
      return createProxy(this)
    } else {
      this.apiFor()
    }
  }
  protected createRegExp (str: string): void {
    const arr: string[] = getFormat(str)
    arr[0] = getESC(arr[0])
    this.paramsRegExp = createParamsRegExp(arr[0], arr[1])
    arr[1] = getRegFinish(arr[1])
    this.sliceRegExp = createSliceRegExp(arr[0], arr[1])
  }
  protected defaults (options: Options): void {
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
  protected apiFor (): void {
    Object.keys(this.apis).forEach(this.createIng.bind(this))
  }
  protected createIng (key: string): void {
    const method: string = this.getMethod(key)
    if (method && this.engine[method]) {
      const fn: Function = this.newFunction(method, this.apis[key])
      this[key] = fn
    } else if (this.engine[method]) {
      console.warn(`BoxCat:engine没有${method}方法`)
    } else {
      console.warn(`BoxCat:没有匹配到${key}所需的请求方式`)
    }
  }
  protected getMethod (name: string): string {
    const methods: ObjectStrings = this.options.methods
    return Object.keys(this.options.methods)
            .find(key => !!methods[key].find(val => name.toLocaleLowerCase()[this.options.methodsRule](val.toLocaleLowerCase())))
  }
  protected newFunction (method: string, url: string): Function {
    const urls: string[] = url.split(this.sliceRegExp)
    let params: string[] = []
    const urlMatch: string[] = url.match(this.sliceRegExp)
    if (urlMatch) {
      params = urlMatch.map(param => param.replace(this.paramsRegExp, '$1'))
    }
    return (id: number | string | object, data?: object, config?: object): Function => {
      return this.engine[method](...this.getParam(urls, params, id, data, config))
    }
  }
  // 解析params路径
  protected getParam (urls: string[], params: string[], id: number | string | object, data?: object, config?: object): [string, number | string | object, object] {
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
        let i: number | string
        for (let key in id) {
          i = params.findIndex(param => param === key)
          if (i !== -1) arr[i] = '/' + id[key]
        }
        url = arr.reduce((total, currentValue, index) => `${total}/${currentValue}${urls[index + 1]}`, urls[0])
      } else {
        url = `${urls[0]}/${id}${urls[1]}`
      }
      return [
        url,
        data,
        Object.assign({}, _config, config)
      ]
    }
  }
}
