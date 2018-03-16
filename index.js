'use strict';

const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const BuildTailwindPlugin = require('./lib/build-tailwind-plugin');
const NodeToES6Plugin = require('./lib/node-to-es6-plugin');

module.exports = {
  name: 'ember-cli-tailwind',

  isDevelopingAddon() {
    return true;
  },

  included() {
    this._super.included.apply(this, arguments);

    // For now, we import a static pre-built version of Tailwind that's prefixed
    // with .etw-* (for ember-tailwind), so we can build the styleguide and not conflict with other
    // Tailwind builds.
    this.import('vendor/etw.css');
  },

  preprocessTree(type, tree) {
    let trees = tree ? [ tree ] : [];

    // TODO: there has to be a better way to do this...
    if (type === 'css' && tree._annotation === "TreeMerger (stylesAndVendor)") {
      let tailwindTree = new BuildTailwindPlugin([ tree ]);
      trees.push(tailwindTree);
    }

    return new MergeTrees(trees);
  },

  treeForApp(appTree) {
    let tailwindES6ModulesTree = this._getTailwindES6ModulesTree();

    return new MergeTrees([ appTree, tailwindES6ModulesTree ]);
  },

  // Private

  _getTailwindES6ModulesTree() {
    let tailwindModulesPath = this._getTailwindModulesPath();
    let tailwindNodeModulesTree = this._moveTailwindModules(tailwindModulesPath);
    let tailwindES6ModulesTree = this._convertNodeModulesTreeToES6ModulesTree(tailwindNodeModulesTree);

    return tailwindES6ModulesTree;
  },

  _getTailwindModulesPath() {
    let tailwindModulesPaths = [ this.parent.root ];
    if (this.project.isEmberCLIAddon()) {
      tailwindModulesPaths = tailwindModulesPaths.concat([ 'tests', 'dummy' ]);
    }
    tailwindModulesPaths = tailwindModulesPaths.concat([ 'app', 'styles', 'tailwind' ]);

    return path.join.apply(this, tailwindModulesPaths);
  },

  _moveTailwindModules(tailwindModulesPath) {
    return new Funnel(tailwindModulesPath, {
      exclude: [ 'config' ],
      destDir: 'ember-cli-tailwind'
    });
  },

  _convertNodeModulesTreeToES6ModulesTree(tree) {
    return new NodeToES6Plugin([ tree ]);
  }

};
