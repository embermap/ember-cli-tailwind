'use strict';

const BroccoliPlugin = require('broccoli-plugin');
const path = require('path');
const fs = require('fs-extra');
const postcss = require('postcss');
const atImport = require('postcss-import');
const tailwind = require('tailwindcss');

module.exports = class BuildTailwindPlugin extends BroccoliPlugin {

  constructor(inputTrees, options) {
    super(inputTrees, options);
    this.srcFile = options.srcFile;
    this.destFile = options.destFile;
  }

  build() {
    let modulesFile = path.join(this.inputPaths[0], this.srcFile);
    let configFile = path.join(this.inputPaths[1], 'tailwind-config.js');
    let outputFile = path.join(this.outputPath, this.destFile);

    return postcss([
      atImport(),
      tailwind(configFile)
    ])
    .process(fs.readFileSync(modulesFile, 'utf-8'), { from: modulesFile })
    .then(result => {
      fs.ensureDirSync(path.dirname(outputFile));
      fs.writeFileSync(outputFile, result.css)
    });
  }

}
