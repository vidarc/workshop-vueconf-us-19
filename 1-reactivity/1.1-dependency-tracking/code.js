let currentRunner

export class Observable {
  constructor(count) {
    this.count = count
    this.subscribers = new Set()
  }

  get() {
    if (currentRunner) {
      this.subscribers.add(currentRunner)
    }
    return this.count
  }

  set(count) {
    this.count = count
    this.subscribers.forEach(sub => sub())
  }
}

export function effect(runner) {
  currentRunner = runner
  runner()
  currentRunner = null
}
