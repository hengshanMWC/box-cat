import createOptions from './createOptions'
import { getMethod, isCreate, newFunction } from './createApi'
import newProxy from './proxy' 
export function createAll (apis: ObjectString, engine: Engine , options: Options = {}, isProxy: boolean = false): BoxCat {
  const {
    processOptions,
    paramsRegExp,
    sliceRegExp
  } = createOptions(options)
  let apiFun: BoxCat = null
  let method: string
  if (isProxy && typeof Proxy !== 'undefined') {
    apiFun = newProxy(function (key): apiFunction['fetch'] {
      method = getMethod(key, processOptions.methodsRule, processOptions.methods)
      if (isCreate(key, method, engine)) {
        return newFunction(method, apis[key], engine, sliceRegExp, paramsRegExp, processOptions.config)
      }
    })
  } else {
    apiFun = {}
    Object.keys(apis).forEach(key => {
      method = getMethod(key, processOptions.methodsRule, processOptions.methods)
      if (isCreate(key, method, engine)) {
        apiFun[key] = newFunction(method, apis[key], engine, sliceRegExp, paramsRegExp, processOptions.config)
      }
    })
  }
  return apiFun
}
export function createProxy (apis: ObjectString, engine: Engine , options: Options = {}): BoxCat {
  return createAll(apis, engine, options, true)
}