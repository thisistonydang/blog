export function exitFullscreen(e: Event): void {
  e.preventDefault();

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ("webkitExitFullscreen" in document) {
    (document.webkitExitFullscreen as () => Promise<void>)();
  }
}
