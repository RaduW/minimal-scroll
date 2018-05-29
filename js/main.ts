/*
 Name: main.ts
 Date: 26 Feb 2018
 Author: raduw
 Description: main
 hello
 */
/// <reference path="minimalScroll.ts" />

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
  MinimalScroll.scrollToTop(target, parent)
}

function onToBottom() {
  const parent = getParent()
  const target = getTarget()
  MinimalScroll.scrollToBottom(target, parent)
}

function onToTopLarge() {
  const parent = getParent()
  const target = getLargeTarget()
  MinimalScroll.scrollToTop(target, parent)
}

function onToBottomLarge() {
  const parent = getParent()
  const target = getLargeTarget()
  MinimalScroll.scrollToBottom(target, parent)

}

function onMinimalScroll() {
  const parent = getParent()
  const target = getTarget()
  MinimalScroll.minimalScroll(target, parent)
}

function onMinimalScrollLarge() {
  const parent = getParent()
  const target = getLargeTarget()
  MinimalScroll.minimalScroll(target, parent)
}

function onScroll() {
  displayInfo('target')
  displayInfo('parent')
  displayInfo('largeTarget')
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

