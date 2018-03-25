/*
 Name: main.ts
 Date: 26 Feb 2018
 Author: raduw
 Description: main
 hello
 */

declare var $

function boundingRectString(elm: HTMLElement | null | undefined): string {
  if (!elm) {
    return 'Invalid element'
  }

  const rect = elm.getBoundingClientRect()
  const height = elm.clientHeight
  return `top=${rect.top} b=${rect.bottom} innerHeight=${height}`
}

function scrollPositionString(elm: HTMLElement | null | undefined): string {
  if (!elm) {
    return 'Invalid element'
  }
  const y = elm.scrollTop
  return `scrollTop=${y} `
}

function cssInfoString(elm: HTMLElement | null | undefined): string {
  if (!elm) {
    return 'Invalid element'
  }
  const computed = window.getComputedStyle(elm)
  const marginTop = computed.getPropertyValue('margin-top')
  const marginBottom = computed.getPropertyValue('margin-bottom')
  const borderTop = computed.getPropertyValue('border-top-width')
  const borderBottom = computed.getPropertyValue('border-bottom-width')
  const paddingTop = computed.getPropertyValue('padding-top')
  const paddingBottom = computed.getPropertyValue('padding-bottom')
  return `{marginTop=${marginTop} marginBottom=${marginBottom} borderTop=${borderTop} ` +
    `borderBottom=${borderBottom} paddingTop=${paddingTop} paddingBottom=${paddingBottom} }`
}


function getParent() {
  return document.getElementById('parent')
}

function getTarget() {
  return document.getElementById('target')
}

function displayInfo(elmId: string) {
  const elm = document.getElementById(elmId)
  const offsetElm = document.getElementById(`${elmId}-offset`)
  const rectElm = document.getElementById(`${elmId}-rect`)
  const cssInfoElm = document.getElementById(`${elmId}-cssInfo`)
  offsetElm.innerHTML = scrollPositionString(elm)
  rectElm.innerHTML = boundingRectString(elm)
  cssInfoElm.innerHTML = cssInfoString(elm)
}

function onToTop() {
  const parent = getParent()
  const target = getTarget()
  const targetRect = target.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  const computed = window.getComputedStyle(target)


  const scrollDelta = targetRect.top - parentRect.top
  parent.scrollTop = parent.scrollTop + scrollDelta

}

function onToBottom() {
  const parent = getParent()
  const target = getTarget()
  const targetRect = target.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  const computed = window.getComputedStyle(target)
  const elmHeight: number = parseInt(computed.getPropertyValue('height')) +
    parseInt(computed.getPropertyValue('padding-bottom')) +
    parseInt(computed.getPropertyValue('padding-top')) +
    parseInt(computed.getPropertyValue('border-top-width')) +
    parseInt(computed.getPropertyValue('border-bottom-width'))
  innerHeight = parent.clientHeight

  const scrollDeltaTop = targetRect.top - parentRect.top // how much I would need to scroll to align at the top
  const scrollDelta = scrollDeltaTop - innerHeight + elmHeight
  parent.scrollTop = parent.scrollTop + scrollDelta

}

function onScroll() {
  displayInfo('target')
  displayInfo('parent')
}


$(document).ready(function () {
  window.addEventListener('scroll', onScroll)
  const parent = document.getElementById('parent')
  parent.addEventListener('scroll', onScroll)
  const toTop = document.getElementById('to-top')
  toTop.addEventListener('click', onToTop)
  const toBottom = document.getElementById('to-bottom')
  toBottom.addEventListener('click', onToBottom)

})

