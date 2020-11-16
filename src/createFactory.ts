import createOptions from './createOptions'
import { getMethod, isCreate, newFunction } from './createApi'
export default function createFactory (apis: ObjectString, response: Response , options: Options = {}): createdApiFunction {
  const {
    processOptions,
    paramsRegExp,
    sliceRegExp
  } = createOptions(options)
  let method: string
  return function (key: string): apiFunction {
    method = getMethod(key, processOptions.methodsRule, processOptions.methods)
    if (isCreate(key, method, response)) {
      return newFunction(method, apis[key], response, sliceRegExp, paramsRegExp, processOptions.config)
    }
  }
}