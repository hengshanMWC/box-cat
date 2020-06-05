export function getMethod (name: string, methodsRule: MethodsRule, methods: ObjectStrings): string {
  return Object.keys(methods)
          .find(key => !!methods[key].find(val => name.toLocaleLowerCase()[methodsRule](val.toLocaleLowerCase())))
}
export function isCreate (key: string, method: string, engine: Engine): boolean {
  if (method && engine[method]) return true
  if (engine[method]) {
    console.warn(`BoxCat:engine没有${method}方法`)
  } else {
    console.warn(`BoxCat:没有匹配到${key}所需的请求方式`)
  }
  return false
}
export function newFunction (method: string, url: string, engine: Engine, sliceRegExp: RegExp, paramsRegExp: RegExp, _config: Object): Function {
  const urls: string[] = url.split(sliceRegExp)
  const urlMatch: string[] = url.match(sliceRegExp)
  let params: string[] = []
  if (urlMatch) {
    params = urlMatch.map(param => param.replace(paramsRegExp, '$1'))
  }
  return (id: number | string | object, data?: object, config?: object): Function => {
    return engine[method](...getParam(urls, params, id, data, config, _config))
  }
}
// 解析params路径
function getParam (urls: string[], params: string[], id: number | string | object, data?: object, config?: object, _config?: object): [string, number | string | object, object] {
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
      url = arr.reduce((total, currentValue, index) => `${total}${currentValue}${urls[index + 1]}`, urls[0])
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
