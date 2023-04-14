import { StrictMode, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";

import LevaControls from "@lib/components/LevaControls";
import Loading from "@lib/components/Loading";
import { useMounted } from "@lib/hooks/useMounted";

import Experience from "./Experience";
import Interface from "./Interface";

export default function App({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();

  const [showInfo, setShowInfo] = useState(false);
  const [hasPing, setHasPing] = useState(true);

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
            <Canvas
              gl={{ antialias: false }}
              camera={{ position: [0, 0, 4] }}
              onMouseDown={() => setShowInfo(false)}
            >
              <Experience />
              {/* <Perf position="bottom-right" /> */}
            </Canvas>
            <LevaControls collapsed />
          </div>
        ) : (
          <Loading />
        )}
      </main>
      <Interface
        isOpened={showInfo}
        hasPing={hasPing}
        onClick={() => {
          setHasPing(false);
          setShowInfo(!showInfo);
        }}
      >
        {children}
      </Interface>
    </StrictMode>
  );
}
