let currentEffect

export class Observable {
  constructor(initialValue) {
    this.value = initialValue
    this.subscribers = new Set()
  }

  get() {
    this.depend()
    return this.value
  }

  set(newValue) {
    this.value = newValue
    this.notify()
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
