import { Scene } from "three";

/**
 * Setup canvas for rendering scene given id of div containing a canvas element.
 */
export function setup_canvas(id: string): {
  container: HTMLDivElement;
  sizes: { width: number; height: number };
  canvas: HTMLCanvasElement;
  scene: Scene;
} {
  // Get parent container div by id.
  const container = document.getElementById(id) as HTMLDivElement;

  // Get initial width and height of parent div.
  const sizes = {
    width: container.offsetWidth,
    height: container.offsetHeight,
  };

  // Get canvas.
  const canvas = document.querySelector(`#${id} canvas`) as HTMLCanvasElement;

  // Create scene.
  const scene = new Scene();

  return {
    container,
    sizes,
    canvas,
    scene,
  };
}
