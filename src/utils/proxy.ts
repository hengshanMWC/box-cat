export default function (boxCat: any) {
  return new Proxy (boxCat, {
    get: function (target, propKey: string, receiver) {
      if (!target[propKey]) {
        target[propKey] = target.createIng(propKey)
      }
      return Reflect.get(target, propKey, receiver);
    }
  })
}