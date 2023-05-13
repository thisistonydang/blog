import RAPIER from "@dimforge/rapier2d-compat";
import {
  Euler,
  InstancedMesh,
  Matrix4,
  Mesh,
  Quaternion,
  Vector3,
} from "three";

import { isPatched } from "../../types/Patched";
import { Physics } from "./Physics";

import type { World as PhysicsWorld2D } from "@dimforge/rapier2d-compat";

import type { PhysicsBody } from "../../types/Rapier2D";
import type { World } from "../../World";

const positionVector = new Vector3();
const euler = new Euler();
const quaternion = new Quaternion();
const scaleVector = new Vector3();
const matrix = new Matrix4();

export class Physics2D extends Physics {
  physicsWorld: PhysicsWorld2D;
  eventQueue = new RAPIER.EventQueue(true);
  meshMap = new WeakMap<Mesh, PhysicsBody>();
  instanceMeshMap = new WeakMap<InstancedMesh, PhysicsBody[]>();

  constructor(world: World) {
    super(world);

    const gravity = { x: 0.0, y: -9.81 };
    this.physicsWorld = new RAPIER.World(gravity);
  }

  init(): void {
    this.objects.forEach((object) => {
      if (isPatched(object) && "addPhysics2D" in object) {
        object.addPhysics2D(this);
      }
    });
  }

  stepPhysicsWorld(): void {
    this.physicsWorld.step(this.eventQueue);
  }

  updateThreeJsObjects(): void {
    this.movableObjects.forEach((mesh) => {
      if (mesh instanceof InstancedMesh) {
        const physicsBodies = this.instanceMeshMap.get(mesh);

        physicsBodies?.forEach(({ rigidBody }, index) => {
          // Do nothing if instance is fixed
          if (rigidBody.isFixed()) return;

          // Get position from physics world
          const position = rigidBody.translation();
          positionVector.set(position.x, position.y, 0);

          // Get rotation from physics world
          const rotation = rigidBody.rotation();
          quaternion.setFromEuler(euler.set(0, 0, rotation));

          // Get scale from current instance scale
          mesh.getMatrixAt(index, matrix);
          scaleVector.setFromMatrixScale(matrix);

          // Update instance matrix
          matrix.compose(positionVector, quaternion, scaleVector);
          mesh.setMatrixAt(index, matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
      } else if (mesh instanceof Mesh) {
        const rigidBody = this.meshMap.get(mesh)?.rigidBody;
        if (!rigidBody) return;

        const position = rigidBody.translation();
        mesh.position.x = position.x;
        mesh.position.y = position.y;

        const rotation = rigidBody.rotation();
        mesh.rotation.z = rotation;
      }
    });
  }

  handleSleepAndWake(): void {
    function handleSleepAndWakeEvents(
      mesh: Mesh | InstancedMesh,
      physicsBody: PhysicsBody
    ) {
      if (physicsBody.rigidBody.isSleeping()) {
        // If already sleeping, do nothing.
        if (physicsBody.isSleeping === true) return;

        // Else set isSleeping to true and handle onSleep event
        physicsBody.isSleeping = true;
        if (isPatched(mesh) && "onSleep" in mesh) mesh.onSleep(physicsBody);
      } else {
        // If already awake, do nothing. Note: isSleeping is undefined at the
        // beginning of a simulation, which means all onWake event handlers will
        // fire once at the beginning of the simulation.
        if (physicsBody.isSleeping === false) return;

        // Else set isSleeping to false and handle onWake event
        physicsBody.isSleeping = false;
        if (isPatched(mesh) && "onWake" in mesh) mesh.onWake(physicsBody);
      }
    }

    this.sleepAndWakeObjects.forEach((object) => {
      if (object instanceof InstancedMesh) {
        const physicsBodies = this.instanceMeshMap.get(object);

        physicsBodies?.forEach((physicsBody) => {
          handleSleepAndWakeEvents(object, physicsBody);
        });
      } else if (object instanceof Mesh) {
        const physicsBody = this.meshMap.get(object);
        if (!physicsBody) return;

        handleSleepAndWakeEvents(object, physicsBody);
      }
    });
  }

  handleCollisions(): void {
    this.eventQueue.drainCollisionEvents((handle1, handle2, started) => {
      if (started) {
        this.collisionEnterObjects.forEach((object) => {
          // Handle onCollisionEnter on instanced meshes
          if (object instanceof InstancedMesh) {
            const physicsBodies = this.instanceMeshMap.get(object);

            physicsBodies?.forEach((physicsBody) => {
              if ([handle1, handle2].includes(physicsBody.collider.handle)) {
                if (isPatched(object) && "onCollisionEnter" in object) {
                  object.onCollisionEnter(physicsBody);
                }
              }
            });
            // Handle onCollisionEnter on meshes
          } else if (object instanceof Mesh) {
            const physicsBody = this.meshMap.get(object);
            if (!physicsBody) return;

            if ([handle1, handle2].includes(physicsBody.collider.handle)) {
              if (isPatched(object) && "onCollisionEnter" in object) {
                object.onCollisionEnter(physicsBody);
              }
            }
          }
        });
      } else {
        this.collisionExitObjects.forEach((object) => {
          // Handle onCollisionExit on instanced meshes
          if (object instanceof InstancedMesh) {
            const physicsBodies = this.instanceMeshMap.get(object);

            physicsBodies?.forEach((physicsBody) => {
              if ([handle1, handle2].includes(physicsBody.collider.handle)) {
                if (isPatched(object) && "onCollisionExit" in object) {
                  object.onCollisionExit(physicsBody);
                }
              }
            });
            // Handle onCollisionExit on meshes
          } else if (object instanceof Mesh) {
            const physicsBody = this.meshMap.get(object);
            if (!physicsBody) return;

            if ([handle1, handle2].includes(physicsBody.collider.handle)) {
              if (isPatched(object) && "onCollisionExit" in object) {
                object.onCollisionExit(physicsBody);
              }
            }
          }
        });
      }
    });
  }
}
