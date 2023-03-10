import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";

import Controls from "@lib/components/Controls";
import Loading from "@lib/components/Loading";
import { useMounted } from "@lib/hooks/useMounted";

import Experience from "./Experience";

export default function App() {
  const mounted = useMounted();

  return (
    <StrictMode>
      {mounted ? (
        <main
          className="
              h-screen w-screen
              animate-[fade-in_10s]
              cursor-grab active:cursor-grabbing
            "
        >
          <Canvas camera={{ position: [0, 0, 4] }}>
            <Experience />
            {/* <Perf position="bottom-right" /> */}
          </Canvas>
          <Controls />
        </main>
      ) : (
        <Loading />
      )}
    </StrictMode>
  );
}
