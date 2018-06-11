/*
 Name: minimalScroll.ts.ts
 Date: 29 May 2018
 Author: raduw
 Description: TODO
 */

namespace MinimalScroll {
  export function scrollToTop(elm: HTMLElement, parent: HTMLElement) {
    const targetRect = elm.getBoundingClientRect()
    const parentRect = parent.getBoundingClientRect()
    const parentStyle = window.getComputedStyle(parent)
    const parentBorderTop = parseInt(parentStyle.getPropertyValue('border-top-width'))

    const scrollDelta = targetRect.top - parentRect.top
    //we don't really want to align client top to parent top, we actually want to align client top
    //under the top border of the parent( so align client top to the end of the parent border top)
    parent.scrollTop = parent.scrollTop + scrollDelta - parentBorderTop

  }

  export function scrollToBottom(elm: HTMLElement, parent: HTMLElement) {
    const targetRect = elm.getBoundingClientRect()
    const parentRect = parent.getBoundingClientRect()
    const parentStyle = window.getComputedStyle(parent)
    const parentBorderTop = parseInt(parentStyle.getPropertyValue('border-top-width'))

    //calculate element height as css height + border + padding
    const elmHeight: number = elm.offsetHeight
    const innerHeight = parent.clientHeight


    const parentBorderBottom: number = parseInt(parentStyle.getPropertyValue('border-bottom-width'))

    //from the position that would alignt to the top substract inner height (i.e. align under the bottom ) than add
    //element height (align the bottom of the parent with the bottom of the target)
    const scrollDeltaTop = targetRect.top - parentRect.top // how much I would need to scroll to align at the top
    const scrollDelta = scrollDeltaTop - innerHeight + elmHeight
    parent.scrollTop = parent.scrollTop + scrollDelta - parentBorderTop
  }

  export function minimalScroll(elm: HTMLElement, parent: HTMLElement) {
    //first see if the element is bigger than the client rect
    const elmHeight: number = elm.offsetHeight
    const innerHeight = parent.clientHeight
    const parentRect = parent.getBoundingClientRect()
    const targetRect = elm.getBoundingClientRect()
    const parentTop = parentRect.top
    const parentStyle = window.getComputedStyle(parent)

    const parentBorderTop = parseInt(parentStyle.getPropertyValue('border-top-width'))
    const elmTop = targetRect.top - parentBorderTop

    const childAbove = targetRect.top - parentRect.top - parentBorderTop < 0
    const childBelow = targetRect.top + elmHeight - parentRect.top - innerHeight > 0

    if (elmHeight > innerHeight) {
      //element does not fit in parent
      if (childAbove && !childBelow) {
        //child to high, align bottom
        scrollToBottom(elm, parent)
      }
      else if (!childAbove && childBelow) {
        //child to low, align top
        scrollToTop(elm, parent)
      }
    }
    else {
      //element fits in parent
      if (childAbove) {
        //child to hight, align top
        scrollToTop(elm, parent)
      }
      else if (childBelow) {
        //child to low, align bottom
        scrollToBottom(elm, parent)
      }
    }
  }

}
