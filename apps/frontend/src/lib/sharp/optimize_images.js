// @ts-check

// Example cmd: pnpm opt-img og 1200

import { glob } from "glob";
import sharp from "sharp";

// Public directory to optimize
const directory = process.argv[2];
console.log("directory:", directory);

// Width to resize images
const width = parseInt(process.argv[3]);
console.log("width:", width);

// Get images to optimize
const imgs = await glob(`public/${directory}/*.jpg`);
console.log("imgs:", imgs);

function optimize_img(img, width) {
  const filename = img.match(/[\dA-Za-z-]+\.jpg/)[0];
  const output = `public/${directory}/dist/${width}/${filename}`;

  // TODO: clean dist folder before writing new files

  sharp(img)
    .resize({ width })
    .toFile(output, function (err) {
      if (err) {
        console.log({ err });
      } else {
        console.log({ output });
      }
    });
}

// Optimize images
imgs.forEach((img) => {
  optimize_img(img, width);
});
