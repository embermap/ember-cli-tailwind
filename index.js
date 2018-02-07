'use strict';

const execSync = require('child_process').execSync;
const BroccoliPlugin = require('broccoli-plugin');
const path = require('path');
const MergeTrees = require('broccoli-merge-trees');

class BuildTailwind extends BroccoliPlugin {

  build() {
    let tailwindBinary = require.resolve('tailwindcss').replace('index.js', 'cli.js');
    let tailwindPath = path.join(this.inputPaths[0], 'app', 'styles', 'tailwind');
    let configFile = path.join(tailwindPath, 'config', 'tailwind.js');
    let modulesFile = path.join(tailwindPath, 'config', 'modules.css');
    let outputFile = path.join(this.outputPath, 'app', 'styles', 'tailwind.css');

    execSync(`${tailwindBinary} build ${modulesFile} -c ${configFile} -o ${outputFile}`);
  }

}

module.exports = {
  name: 'ember-cli-tailwind',

  preprocessTree(type, tree) {
    let trees = tree ? [ tree ] : [];

    if (type === 'css' && tree._annotation === "TreeMerger (stylesAndVendor)") {
      let newTree = new BuildTailwind([ tree ]);
      trees.push(newTree);
    }

    return new MergeTrees(trees);
  }
};
