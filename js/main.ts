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
  offsetElm.innerHTML = scrollPositionString(elm)
  rectElm.innerHTML = boundingRectString(elm)
}

function onToTop() {
  const parent = getParent()
  const target = getTarget()
  const targetRect = target.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  const computed = window.getComputedStyle(target)


  parent.scrollTop = parent.scrollTop + targetRect.top - parentRect.top

}

function onToBottom() {
  const parent = getParent()
  const target = getTarget()
  const targetRect = target.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  const computed = window.getComputedStyle(target)
  const elmHeight:number = parseInt(computed.getPropertyValue('height'))
  const elmMargin:number = parseInt(computed.getPropertyValue('margin-top')) + parseInt(computed.getPropertyValue('margin-bottom'))
  const elmBorder:number = parseInt(computed.getPropertyValue('border-top-width')) + parseInt(computed.getPropertyValue('border-bottom-width'))
  innerHeight = parent.clientHeight

  parent.scrollTop = parent.scrollTop + targetRect.top - parentRect.top - innerHeight +elmHeight + elmMargin + elmBorder

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

