export interface Methods {
  readonly [params: string]: string[]
}
export interface Options {
  readonly methods?: Methods,
  readonly mergeMethods?: Methods,
  config?: object,
  readonly rule?: string
}