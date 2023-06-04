import { get } from "svelte/store";

import { orthographicCamera } from "@lib/three/components-core/orthographicCamera";
import { Physics2D } from "@lib/three/systems/Physics/Physics2D";
// import { Pointer } from "@lib/three/systems/Pointer/Pointer";
// import { Gui } from "@lib/three/systems/Gui";
// import { Statistics } from "@lib/three/systems/Statistics";
import { World } from "@lib/three/World";

import { gameState, playerImage } from "../_stores/appState";

import { camera } from "./components/camera";
import { finishText } from "./components/finishText";
import { platforms } from "./components/platforms";
import { player } from "./components/player";
import { scene } from "./components/scene";
import { traps } from "./components/traps";

import { platformInstances } from "./instances/platformInstances";
import { trapInstances } from "./instances/trapInstances";

export class App extends World {
  player = player(this);

  cameraHeight: "start" | "follow_player_y" | "end" = "start";

  checkpoints = {
    finishStart: 294,
    finishEnd: 306,
    offscreen: 350,
  };

  constructor(container: HTMLDivElement) {
    // Setup canvas
    super({
      camera: orthographicCamera({
        left: -5,
        right: 11,
        top: 4.5,
        bottom: -4.5,
        near: 9,
        far: 11,
        scale: get(playerImage) ? 1 : 1.5,
        position: [0, 3, 10],
      }),
      container,
      physics: Physics2D,
      // pointer: Pointer,
      // gui: Gui,
      // statistics: Statistics,
    });

    // Add objects
    this.addObjects([
      scene(this),
      camera(this),
      platforms({ instances: platformInstances }),
      traps({ instances: trapInstances }),
      finishText(),
      this.player,
    ]);
  }

  startGame() {
    this.start(); // Start render loop
    gameState.set("playing");
  }

  stopGame() {
    this.stop(); // Stop render loop
    gameState.set("stopped");
  }

  endGame() {
    gameState.set("ended");
  }

  restart() {
    // Stop render loop
    this.stop();

    // Reset player and camera
    this.player.userData.reset();
    this.camera.userData.reset();

    // Request a render
    this.requestRender();

    // Set focus on the canvas so user can immediately start playing again
    const canvas = this.renderer.domElement;
    setTimeout(() => canvas.focus(), 0);

    gameState.set("not_started");
  }

  jump() {
    this.player.userData.jump();
  }
}
