import createFactory from './createFactory'
import newProxy from './proxy'
export function createApi (apis: ObjectString, engine: Engine , options: Options = {}): BoxCat {
  const createApiFunction = createFactory(apis, engine, options)
  let apiFun: BoxCat = {}
  Object.keys(apis).forEach(key => {
    apiFun[key] = createApiFunction(key)
  })
  return apiFun
}
export function createApiProxy (apis: ObjectString, engine: Engine , options: Options = {}): BoxCat {
  if (typeof Proxy !== 'undefined') {
    return newProxy(createFactory(apis, engine, options))
  } else {
    return createApi(apis, engine, options)
  }
}