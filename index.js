'use strict';

const execSync = require('child_process').execSync;
const BroccoliPlugin = require('broccoli-plugin');
const fs = require('fs');
const path = require('path');
const log = require('broccoli-stew').log;

// class MyPlugin extends BroccoliPlugin {

class MyPlugin extends BroccoliPlugin {

  // constructor(trees, addon) {
  //   super(trees, addon);
  //
  //   debugger;
  //   this.addon = addon;
  // }

  build() {
    // console.log(...arguments);
    // console.log(addon);
    // debugger;
    // console.log(this.inputPaths);
    // let configPath = path.join(this.inputPaths[0], 'assets', 'tailwind', 'config.js');
    // let colorsPath = path.join(this.inputPaths[0], 'assets', 'tailwind', 'colors.js');
    // let colors = fs.readFileSync(colorsPath, 'utf8');
    // let colors = require(colorsPath);
    // console.log(colors.white);

    // fs.writeFileSyn
    // let configPath = path.join(this.inputPaths[0], 'assets', 'tailwind', 'config.js');
    // debugger;
    // let configPath = path.join(__dirname, 'tests', 'dummy', 'app', 'styles', 'tailwind', 'config.js');
    // execSync(`./node_modules/.bin/tailwind build lib/modules.css -c ${configPath} -o vendor/tailwind.css`);
    // execSync(`./node_modules/.bin/tailwind build lib/modules.css -c ${configPath} -o ${this.outputPath}/tailwind.css`);
    // execSync(`./node_modules/.bin/tailwind build lib/modules.css -c lib/tailwind.js -o ${this.outputPath}/tailwind.css`);
    // execSync(`./node_modules/.bin/tailwind build lib/modules.css -c tests/dummy/app/styles/tailwind.js -o ${this.outputPath}/tailwind.css`);

    /*
      Attempt #1: Call this in treeForVendor
    */
    let configPath = path.join(__dirname, 'tests', 'dummy', 'app', 'styles', 'tailwind', '_config.js');
    execSync(`./node_modules/.bin/tailwind build lib/modules.css -c ${configPath} -o ${this.outputPath}/tailwind.css`);

    // Need to copy everything from inputPaths to outputPath

    // fs.rmdirSync(this.outputPath); fs.symlinkSync(this.inputPaths[0], this.outputPath, 'dir');
  }

}

module.exports = {
  name: 'ember-cli-tailwind',

  // treeForStyles(tree) {
  //   new MyPlugin([]);
  //   // return new MyPlugin([ tree ]);
  //   return tree;
  // },

  treeForVendor(tree) {
    // this.__foo = 'bar';
    // console.log('here');
    tree = new MyPlugin([ tree ]);
    // this.__vendorPath = tree
    // debugger;
    // console.log(this);
    return tree;
  },

  // postprocessTree: function (type, tree) {
  //   // if (type === 'all' && this.options.enabled) {
  //   // console.log(type);
  //   if (type === 'css') {
  //     tree = new MyPlugin([ tree ], this);
  //     // tree = log(tree);
  //     // tree = assetRev(tree, this.options);
  //   }
  //
  //   return tree;
  // },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/foo.css');
    app.import('vendor/tailwind.css');
  }

};
