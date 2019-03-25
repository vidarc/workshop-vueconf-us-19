export default {
  data () {
    return {
      ok: true,
      foo: 'hello',
      list: [1, 2, 3]
    }
  },
  render(h) {
    return h('div', [
      h('button', {
        on: {
          click: () => {
            this.ok = !this.ok
          }
        }
      }, 'toggle ok'),

      // <div v-if="ok"></div>

      h('button', {
        on: {
          click: () => {
            this.list.push(this.list.length + 1)
          }
        }
      }, 'push number'),

      // <ul><list v-for="i in list">{{ i }}</list></ul>

      h('span', this.foo),

      // <input v-model="foo">
    ])
  }
}
