import { observable, effect } from '../../1-reactivity/1.3-proxy/code.js'
import { h, mount, patch } from '../2.2-vdom-patch/code.js'

export { h, observable }

export function bootstrap(render, container) {
  let prevVDOM
  effect(() => {
    if (!prevVDOM) {
      prevVDOM = render()
      mount(prevVDOM, container)
    } else {
      const nextVDOM = render()
      patch(prevVDOM, nextVDOM)
      prevVDOM = nextVDOM
    }
  })
}
