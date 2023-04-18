import { useContext, useEffect, useRef } from "react";
import { Matrix4 } from "three";

import { CurrentProblemContext } from "../_context/CurrentProblemContext";
import { updateLocalStorage } from "../_hooks/useSyncLocalStorage";
import { BOARD_THICKNESS, HOLD_SPACING } from "../_lib/constants/constants.js";
import { planeGeometry } from "../_lib/geometries/planeGeometry";

import type { ThreeEvent } from "@react-three/fiber";
import type { Dispatch, SetStateAction } from "react";
import type { InstancedMesh } from "three";
import type { Hold } from "../_lib/types/Hold";

const matrix4 = new Matrix4();

export default function InteractivePlanes({
  holds,
  xStart,
  yStart,
  setHoverIndicator,
}: {
  holds: Hold[];
  xStart: number;
  yStart: number;
  setHoverIndicator: Dispatch<
    SetStateAction<{
      visible: boolean;
      xPosition: number;
      yPosition: number;
    }>
  >;
}) {
  const { currentProblem, setCurrentProblem } = useContext(
    CurrentProblemContext
  );
  const instancedMesh = useRef<InstancedMesh>(null);
  const HOLD_IDS_KEY = "hold_ids";

  useEffect(() => {
    if (!instancedMesh.current) return;

    // Associate a hold id with each instance
    instancedMesh.current.userData[HOLD_IDS_KEY] = holds.map(({ id }) => id);

    // Set instance position
    holds.forEach((hold, index) => {
      if (!instancedMesh.current) return;

      matrix4.makeScale(HOLD_SPACING, HOLD_SPACING, 1);
      matrix4.setPosition(
        xStart + hold.xOffset,
        yStart + hold.yOffset,
        BOARD_THICKNESS / 2
      );
      instancedMesh.current.setMatrixAt(index, matrix4);
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    });
  }, [holds, xStart, yStart]);

  function handleClick(e: ThreeEvent<MouseEvent>): void {
    if (e.instanceId === undefined) return;
    const holdId = e.eventObject.userData[HOLD_IDS_KEY][e.instanceId];

    const newProblem = {
      name: "",
      grade: -1,
      start: [...currentProblem.start],
      middle: [...currentProblem.middle],
      footOnly: [...currentProblem.footOnly],
      finish: [...currentProblem.finish],
    };

    let holdPositionType = "unselected";

    if (currentProblem.start.includes(holdId)) {
      holdPositionType = "start";
    } else if (currentProblem.middle.includes(holdId)) {
      holdPositionType = "middle";
    } else if (currentProblem.footOnly.includes(holdId)) {
      holdPositionType = "footOnly";
    } else if (currentProblem.finish.includes(holdId)) {
      holdPositionType = "finish";
    }

    switch (holdPositionType) {
      case "unselected":
        if (currentProblem.start.length < 2) {
          // Add start hold
          newProblem.start.push(holdId);
        } else {
          // Add middle hold
          newProblem.middle.push(holdId);
        }
        break;

      case "start":
        // Remove start hold and add middle hold
        newProblem.start = newProblem.start.filter((id) => id !== holdId);
        newProblem.middle.push(holdId);
        break;

      case "middle":
        // Remove middle hold and add footOnly hold
        newProblem.middle = newProblem.middle.filter((id) => id !== holdId);
        newProblem.footOnly.push(holdId);
        break;

      case "footOnly":
        // Remove footOnly hold
        newProblem.footOnly = newProblem.footOnly.filter((id) => id !== holdId);
        if (currentProblem.finish.length < 2) {
          // Add finish hold
          newProblem.finish.push(holdId);
        }
        break;

      case "finish":
        // Remove finish hold
        newProblem.finish = newProblem.finish.filter((id) => id !== holdId);
        break;
    }

    updateLocalStorage(["problem", newProblem]);
    setCurrentProblem(newProblem);
  }

  return (
    <instancedMesh
      ref={instancedMesh}
      args={[planeGeometry, undefined, holds.length]}
      visible={false}
      onClick={handleClick}
      onPointerEnter={(e) => {
        if (e.instanceId === undefined) return;
        const hold = holds[e.instanceId] as Hold;

        document.body.style.cursor = "pointer";
        setHoverIndicator({
          visible: true,
          xPosition: xStart + hold.xOffset,
          yPosition: yStart + hold.yOffset,
        });
      }}
      onPointerOut={(e) => {
        if (e.instanceId === undefined) return;
        const hold = holds[e.instanceId] as Hold;

        document.body.style.cursor = "default";
        setHoverIndicator({
          visible: false,
          xPosition: xStart + hold.xOffset,
          yPosition: yStart + hold.yOffset,
        });
      }}
    ></instancedMesh>
  );
}
