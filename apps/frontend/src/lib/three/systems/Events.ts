import { Raycaster, Vector2 } from "three";
import { clickListener } from "./click-listener";
import { hoverListener } from "./hover-listener";

import type { Camera, Intersection, Object3D } from "three";

export class Events {
  raycaster = new Raycaster();
  mouse = new Vector2(2, 2); // Set initial x and y to be > 1 so ray doesn't hit canvas on start up.
  camera: Camera;
  objectsToTest: Object3D[] = [];

  constructor(canvas: HTMLCanvasElement, camera: Camera) {
    this.camera = camera;

    // Track mouse position on canvas
    canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.offsetX / canvas.clientWidth) * 2 - 1;
      this.mouse.y = -(e.offsetY / canvas.clientHeight) * 2 + 1;
    });

    // Listen for and handle mouse events
    clickListener(this, canvas);
    hoverListener(this, canvas);
  }

  castRay(): Intersection[] {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objectsToTest);

    return intersects;
  }
}
