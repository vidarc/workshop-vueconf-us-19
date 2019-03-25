import { Dep, effect } from '../1.2-getter-setter/code.js'

export { effect }

// ---
const depsStorage = new WeakMap()

const handlers = {
  get(target, key, receiver) {
    let deps = depsStorage.get(target)
    if (!deps) {
      deps = {}
      depsStorage.set(target, deps)
    }

    let dep = deps[key]
    if (!dep) {
      dep = deps[key] = new Dep()
    }

    dep.depend()
    return observable(target[key])
  },
  set(target, key, value) {
    target[key] = value

    // notify
    let deps = depsStorage.get(target)
    if (!deps) {
      return
    }

    const dep = deps[key]
    if (dep) {
      dep.notify()
    }
    return true
  }
}

const observedValues = new WeakMap()

export function observable(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  if (observedValues.has(obj)) {
    return observedValues.get(obj)
  }
  // check if obj is an already observed value
  const observed = new Proxy(obj, handlers)
  observedValues.set(obj, observed)
  return observed
}
