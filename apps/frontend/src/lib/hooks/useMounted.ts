import { useEffect, useState } from "react";

export function useMounted(): boolean {
  const [mounted, set_mounted] = useState(false);

  useEffect(() => {
    set_mounted(true);

    return () => {
      set_mounted(false);
    };
  }, []);

  return mounted;
}
