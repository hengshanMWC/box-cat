export default function (fn: createdApiFunction): BoxCat{
  return new Proxy ({}, {
    get: function (target, propKey: string, receiver) {
      if (!target[propKey]) {
        target[propKey] = fn(propKey)
      }
      return Reflect.get(target, propKey, receiver);
    }
  })
}