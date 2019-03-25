import { Dep, effect } from '../1.2-getter-setter/code.js'

export { effect }

const handlers = {
  get(target, key) {
    const dep = getDep(target, key)
    dep.depend()

    return target[key]
  },

  set(target, key, value) {
    target[key] = value
    const dep = getDep(target, key)
    dep.notify()
    
    return true
  }
}

const depsMap = new WeakMap()

function getDep(target, key) {
  if (!depsMap.has(target)) {
    depsMap.set(target, {})
  }

  const deps = depsMap.get(target)

  if (!deps[key]) {
    deps[key] = new Dep()
  }

  return deps[key]
}

export function observable(obj) {
  return new Proxy(obj, handlers)
}
