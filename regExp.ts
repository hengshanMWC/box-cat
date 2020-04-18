export function getFormat (str: string, key: string = 'key'): string[] {
  return str.split(new RegExp(key)).slice(0, 2)
}
export function getESC (str: string): string {
  return ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|'].some(s => s === str)
    ? '\\' + str
    : str
}
export function getRegFinish (str: string): string {
  return str === ''
    ? str
    : `[^${str}]`
}
export function createRegExp (str1: string, str2: string): RegExp {
  return new RegExp(`\\/${str1}${str2}[^/]+` ,'g')
}