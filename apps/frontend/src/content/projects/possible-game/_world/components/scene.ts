import { Color } from "three";

import { theme } from "@layouts/page/_stores/theme";

import type { Scene } from "three";
import type { App } from "../App";

export function scene(app: App): Scene {
  const scene: Scene = app.scene;

  const lightColor = new Color(0xffffff);
  const darkColor = new Color(0x18181b);

  // Sync scene background with theme
  theme.subscribe((theme) => {
    scene.background = theme === "dark" ? darkColor : lightColor;
    app.requestRender();
  });

  return scene;
}
