import RAPIER from "@dimforge/rapier2d-compat";
import { get } from "svelte/store";
import { MathUtils, Mesh, MeshBasicMaterial, Texture } from "three";

import { theme } from "@layouts/page/_stores/theme";

import { boxGeometry } from "@lib/three/geometries/box";
import { addMesh } from "@lib/three/systems/Physics/2D/addMesh";
import { cuboidColliderDesc } from "@lib/three/systems/Physics/2D/cuboidColliderDesc";

import { gameState, playerImage } from "../../_stores/appState";

import type { BoxGeometry } from "three";
import type { Physics2D } from "@lib/three/systems/Physics/Physics2D";
import type { Patched } from "@lib/three/types/Patched";
import type { App } from "../App";

export function player(app: App): Mesh {
  const playerHeight = 1;
  const image = get(playerImage);
  let map: Texture | undefined;

  // State
  let playerState: "grounded" | "aerial" | "dead" = "grounded";
  let rotationY = 0;

  // Load player image as texture if available
  if (image) {
    map = new Texture(image);
    map.needsUpdate = true;
  }

  // Create mesh
  const material = new MeshBasicMaterial({ map, wireframe: !image });
  const player: Mesh<BoxGeometry> & Patched = new Mesh(boxGeometry, material);
  // start: 0, pre-stairs: 115, pre-drop: 213
  player.position.set(0, playerHeight / 2, 0);
  player.name = "player";

  // Add physics
  player.addPhysics2D = (physics) => {
    addMesh({
      physics,
      mesh: player,
      rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
      gravityScale: 1.5,
      lockRotations: true,
      colliderDesc: cuboidColliderDesc(player),
      activeEvents: RAPIER.ActiveEvents.COLLISION_EVENTS,
    });
  };

  player.onCollisionEnter = (_, { id }) => {
    // Stop game if player hits a trap
    if (id.includes("trap")) {
      playerState = "dead";
      app.stopGame();
    }

    // Update cameraHeight state if player is on second-to-last or last platform
    if (id === "second-to-last-platform") {
      app.cameraHeight = "follow_player_y";
    } else if (id === "last-platform") {
      app.cameraHeight = "end";
    }
  };

  player.onCollisionExit = () => {
    // Set player state to aerial when not in contact with anything
    playerState = "aerial";
  };

  player.onContactsWith = (_, { id }) => {
    // Set player state to grounded while in contact with platforms
    if (id.includes("platform")) {
      playerState = "grounded";
    }
  };

  player.tickOnWorldStart = () => {
    // If player is grounded, slide the player at a constant linear velocity.
    if (playerState === "grounded") {
      const physicsBody = (app.physics as Physics2D).meshMap.get(player);
      physicsBody?.rigidBody.setLinvel({ x: 6, y: 0 }, true);
    }

    // Spin player if player rotation does not equal current rotationY value
    if (!image) {
      player.rotation.y = MathUtils.lerp(player.rotation.y, rotationY, 0.075);
    }

    // End game if player is past finishEnd checkpoint and game hasn't ended
    if (
      player.position.x > app.checkpoints.finishEnd &&
      get(gameState) !== "ended"
    ) {
      app.endGame();
    }

    // Stop render loop to prevent unnessary renders after player is offscreen
    if (player.position.x > app.checkpoints.offscreen) {
      app.stop();
    }
  };

  player.userData.jump = () => {
    // Don't jump if player is not grounded nor if player has passed the
    // finishStart checkpoint.
    if (
      playerState !== "grounded" ||
      player.position.x > app.checkpoints.finishStart
    ) {
      return;
    }

    // Jump!
    const physicsBody = (app.physics as Physics2D).meshMap.get(player);
    physicsBody?.rigidBody.applyImpulse({ x: 0, y: 7 }, true);

    // Spin!
    rotationY = rotationY + Math.PI;
  };

  // Reset player on restart
  player.userData.reset = () => {
    // Reset player position
    player.position.set(0, playerHeight / 2, 0);
    const physicsBody = (app.physics as Physics2D).meshMap.get(player);
    physicsBody?.rigidBody.setTranslation({ x: 0, y: playerHeight / 2 }, true);

    // Reset player state
    playerState = "grounded";

    // Reset player rotation
    rotationY = 0;
    player.rotation.y = 0;
  };

  // Sync player color with theme
  if (!image) {
    theme.subscribe((theme) => {
      material.color.set(theme === "dark" ? 0x00ffff : 0x006161);
    });
  }

  return player;
}
