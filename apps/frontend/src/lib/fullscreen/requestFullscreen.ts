export function requestFullscreen(element: Element): void {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ("webkitRequestFullscreen" in element) {
    (element.webkitRequestFullscreen as () => Promise<void>)();
  }
}
