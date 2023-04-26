import type { InstancedMesh, Mesh } from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

type Tick = (delta: number) => void;

export interface TickableInstancedMesh extends InstancedMesh {
  tick?: Tick;
}

export interface TickableMesh extends Mesh {
  tick?: Tick;
}

export interface TickableOrbitControls extends OrbitControls {
  tick?: Tick;
}

export interface TickableTrackballControls extends TrackballControls {
  tick?: Tick;
}

export type TickableObject =
  | TickableInstancedMesh
  | TickableMesh
  | TickableOrbitControls
  | TickableTrackballControls;
