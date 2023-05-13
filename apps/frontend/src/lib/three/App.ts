import { perspectiveCamera } from "./components-core/perspectiveCamera";

import { camera } from "./components/camera/camera";
import { floor } from "./components/floor/floor";
import { physicalCube } from "./components/physicalCube/physicalCube";
import { physicalCubes } from "./components/physcialCubes/physicalCubes";

import { orbitControls } from "./controls/orbit/orbitControls";

import { createAxesHelper } from "./helpers/axes-helper";
// import { createGridHelper } from "./helpers/grid-helper";

import { World } from "./World";

import type { Rapier2D } from "./types/Rapier2D";
import type { Rapier3D } from "./types/Rapier3D";

export class App extends World {
  constructor(container: HTMLDivElement, RAPIER: Rapier2D | Rapier3D) {
    super({
      camera: perspectiveCamera({}),
      container,
      RAPIER,
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
