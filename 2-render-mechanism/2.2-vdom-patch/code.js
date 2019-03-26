import { h, mount } from '../2.1-vdom-mount/code.js'

export { h, mount }

export function patch(vdom1, vdom2) {
  if (vdom1.type === vdom2.type) {
    if (vdom1.type === 'element') {
      patchElement(vdom1, vdom2)
    } else if (vdom1.type === 'text') {
      patchText(vdom1, vdom2)
    } else {
      replaceNode(vdom1, vdom2)
    }
  } else {
    replaceNode(vdom1, vdom2)
  }
}

function patchElement(vdom1, vdom2) {
  if (vdom1.tag === vdom2.tag) {
    vdom2.dom = vdom1.dom

    patchAttrs(vdom1, vdom2)
    patchChildren(vdom1, vdom2)
  } else {
    replaceNode(vdom1, vdom2)
  }
}

function patchAttrs(vdom1, vdom2) {

}

function patchChildren(vdom1, vdom2) {
  const oldChildren = vdom1.children
  const newChildren = vdom2.children

  const dom = vdom2.dom = vdom1.dom

  oldChildren.forEach((child, index) => {
    const newChild = newChildren[index]
    if (newChild) {
      patch(oldChild, newChild)
    } else {
      removeNode(oldChild)
    }
  })

  if (newChildren.length > oldChildren.length) {
    newChildren.slice(oldChildren.length).forEach(child => {
      mount(child, dom)
    })
  }
}

function patchText(vdom1, vdom2) {
  const dom = vdom2.dom = vdom1.dom

  if (vdom2.text !== vdom1.text) {
    dom.textContent = vdom2.text
  }
}

function replaceNode(vdom1, vdom2) {
  const newDom = mount(vdom2)
  vdom1.dom.parentNode.insertBefore(newDom, vdom1.dom)
  removeNode(vdom1)
}

function removeNode(vdom) {
  vdom.dom.parentNode.removeChild(vdom.dom)
}