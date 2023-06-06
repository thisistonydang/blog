/**
 * Attempt to request fullscreen.
 *
 * Return false if error occurs while requesting fullscreen, else return true.
 */
export function requestFullscreen(element: Element): boolean {
  try {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ("webkitRequestFullscreen" in element) {
      (element.webkitRequestFullscreen as () => Promise<void>)();
    } else if ("webkitEnterFullscreen" in element) {
      (element.webkitEnterFullscreen as () => Promise<void>)();
    } else {
      return false; // API for requesting fullscreen does not exist.
    }
  } catch (error: unknown) {
    return false; // Error occurred while requesting fullscreen.
  }

  return true; // Fullscreen requested successfully.
}
