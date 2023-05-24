import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";

import LevaControls from "@lib/components/LevaControls";
import Loading from "@lib/components/Loading";
import { useMounted } from "@lib/react/hooks/useMounted";

import Experience from "./Experience";
import Interface from "./Interface";

export default function App({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();

  return (
    <StrictMode>
      <main>
        {mounted ? (
          <div
            className="
              h-screen w-screen
              animate-[fade-in_10s]
              cursor-grab active:cursor-grabbing
            "
          >
            <Canvas gl={{ antialias: false }} camera={{ position: [0, 0, 4] }}>
              <Experience />
              {/* <Perf position="bottom-right" /> */}
            </Canvas>
            <LevaControls collapsed />
          </div>
        ) : (
          <Loading />
        )}
      </main>
      <Interface>{children}</Interface>
    </StrictMode>
  );
}
