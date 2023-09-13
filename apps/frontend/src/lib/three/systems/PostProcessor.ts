import { WebGLRenderTarget } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import type { World } from "../World";

export class PostProcessor {
  samplesForLowPixelDensity: number;
  samplesForHighPixelDensity: number;
  currentRenderTarget: WebGLRenderTarget;
  effectComposer: EffectComposer;

  constructor(
    world: World,
    samplesForLowPixelDensity = 2,
    samplesForHighPixelDensity = 0,
  ) {
    this.samplesForLowPixelDensity = samplesForLowPixelDensity;
    this.samplesForHighPixelDensity = samplesForHighPixelDensity;

    // Create render target in order to set samples for MSAA anti-aliasing
    this.currentRenderTarget = this.createRenderTarget();

    // Create effect composer
    this.effectComposer = new EffectComposer(
      world.renderer,
      this.currentRenderTarget,
    );

    // Render scene through effect composer
    const renderPass = new RenderPass(world.scene, world.camera);
    this.effectComposer.addPass(renderPass);
  }

  createRenderTarget(): WebGLRenderTarget {
    const renderTarget = new WebGLRenderTarget(undefined, undefined, {
      samples:
        Math.min(window.devicePixelRatio, 2) === 1
          ? this.samplesForLowPixelDensity
          : this.samplesForHighPixelDensity,
    });

    return renderTarget;
  }

  resetRenderTarget(): void {
    const newRenderTarget = this.createRenderTarget();
    this.effectComposer.reset(newRenderTarget);

    // Dispose old render target and remember the new target
    this.currentRenderTarget.dispose();
    this.currentRenderTarget = newRenderTarget;
  }

  render(): void {
    this.effectComposer.render();
  }
}
