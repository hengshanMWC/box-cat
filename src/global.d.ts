type id = number | string | object
type MethodsRule = 'startsWith' | 'endsWith' | 'includes';
type apiFunction = (id?: id , data?: object, config?: object, ...rest: any[]) => Function
type createdApiFunction = (key: string) => apiFunction
interface ObjectString {
  [params: string]: string;
}
interface ObjectStrings {
  [params: string]: string[];
}
interface Engine {
  get: Function;
  post: Function;
  put: Function;
  delete: Function;
  [params: string]: any;
}
interface Options {
  methods?: ObjectStrings;
  mergeMethods?: ObjectStrings;
  config?: object;
  methodsRule?: MethodsRule;
  rule?: string;
}
interface extract {
  sliceRegExp: RegExp
  paramsRegExp: RegExp
}
interface BoxCat {
  [params: string]: apiFunction
}