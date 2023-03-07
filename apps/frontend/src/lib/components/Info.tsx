import { useEffect, useState } from "react";
import { useMounted } from "@lib/hooks/useMounted";

export default function Info({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();
  const [is_opened, set_is_opened] = useState(true);

  useEffect(() => {
    const hide_info = () => set_is_opened(false);

    const canvas = document.querySelector("canvas");
    canvas?.addEventListener("mousedown", hide_info);

    return () => canvas?.removeEventListener("mousedown", hide_info);
  }, []);

  return (
    <aside>
      {is_opened && (
        <div
          className="
            bg-surface/80
            fixed bottom-14 m-8 max-h-[50%] max-w-2xl
            animate-[fly-up_0.25s] animate-[fade-in_0.25s]
            overflow-y-auto rounded p-3 drop-shadow
          "
        >
          {children}
        </div>
      )}
      <button
        className={`
          text-bg bg-text
          fixed bottom-8 left-8 h-10 w-10
          animate-[fly-up_0.25s] animate-[fade-in_0.25s]
          rounded-full font-serif
          text-2xl drop-shadow
          ${mounted ? "cursor-help" : "cursor-not-allowed"}
        `}
        aria-label={is_opened ? "Hide info." : "Show Info."}
        onClick={() => set_is_opened(!is_opened)}
      >
        {is_opened ? <span className="text-3xl">&times;</span> : "i"}
      </button>
    </aside>
  );
}
