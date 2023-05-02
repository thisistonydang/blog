export interface Instance {
  id: string;
  position: { x: number; y: number };
  rotation?: number; // in radians
  scale?: { x: number; y: number; z: number };
  color?: number;
}

export const instances: Instance[] = [
  { id: "A", position: { x: -1.5, y: -1.5 } },
  { id: "B", position: { x: -1.5, y: 1.5 } },
  { id: "C", position: { x: 1.5, y: 1.5 } },
  { id: "D", position: { x: 1.5, y: -1.5 } },
];
