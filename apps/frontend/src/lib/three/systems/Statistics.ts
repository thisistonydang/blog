import Stats from "stats.js";
import type { WebGLRenderer } from "three";

// Create custom stats panels
const panelNames = [
  "geometries",
  "textures",
  "programs",
  "calls",
  "lines",
  "points",
  "triangles",
];
const customPanels: { [key: string]: Stats.Panel } = {};
panelNames.forEach((name) => {
  customPanels[name] = new Stats.Panel(name, "#ff8", "#221");
});

export class Statistics {
  renderer: WebGLRenderer;
  stats: Stats;

  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer;
    this.stats = new Stats();

    // Add custom panels to stats panel
    Object.values(customPanels).forEach((panel) => this.stats.addPanel(panel));

    // Add stats panel to DOM
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }

  begin() {
    this.stats.begin();
  }

  end() {
    this.stats.end();
  }

  updateCustomPanels() {
    customPanels.geometries?.update(this.renderer.info.memory.geometries, 50);
    customPanels.textures?.update(this.renderer.info.memory.textures, 10);
    customPanels.programs?.update(this.renderer.info.programs?.length ?? 0, 50);
    customPanels.calls?.update(this.renderer.info.render.calls, 50);
    customPanels.lines?.update(this.renderer.info.render.lines, 50);
    customPanels.points?.update(this.renderer.info.render.points, 50);
    customPanels.triangles?.update(this.renderer.info.render.triangles, 999999);
  }
}
