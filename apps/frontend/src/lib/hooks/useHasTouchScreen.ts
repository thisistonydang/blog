import { useEffect, useState } from "react";
import { hasTouchScreen } from "./hasTouchScreen";

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
