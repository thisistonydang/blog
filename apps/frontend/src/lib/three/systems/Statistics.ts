import Stats from "stats.js";
import type { UpdateGui } from "../types/Patched";
import type { World } from "../World";

interface Controls {
  showStats: boolean;
  statsPanel: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export class Statistics {
  c: Controls = {
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
  world: World;

  constructor(world: World) {
    this.world = world;

    // Create custom stats panels
    this.allStatsPanels.slice(3).forEach((panelName) => {
      this.customPanels[panelName] = new Stats.Panel(panelName, "#ff8", "#221");
    });

    // Add custom panels to stats panel
    Object.values(this.customPanels).forEach((panel) =>
      this.stats.addPanel(panel)
    );

    // Update panel styles
    this.stats.dom.style.display = this.c.showStats ? "block" : "none";
    this.stats.dom.style.position = "absolute";

    // Add stats panel to DOM
    this.stats.showPanel(this.c.statsPanel);
    const container = document.getElementById("stats") ?? document.body;
    container.appendChild(this.stats.dom);
  }

  /**
   * Update custom panels with renderer stats
   */
  updateCustomPanels(): void {
    const rendererInfo = this.world.renderer.info;
    this.customPanels.geometries?.update(rendererInfo.memory.geometries, 50);
    this.customPanels.textures?.update(rendererInfo.memory.textures, 10);
    this.customPanels.programs?.update(rendererInfo.programs?.length ?? 0, 50);
    this.customPanels.calls?.update(rendererInfo.render.calls, 50);
    this.customPanels.lines?.update(rendererInfo.render.lines, 50);
    this.customPanels.points?.update(rendererInfo.render.points, 50);
    this.customPanels.triangles?.update(rendererInfo.render.triangles, 999999);
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
    this.updateCustomPanels();
  }

  updateGui: UpdateGui = ({ devFolder }) => {
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
  };
}
