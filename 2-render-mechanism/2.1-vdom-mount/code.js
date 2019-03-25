export function h(tag, attrs, children) {
  return {
    tag,
    attrs,
    children
  }
}

export function mount(vdom, container) {
  let dom
  switch(typeof vdom) {
    case 'string':
      dom = mountText(vdom)
      break
    default:
      dom = mountElement(vdom)
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

  return dom
}

function mountText(vdom) {
  return document.createTextNode(vdom)
}