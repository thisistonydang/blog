import Stats from "stats.js";
import type { WebGLRenderer } from "three";
import type { Gui } from "./Gui";

export class Statistics {
  // Tweakable controls
  c = {
    showStats: true,
    statsPanel: 0,
  };

  allStatsPanels = [
    "fps",
    "ms",
    "mb",
    "geometries",
    "textures",
    "programs",
    "calls",
    "lines",
    "points",
    "triangles",
  ];

  customPanels: { [key: string]: Stats.Panel } = {};
  stats = new Stats();
  renderer: WebGLRenderer;

  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer;

    // Create custom stats panels
    this.allStatsPanels.slice(3).forEach((panelName) => {
      this.customPanels[panelName] = new Stats.Panel(panelName, "#ff8", "#221");
    });

    // Add custom panels to stats panel
    Object.values(this.customPanels).forEach((panel) =>
      this.stats.addPanel(panel)
    );

    // Add stats panel to DOM
    this.stats.dom.style.display = this.c.showStats ? "block" : "none";
    this.stats.showPanel(this.c.statsPanel);
    document.body.appendChild(this.stats.dom);
  }

  /**
   * Begin stats collection
   */
  begin(): void {
    this.stats.begin();
  }

  /**
   * End stats collection
   */
  end(): void {
    this.stats.end();
  }

  /**
   * Update custom panels with renderer stats
   */
  updateCustomPanels(): void {
    const rendererInfo = this.renderer.info;
    this.customPanels.geometries?.update(rendererInfo.memory.geometries, 50);
    this.customPanels.textures?.update(rendererInfo.memory.textures, 10);
    this.customPanels.programs?.update(rendererInfo.programs?.length ?? 0, 50);
    this.customPanels.calls?.update(rendererInfo.render.calls, 50);
    this.customPanels.lines?.update(rendererInfo.render.lines, 50);
    this.customPanels.points?.update(rendererInfo.render.points, 50);
    this.customPanels.triangles?.update(rendererInfo.render.triangles, 999999);
  }

  updateGui({ devFolder }: Gui): void {
    // Add display toggle for stats panel
    devFolder.add(this.c, "showStats").onChange((showStats: boolean) => {
      this.stats.dom.style.display = showStats ? "block" : "none";
    });

    // Create panel options
    const options: { [key: string]: number } = {};
    this.allStatsPanels.forEach((name, index) => {
      options[name] = index;
    });

    // Add panel options to gui
    devFolder.add(this.c, "statsPanel", options).onChange((panel: number) => {
      this.stats.showPanel(panel);
    });
  }
}
