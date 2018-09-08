const path = require('path');
const fs = require('fs-extra');
const BroccoliPlugin = require('broccoli-plugin');

module.exports = class CopyTailwindBuildPlugin extends BroccoliPlugin {

  constructor(inputTrees, project) {
    super(inputTrees);

    this.project = project;
  }

  build() {
    let outputFile = path.join(this.outputPath, 'tailwind.css');
    let tailwindFile = this.project.findOwnAddonByName('ember-cli-tailwind').tailwindOutputFile;
    let tailwindCSS = fs.readFileSync(tailwindFile, 'utf-8');

    fs.writeFileSync(outputFile, tailwindCSS);
  }
}
