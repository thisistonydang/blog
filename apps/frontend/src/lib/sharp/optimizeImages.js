// @ts-check

import { glob } from "glob";
import sharp from "sharp";

/**
 * Optimize an image to given width.
 *
 * @param {string} imgFilePath
 * @param {960 | 1200} width
 * @param {"light" | "dark"} theme
 */
function optimizeImage(imgFilePath, width, theme) {
  const matches = imgFilePath.match(/[\dA-Za-z-]+\.jpg/);
  if (matches) {
    const filename = matches[0];
    const output = `public/og/${theme}/dist/${width}/${filename}`;

    // TODO: clean dist folder before writing new files.

    sharp(imgFilePath)
      .resize({ width })
      .toFile(output, function (err) {
        if (err) {
          console.log({ err });
        } else {
          console.log({ output });
        }
      });
  }
}

/**
 * Create and optimize open graph (OG) images.
 *
 * @param {"light" | "dark"} theme
 * @param {960 | 1200} width
 */
async function optimizeImages(theme, width) {
  // Get images to optimize
  const imgFilePaths = await glob(`public/og/${theme}/*.jpg`);
  console.log("imgFilePaths:", imgFilePaths);

  // Optimize images.
  imgFilePaths.forEach((imgFilePath) => {
    optimizeImage(imgFilePath, width, theme);
  });
}

await optimizeImages("light", 960);
await optimizeImages("light", 1200);
await optimizeImages("dark", 960);
await optimizeImages("dark", 1200);
