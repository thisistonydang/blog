import { useEffect } from "react";
import { Leva } from "leva";

export default function Controls() {
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
    >
      <Leva fill collapsed />
    </div>
  );
}
