import { NewOptions, Extract, Options, ObjectStrings } from '../index.d'
import { getFormat, getESC, getRegFinish, createSliceRegExp, createParamsRegExp } from './utils/regExp'

function defaults (options: Options): Options {
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
  return Object.assign({}, defaultOptions, options)
}
function createRegExp (str: string): Extract {
  const arr: string[] = getFormat(str)
  arr[0] = getESC(arr[0])
  const paramsRegExp = createParamsRegExp(arr[0], arr[1])
  arr[1] = getRegFinish(arr[1])
  const sliceRegExp = createSliceRegExp(arr[0], arr[1])
  return {
    paramsRegExp,
    sliceRegExp
  }
}
export default function createOptions (options: Options = {}): NewOptions {
  const processOptions = defaults(options)
  const {
    paramsRegExp,
    sliceRegExp
  } = createRegExp(processOptions.rule)
  return {
    processOptions,
    paramsRegExp,
    sliceRegExp
  }
}