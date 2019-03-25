let currentEffect

export class Dep {
  constructor() {
    this.subscribers = new Set()
  }

  depend() {
    if (currentEffect) {
      this.subscribers.add(currentEffect)
    }
  }

  notify() {
    this.subscribers.forEach(sub => {
      sub()
    })
  }
}

export function effect(runner) {
  currentEffect = runner
  runner()
  currentEffect = null
}

export function observable(obj) {
  Object.keys(obj).forEach(key => {
    let value = observable(obj[key])
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        return value
      },
      set(newValue) {
        value = newValue
        dep.notify()
      }
    })
  })

  return obj
}
