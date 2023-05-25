import { useState } from "react";

import Dialog from "@lib/react/components/Dialog";
import IconButton from "@lib/react/components/IconButton";
import Prose from "@lib/react/components/Prose";

export default function Interface({ children }: { children: React.ReactNode }) {
  const [hasPing, setHasPing] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <aside>
      {showInfo ? (
        <Dialog
          isModal
          isProse
          hasPadding
          buttonText="CLOSE"
          onButtonClick={(e) => {
            e.preventDefault();
            setShowInfo(false);
          }}
        >
          <div className="mb-5">{children}</div>
        </Dialog>
      ) : (
        <div
          className="
          fixed bottom-8 left-8 flex
          animate-[fade-in_0.25s] animate-[fly-up_0.25s]
          items-center gap-4
        "
        >
          <IconButton
            ariaLabel="Show Info."
            hasPing={hasPing}
            onClick={() => {
              setHasPing(false);
              setShowInfo(true);
            }}
          >
            i
          </IconButton>
          <Prose>
            <h1>Particles</h1>
          </Prose>
        </div>
      )}
    </aside>
  );
}
