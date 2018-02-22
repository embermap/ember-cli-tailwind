'use strict';

const execSync = require('child_process').execSync;
const BroccoliPlugin = require('broccoli-plugin');
const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
// const stew = require('broccoli-stew');
// const log = stew.log;
// const map = stew.map;
const fs = require('fs');
const Funnel = require('broccoli-funnel');
const stringUtils = require("ember-cli-string-utils");

class MyPlugin extends BroccoliPlugin {
  constructor(inputNodes, memo) {
    super(inputNodes);

    this.memo = memo;
  }

  build() {
    let tailwindBinary = require.resolve('tailwindcss').replace('index.js', 'cli.js');
    let tailwindPath = path.join(this.inputPaths[0], 'app', 'styles', 'tailwind');
    let configFile = path.join(tailwindPath, 'config', 'tailwind.js');
    let modulesFile = path.join(tailwindPath, 'config', 'modules.css');
    let outputFile = path.join(this.outputPath, 'app', 'styles', 'tailwind.css');

    execSync(`${tailwindBinary} build ${modulesFile} -c ${configFile} -o ${outputFile}`);
  }
}

class AnotherPlugin extends BroccoliPlugin {
  build() {
    let modulesPath = path.join(this.inputPaths[0], 'ember-cli-tailwind');
    let modules = fs.readdirSync(modulesPath);

    let data = modules.reduce((data, moduleName) => {
      let modulePath = path.join(modulesPath, moduleName)
      let contents = require(modulePath);
      let key = stringUtils.camelize(moduleName.replace('.js', ''));

      data[key] = contents;

      delete require.cache[require.resolve(modulePath)]

      return data;
    }, {});

    let dataString = JSON.stringify(data);
    let outputPath = path.join(this.outputPath, 'ember-cli-tailwind');
    fs.mkdirSync(outputPath);
    fs.writeFileSync(path.join(outputPath, 'modules.js'), `export default ${dataString}`);
  }
}

module.exports = {
  name: 'ember-cli-tailwind',

  isDevelopingAddon() {
    return true;
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/etw.css');
  },

  treeForApp(tree) {
    let trees = [ tree ];

    let tailwindModulesPaths = [ this.parent.root ];
    if (this.project.isEmberCLIAddon()) {
      tailwindModulesPaths = tailwindModulesPaths.concat([ 'tests', 'dummy' ]);
    }
    tailwindModulesPaths = tailwindModulesPaths.concat([ 'app', 'styles', 'tailwind' ]);
    let tailwindModulesPath = path.join.apply(this, tailwindModulesPaths);
    let tailwindNodeModulesTree = new Funnel(tailwindModulesPath, {
      exclude: [ 'config' ],
      destDir: 'ember-cli-tailwind'
    });

    let tailwindES6Modules = new AnotherPlugin([ tailwindNodeModulesTree ]);
    trees.push(tailwindES6Modules);

    return new MergeTrees(trees);
  },

  preprocessTree(type, tree) {
    let trees = tree ? [ tree ] : [];

    if (type === 'css' && tree._annotation === "TreeMerger (stylesAndVendor)") {
      let newTree = new MyPlugin([ tree ], this.memo);
      trees.push(newTree);
    }

    return new MergeTrees(trees);
  }

};
