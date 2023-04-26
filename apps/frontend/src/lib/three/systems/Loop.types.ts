import type { InstancedMesh, Mesh } from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

type Tick = (delta: number) => void;

export interface UpdatableInstancedMesh extends InstancedMesh {
  tick?: Tick;
}

export interface UpdatableMesh extends Mesh {
  tick?: Tick;
}

export interface UpdatableOrbitControls extends OrbitControls {
  tick?: Tick;
}

export interface UpdatableTrackballControls extends TrackballControls {
  tick?: Tick;
}

export type UpdatableObject =
  | UpdatableInstancedMesh
  | UpdatableMesh
  | UpdatableOrbitControls
  | UpdatableTrackballControls;
