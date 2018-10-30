'use strict';

const BroccoliPlugin = require('broccoli-caching-writer');
const path = require('path');
const fs = require('fs-extra');
const postcss = require('postcss');
const easyImport = require('postcss-easy-import');
const tailwind = require('tailwindcss');
const Rollup = require('broccoli-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

/*
  Pass in an addon instance.
*/
module.exports = function(addon) {
  let tailwindAddon;
  if (addon.pkg.name === 'ember-cli-tailwind') {
    tailwindAddon = addon;
  } else {
    tailwindAddon = addon.findOwnAddonByName('ember-cli-tailwind');
  }
  let inputPath = tailwindAddon.tailwindInputPath;

  let tailwindConfigTree = new Rollup(inputPath, {
    rollup: {
      input: 'config/tailwind.js',
      output: {
        file: 'tailwind-config.js',
        format: 'cjs'
      },
      plugins: [
        resolve(),
        commonjs()
      ]
    }
  });

  return new BuildTailwindPlugin([ inputPath, tailwindConfigTree ], {
    srcFile: 'modules.css',
    cacheInclude: [/.*\.(js|css)$/]
  });
}

class BuildTailwindPlugin extends BroccoliPlugin {

  constructor(inputTrees, options) {
    super(inputTrees, options);
    this.srcFile = options.srcFile;
    this.didBuild = options.didBuild;
  }

  build() {
    let modulesFile = path.join(this.inputPaths[0], this.srcFile);
    let configFile = path.join(this.inputPaths[1], 'tailwind-config.js');
    let outputFile = path.join(this.outputPath, 'tailwind.css');

    return postcss([
      easyImport,
      tailwind(configFile)
    ])
    .process(fs.readFileSync(modulesFile, 'utf-8'), { from: modulesFile })
    .then(result => {
      fs.ensureDirSync(path.dirname(outputFile));
      fs.writeFileSync(outputFile, result.css)
    });
  }

}
