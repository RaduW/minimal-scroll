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

function getLargeTarget() {
  return document.getElementById('largeTarget')
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
  scrollToTop(target, parent)
}

function onToBottom() {
  const parent = getParent()
  const target = getTarget()
  scrollToBottom(target, parent)
}

function onToTopLarge() {
  const parent = getParent()
  const target = getLargeTarget()
  scrollToTop(target, parent)
}

function onToBottomLarge() {
  const parent = getParent()
  const target = getLargeTarget()
  scrollToBottom(target, parent)

}

function onMinimalScroll() {
  const parent = getParent()
  const target = getTarget()
  minimalScroll(target, parent)
}

function onMinimalScrollLarge() {
  const parent = getParent()
  const target = getLargeTarget()
  minimalScroll(target, parent)
}


function scrollToTop(elm: HTMLElement, parent: HTMLElement) {
  const targetRect = elm.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  const parentStyle = window.getComputedStyle(parent)
  const parentBorderTop = parseInt(parentStyle.getPropertyValue('border-top-width'))

  const scrollDelta = targetRect.top - parentRect.top
  //we don't really want to align client top to parent top, we actually want to align client top
  //under the top border of the parent( so align client top to the end of the parent border top)
  parent.scrollTop = parent.scrollTop + scrollDelta - parentBorderTop

}

function scrollToBottom(elm: HTMLElement, parent: HTMLElement) {
  const targetRect = elm.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  const parentStyle = window.getComputedStyle(parent)
  const parentBorderTop = parseInt(parentStyle.getPropertyValue('border-top-width'))

  //calculate element height as css height + border + padding
  const elmHeight: number = getElementHeight(elm)
  const innerHeight = parent.clientHeight


  const parentBorderBottom: number = parseInt(parentStyle.getPropertyValue('border-bottom-width'))

  //from the position that would alignt to the top substract inner height (i.e. align under the bottom ) than add
  //element height (align the bottom of the parent with the bottom of the target)
  const scrollDeltaTop = targetRect.top - parentRect.top // how much I would need to scroll to align at the top
  const scrollDelta = scrollDeltaTop - innerHeight + elmHeight
  parent.scrollTop = parent.scrollTop + scrollDelta - parentBorderTop
}

function getElementHeight(elm: HTMLElement): number {
  const clientStyle = window.getComputedStyle(elm)
  const elmHeight: number = parseInt(clientStyle.getPropertyValue('height')) +
    parseInt(clientStyle.getPropertyValue('padding-bottom')) +
    parseInt(clientStyle.getPropertyValue('padding-top')) +
    parseInt(clientStyle.getPropertyValue('border-top-width')) +
    parseInt(clientStyle.getPropertyValue('border-bottom-width'))
  return elmHeight
}

function onScroll() {
  displayInfo('target')
  displayInfo('parent')
  displayInfo('largeTarget')

}

function minimalScroll(elm: HTMLElement, parent: HTMLElement) {
  //first see if the element is bigger than the client rect
  const elmHeight: number = getElementHeight(elm)
  const innerHeight = parent.clientHeight
  const parentRect = parent.getBoundingClientRect()
  const targetRect = elm.getBoundingClientRect()
  const parentTop = parentRect.top
  const parentStyle = window.getComputedStyle(parent)

  const parentBorderTop = parseInt(parentStyle.getPropertyValue('border-top-width'))
  const elmTop = targetRect.top - parentBorderTop

  const childAbove = targetRect.top - parentRect.top - parentBorderTop < 0
  const childBelow = targetRect.top + elmHeight - parentRect.top - innerHeight > 0

  if ( elmHeight > innerHeight){
    //element does not fit in parent
    if ( childAbove && ! childBelow){
      //child to high, align bottom
      scrollToBottom(elm, parent)
    }
    else if ( !childAbove && childBelow){
      //child to low, align top
      scrollToTop(elm,parent)
    }
  }
  else{
    //element fits in parent
    if ( childAbove ) {
      //child to hight, align top
      scrollToTop(elm, parent)
    }
    else if (childBelow){
      //child to low, align bottom
      scrollToBottom(elm, parent)
    }
  }
}


$(document).ready(function () {
  window.addEventListener('scroll', onScroll)
  const parent = document.getElementById('parent')
  parent.addEventListener('scroll', onScroll)
  const toTop = document.getElementById('to-top')
  toTop.addEventListener('click', onToTop)
  const toBottom = document.getElementById('to-bottom')
  toBottom.addEventListener('click', onToBottom)
  const toTopLarge = document.getElementById('to-top-large')
  toTopLarge.addEventListener('click', onToTopLarge)
  const toBottomLarge = document.getElementById('to-bottom-large')
  toBottomLarge.addEventListener('click', onToBottomLarge)
  const minimalScroll = document.getElementById('minimal-scroll')
  minimalScroll.addEventListener('click', onMinimalScroll)
  const minimalScrollLarge = document.getElementById('minimal-scroll-large')
  minimalScrollLarge.addEventListener('click', onMinimalScrollLarge)
})

