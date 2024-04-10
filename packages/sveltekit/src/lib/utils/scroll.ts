export const scrollToElem = (
  targetElem: Element,
  options: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start',
  },
) => {
  targetElem.scrollIntoView(options);
};

let scroller: HTMLElement;

export function setScroller(element: HTMLElement | null) {
  if (element) {
    scroller = element;
  }
}
export function scrollScrollerToElem(element: HTMLElement, scrollingElement: HTMLElement | null = null) {
  if (scrollingElement) {
    scrollingElement.scrollTop = element.getBoundingClientRect().y;
  } else {
    scroller.scrollTop = element.getBoundingClientRect().y;
  }
}

export function scrollScrollerToId(id: string) {
  const elem = document.getElementById(id);
  if (elem) {
    scrollScrollerToElem(elem);
  }
}
