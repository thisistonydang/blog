import { Clock } from "three";

import type { World as Physics2DWorld } from "@dimforge/rapier2d-compat";
import type { World as Physics3DWorld } from "@dimforge/rapier3d-compat";
import type { Object3D } from "three";

import type { Tick } from "../../types/Patched";
import type { World } from "../../World";

const clock = new Clock();

export abstract class Physics {
  world: World;
  objects: Object3D[] = [];
  collisionEnterObjects: Object3D[] = [];
  collisionExitObjects: Object3D[] = [];
  contactsWithObjects: Object3D[] = [];
  sleepAndWakeObjects: Object3D[] = [];
  movableObjects: Object3D[] = [];
  abstract physicsWorld: Physics2DWorld | Physics3DWorld;

  constructor(world: World) {
    this.world = world;
  }

  abstract stepPhysicsWorld(): void;
  abstract updateThreeJsObjects(): void;
  abstract handleSleepAndWake(): void;
  abstract handleCollisions(): void;
  abstract handleContactsWith(): void;

  stepWorld(): void {
    this.physicsWorld.timestep = clock.getDelta();
    this.stepPhysicsWorld();
    this.updateThreeJsObjects();
    this.handleSleepAndWake();
    this.handleCollisions();
    this.handleContactsWith();
  }

  tickOnWorldStart: Tick = () => {
    this.stepWorld();
  };

  isAwake(): boolean {
    let awake = false;

    // Set awake to true if any active rigid body exists
    this.physicsWorld.forEachActiveRigidBody(() => (awake = true));

    return awake;
  }

  runWhileAwake(): void {
    // Return if already awake
    if (this.isAwake()) return;

    // Wake physics world
    this.physicsWorld.step();

    // Keep stepping physics world until all rigid bodies are asleep
    this.world.loop.runWhile(
      () => this.isAwake(),
      () => this.stepWorld()
    );
  }
}
