interface ObjectString {
  [params: string]: string;
}
interface ObjectStrings {
  [params: string]: string[];
}
declare type MethodsRule = 'startsWith' | 'endsWith' | 'includes';
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
  [params: string]: apiFunction['fetch']
}
interface apiFunction {
  fetch: (id?: number | string | object, data?: object, config?: object) => Function
}