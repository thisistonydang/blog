import { useEffect, useState } from "react";
import { Leva } from "leva";
import Ping from "./Ping";

export default function LevaControls({ collapsed = false }) {
  const [ping, setPing] = useState(true);

  // Temp a11y fix. TODO: Make PR to Leva.
  useEffect(() => {
    const input = document.querySelector(
      'input[placeholder="[Open filter with CMD+SHIFT+L]"]'
    );
    if (input) input.ariaLabel = "Search";
  }, []);

  return (
    <div
      className="
        xs:right-[calc(15px+16px)]
        fixed right-4 top-[calc(16px+36px+40px-20px)] z-[99]
        h-5 w-[280px] bg-transparent
      "
      onMouseDown={() => setPing(false)}
      onTouchStart={() => setPing(false)}
    >
      <Leva fill collapsed={collapsed} />
      {collapsed && ping && (
        <div className="absolute -left-2 -top-2">
          <Ping />
        </div>
      )}
    </div>
  );
}
