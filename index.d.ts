interface ObjectString {
  [params: string]: string;
}
interface ObjectStrings {
  readonly [params: string]: string[];
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
  readonly methods?: ObjectStrings;
  mergeMethods?: ObjectStrings;
  config?: object;
  methodsRule?: MethodsRule;
  readonly rule?: string;
}
export default class BoxCat {
  apis: ObjectString;
  engine: Engine;
  options: Options;
  sliceRegExp: RegExp;
  paramsRegExp: RegExp;
  [params: string]: any;
  constructor(apis: ObjectString, engine: Engine, options?: Options);
  protected createRegExp(str: string): void;
  protected defaults(options: Options): void;
  protected apiFor(): void;
  protected createIng(key: string): void;
  protected getMethod(name: string): string;
  protected newFunction(method: string, url: string): Function;
  protected getParam(urls: string[], params: string[], id: number | string | object, data?: object, config?: object): [string, number | string | object, object];
}
export {};
