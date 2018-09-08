'use strict';

const path = require('path');
const BroccoliPlugin = require('broccoli-plugin');
const Merge = require('broccoli-merge-trees');
const fs = require('fs-extra');

module.exports = {
  name: 'sample-addon',

  config(env, baseConfig) {
    return Object.assign({}, baseConfig, {
      'ember-cli-tailwind': {
        shouldIncludeStyleguide: false
      }
    });
  },

  treeForAddonStyles(tree) {
    let trees = tree ? [ tree ] : [];

    trees.push(new AddFilePlugin([ tree ], this));

    return new Merge(trees);
  }
};


class AddFilePlugin extends BroccoliPlugin {

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
