import { get } from "svelte/store";

import { Mesh, MeshBasicMaterial } from "three";
import font from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";

import { theme } from "@layouts/page/_stores/theme";

import { playerImage } from "../../_stores/appState";

export function finishText(): Mesh {
  // Create mesh
  const geometry = new TextGeometry("FINISH", {
    font: new Font(font),
    size: 3,
    height: 1,
    curveSegments: 5,
  });
  const material = new MeshBasicMaterial();
  const finishText = new Mesh(geometry, material);
  finishText.position.set(get(playerImage) ? 291.3 : 293, -12.25, 0);

  // Sync finish text color with theme
  theme.subscribe((theme) => {
    material.color.set(theme === "dark" ? 0xffffff : 0x000000);
  });

  return finishText;
}
