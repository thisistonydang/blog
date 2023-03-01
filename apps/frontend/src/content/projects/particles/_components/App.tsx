import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export default function App() {
  return (
    <>
      <main className="h-screen w-screen cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{
            position: [0, 0, 2],
          }}
        >
          <Experience />
        </Canvas>
      </main>
    </>
  );
}
