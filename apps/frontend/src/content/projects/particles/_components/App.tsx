import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import Controls from "@lib/components/Controls";
import Experience from "./Experience";

export default function App() {
  return (
    <StrictMode>
      <main className="h-screen w-screen cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{
            position: [0, 0, 4],
          }}
        >
          <Experience />
          {/* <Perf position="bottom-right" /> */}
        </Canvas>
      </main>
      <Controls />
    </StrictMode>
  );
}
