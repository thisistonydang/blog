import { MathUtils, OrthographicCamera, PerspectiveCamera } from "three";

import type { Patched } from "@lib/three/types/Patched";
import type { App } from "../App";

export function camera(app: App): OrthographicCamera {
  // Get camera from app
  const camera: (OrthographicCamera | PerspectiveCamera) & Patched = app.camera;
  if (!(camera instanceof OrthographicCamera)) {
    throw Error("Camera is not an OrthographicCamera.");
  }

  // Remember camera starting position in order to reset it when restarting game
  const cameraStartPosition = camera.position.clone();

  let playerToCameraVerticalDistance: number;
  let cameraEndHeight: number;

  // Control camera position while game is running
  camera.tickOnWorldStart = () => {
    // Stop following player at finish screen
    if (camera.position.x > app.checkpoints.finishStart) {
      return;
    }

    // Follow player horizontal position
    camera.position.x = app.player.position.x;

    // Adjust camera height when cameraHeight state changes
    switch (app.cameraHeight) {
      // Follow the player's vertical height while keeping the vertical distance
      // between them constant.
      case "follow_player_y":
        if (!playerToCameraVerticalDistance) {
          playerToCameraVerticalDistance =
            app.player.position.y - camera.position.y;
        }
        camera.position.y =
          app.player.position.y - playerToCameraVerticalDistance;
        break;

      // Move camera to above the player with the same height difference the
      // camera was at from the beginning of the game.
      case "end":
        if (!cameraEndHeight) {
          cameraEndHeight =
            app.player.position.y - app.player.scale.y + cameraStartPosition.y;
        }
        camera.position.y = MathUtils.lerp(
          camera.position.y,
          cameraEndHeight,
          0.05
        );
        break;
    }
  };

  // Reset camera position and cameraHeight state
  camera.userData.reset = () => {
    camera.position.copy(cameraStartPosition);
    app.cameraHeight = "start";
  };

  return camera;
}
