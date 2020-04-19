export interface ObjectString {
  [params: string]: string
}
export interface ObjectStrings {
  readonly [params: string]: string[]
}
export interface Engine {
  get: Function,
  post: Function,
  put: Function,
  delete: Function,
  [params: string]: any,
}
export interface Options {
  readonly methods?: ObjectStrings,
  mergeMethods?: ObjectStrings,
  config?: object,
  readonly rule?: string
}