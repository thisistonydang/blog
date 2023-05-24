import { useEffect, useState } from "react";
import { useHasTouchScreen as hasTouchScreen } from "@lib/hooks/useHasTouchScreen";

/**
 * Returns whether user device has a touch screen.
 */
export function useHasTouchScreen() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(hasTouchScreen());
  }, []);

  return touch;
}
