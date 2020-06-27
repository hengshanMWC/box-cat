export interface ObjectStrings {
  [params: string]: string[];
}
export interface ObjectString {
  [params: string]: string;
}
export type MethodsRule = 'startsWith' | 'endsWith' | 'includes';
export interface Engine {
  get: Function;
  post: Function;
  put: Function;
  delete: Function;
  [params: string]: any;
}
export interface Options {
  methods?: ObjectStrings;
  mergeMethods?: ObjectStrings;
  config?: object;
  methodsRule?: MethodsRule;
  rule?: string;
}
export interface BoxCat {
  [params: string]: apiFunction
}
export type id = number | string | object
export type apiFunction = (id?: id , data?: object, config?: object, ...rest: any[]) => Function
export function createApi(apis: ObjectString, engine: Engine, options?: Options): BoxCat;
export function createApiProxy(apis: ObjectString, engine: Engine, options?: Options): BoxCat;
