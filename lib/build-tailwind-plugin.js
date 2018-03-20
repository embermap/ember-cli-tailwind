'use strict';

const BroccoliPlugin = require('broccoli-plugin');
const path = require('path');
const fs = require('fs-extra');
const postcss = require('postcss');
const tailwind = require('tailwindcss');

module.exports = class BuildTailwindPlugin extends BroccoliPlugin {

  constructor(inputTrees, options) {
    super(inputTrees, options);
    this.basePath = options.basePath;
  }

  build() {
    let configFile = path.join(this.inputPaths[1], 'tailwind-config.js');
    let modulesFile = path.join(this.inputPaths[0], this.basePath, 'tailwind', 'config', 'modules.css');
    let outputFile = path.join(this.outputPath, this.basePath, 'tailwind.css');

    return postcss([tailwind(configFile)])
      .process(fs.readFileSync(modulesFile, 'utf-8'), { from: null })
      .then(result => {
        fs.ensureDirSync(path.dirname(outputFile));
        fs.writeFileSync(outputFile, result.css)
      });
  }

}
