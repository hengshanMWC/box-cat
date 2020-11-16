import createFactory from './createFactory'
import newProxy from './proxy'
export function createApis (apis: ObjectString, response: Response , options: Options = {}): BoxCat {
  const createApiFunction = createFactory(apis, response, options)
  let apiFun: BoxCat = {}
  Object.keys(apis).forEach(key => {
    apiFun[key] = createApiFunction(key)
  })
  return apiFun
}
export function createProxy (apis: ObjectString, response: Response , options: Options = {}): BoxCat {
  if (typeof Proxy !== 'undefined') {
    return newProxy(createFactory(apis, response, options))
  } else {
    return createApis(apis, response, options)
  }
}
export const createAll = createApis