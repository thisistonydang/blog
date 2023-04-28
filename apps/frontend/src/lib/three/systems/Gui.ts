import GUI from "lil-gui";
import { isPatched } from "../types/Patched";

import type { Object3D } from "three";

export class Gui {
  gui = new GUI();
  togglesFolder: GUI;
  folders: { [key: string]: boolean } = {};
  tweakables: Object3D[] = [];

  constructor() {
    this.togglesFolder = this.gui.addFolder("folder toggles");
  }

  init(): void {
    this.tweakables.forEach((object) => {
      if (isPatched(object) && "updateGui" in object) {
        object.updateGui(this.createFolder);
      }
    });
  }

  createFolder = (name: string, showFolder: boolean): GUI => {
    // Create folder
    const folder = this.gui.addFolder(name);
    folder.show(showFolder);

    // Create folder toggle
    this.folders[name] = showFolder;
    this.togglesFolder
      .add(this.folders, name)
      .onChange(() => folder.show(folder._hidden));

    return folder;
  };
}
