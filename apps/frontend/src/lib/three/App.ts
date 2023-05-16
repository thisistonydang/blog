import RAPIER from "@dimforge/rapier2d-compat";

import { perspectiveCamera } from "@lib/three/components-core/perspectiveCamera";
import { orbitControls } from "@lib/three/controls/orbit/orbitControls";
import { createAxesHelper } from "@lib/three/helpers/axes-helper";
// import { createGridHelper } from "@lib/three/helpers/grid-helper";

import { Physics2D } from "@lib/three/systems/Physics/Physics2D";
import { Pointer } from "@lib/three/systems/Pointer/Pointer";
import { Gui } from "@lib/three/systems/Gui";
import { Statistics } from "@lib/three/systems/Statistics";
import { World } from "@lib/three/World";

import { camera } from "./components/camera/camera";
import { floor } from "./components/floor/floor";
import { physicalCubes } from "./components/physcialCubes/physicalCubes";
import { physicalCube } from "./components/physicalCube/physicalCube";

await RAPIER.init();

export class App extends World {
  constructor(container: HTMLDivElement) {
    super({
      camera: perspectiveCamera({}),
      container,
      pointer: Pointer,
      physics: Physics2D,
      gui: Gui,
      statistics: Statistics,
    });

    this.addObjects([
      createAxesHelper(),
      // createGridHelper(),
      camera(this),
      orbitControls(this, {}),
      // new Cubes(this),
      floor(this, { position: [0, -3, 0] }),
      physicalCube(this, { position: [0, 0, 0] }),
      physicalCube(this, { position: [0, 2, 0] }),
      physicalCubes(this),
    ]);
  }
}
