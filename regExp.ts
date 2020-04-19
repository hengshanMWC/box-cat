// 取规则
export function getFormat (str: string, key: string = 'param'): string[] {
  return str.split(new RegExp(key)).slice(0, 2)
}
// 转义字符加\\
export function getESC (str: string): string {
  return ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|'].some(s => s === str)
    ? '\\' + str
    : str
}
// 匹配末尾
export function getRegFinish (str: string): string {
  return str === ''
    ? str
    : `[^${str}]`
}
export function createSliceRegExp (str1: string, str2: string): RegExp {
  return new RegExp(`\\/${str1}${str2}[^/]+` ,'g')
}
export function createParamsRegExp (str1: string, str2: string): RegExp {
  return new RegExp(`\\/${str1}([^${str2}]+)${str2}`)
}