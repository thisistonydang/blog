import {
  CRASH_PAD_HEIGHT,
  MAX_BOARD_HEIGHT,
} from "../_lib/constants/constants";

// For Development
// import { useHelper } from "@react-three/drei";
// import { useThree } from "@react-three/fiber";
// import { useEffect, useRef } from "react";
// import { useControls } from "leva";
// import { CameraHelper, DirectionalLight } from "three";
// import { DirectionalLightHelper } from "three";

export default function ShadowDirectionalLight() {
  // const directionalLight = useRef<DirectionalLight>(null);

  // const c = useControls("directionalLight", {
  //   intensity: { value: 1, min: 0, max: 50, step: 0.1 },
  //   x: { value: 0, min: -50, max: 50, step: 0.1 },
  //   y: { value: MAX_BOARD_HEIGHT, min: -50, max: 50, step: 0.1 },
  //   z: { value: 0, min: -50, max: 50, step: 0.1 },
  //   top: { value: 15, min: -100, max: 100, step: 0.1 },
  //   right: { value: -15, min: -100, max: 100, step: 0.1 },
  //   bottom: { value: -15, min: -100, max: 100, step: 0.1 },
  //   left: { value: 15, min: -100, max: 100, step: 0.1 },
  // });

  // const { scene } = useThree();

  // useHelper(directionalLight, DirectionalLightHelper, 1);

  // useEffect(() => {
  //   if (!directionalLight.current) return;

  //   const directionalLightCameraHelper = new CameraHelper(
  //     directionalLight.current.shadow.camera
  //   );
  //   scene.add(directionalLightCameraHelper);

  //   return () => {
  //     scene.remove(directionalLightCameraHelper);
  //     directionalLightCameraHelper.dispose();
  //   };
  // }, [scene, c]);

  return (
    <directionalLight
      // ref={directionalLight}
      position={[0, MAX_BOARD_HEIGHT, 0]}
      castShadow
      shadow-camera-near={MAX_BOARD_HEIGHT - (CRASH_PAD_HEIGHT + 1)}
      shadow-camera-far={MAX_BOARD_HEIGHT + 2}
      shadow-camera-top={15}
      shadow-camera-right={-15}
      shadow-camera-bottom={-15}
      shadow-camera-left={15}
      shadow-mapSize={[64, 64]}
    />
  );
}
