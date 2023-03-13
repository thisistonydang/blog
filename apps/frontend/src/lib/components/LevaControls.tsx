import { useEffect, useState } from "react";
import { Leva } from "leva";
import Ping from "./Ping";

export default function LevaControls() {
  const [show_ping, set_show_ping] = useState(true);

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
        bg-bg
        xs:right-[calc(15px+16px)] fixed right-4 top-[calc(16px+36px+40px-20px)]
        z-50 h-5 w-[280px]
      "
      onMouseDown={() => set_show_ping(false)}
      onTouchStart={() => set_show_ping(false)}
    >
      <Leva fill collapsed />
      {show_ping && (
        <div className="absolute -left-2 -top-2">
          <Ping />
        </div>
      )}
    </div>
  );
}
