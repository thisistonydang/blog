import { useEffect, useState } from "react";

import Dialog from "./Dialog";

import type { ReactNode } from "react";

export default function ControlsDialog({
  minWindowHeight,
  children,
}: {
  minWindowHeight: number;
  children: ReactNode;
}) {
  const [overflowY, setOverflowY] = useState(false);

  useEffect(() => {
    function checkOverflow() {
      if (window.innerHeight < minWindowHeight) {
        setOverflowY(true);
      } else {
        setOverflowY(false);
      }
    }

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [minWindowHeight]);

  return (
    <div
      className={`
        fixed bottom-24 mx-8 max-w-2xl
        ${overflowY && "h-1/2 overflow-y-auto"}
    `}
    >
      <Dialog>{children}</Dialog>
    </div>
  );
}
