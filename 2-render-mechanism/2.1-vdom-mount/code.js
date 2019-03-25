export function h(tag, attrs, children) {
  return {
    tag,
    attrs,
    children: children.map(child => {
      if (typeof child === 'string') {
        return {
          type: 'text',
          text: child
        }
      } else {
        return { ...child, type: 'element' }
      }
    })
  }
}

export function mount(vdom, container) {
  let dom
  if (vdom.type === 'text') {
    dom = mountText(vdom)
  } else {
    dom = mountElement(vdom)
  }

  if (!container) {
    return dom
  }
  container.appendChild(dom)
}

function mountElement(vdom) {
  const dom = document.createElement(vdom.tag)

  if (vdom.attrs) {
    Object.keys(vdom.attrs).forEach(key => {
      dom.setAttribute(key, vdom.attrs[key])
    })
  }

  if (vdom.children) {
    vdom.children.forEach(child => {
      mount(child, dom)
    })
  }

  vdom.dom = dom

  return dom
}

function mountText(vdom) {
  const dom = document.createTextNode(vdom.text)

  vdom.dom = dom

  return dom
}