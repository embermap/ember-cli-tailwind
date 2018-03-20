'use strict';

const fs = require('fs');
const path = require('path');
const Funnel = require('broccoli-funnel');
const Rollup = require('broccoli-rollup');
const MergeTrees = require('broccoli-merge-trees');
const BuildTailwindPlugin = require('./lib/build-tailwind-plugin');

module.exports = {
  name: 'ember-cli-tailwind',

  included(includer) {
    this._super.included.apply(this, arguments);

    if (includer.trees) {
      this.projectType = 'app';
      this.tailwindInputPath = this._getInputPath(this.project.root, includer.trees.styles);
    } else if (includer.treePaths) {
      this.projectType = 'addon';
      this.tailwindInputPath = this._getInputPath(includer.root, includer.treePaths['addon-styles']);
    }
  },

  treeForApp(tree) {
    // Ember CLI doesn't process .js files in app/styles by default
    // (Weirdly, it does process them in addon/styles, so this is only needed for apps)
    if (this.projectType === 'app' && this.tailwindInputPath) {
      return new MergeTrees([
        tree,
        new Funnel(this.tailwindInputPath, {
          destDir: 'styles'
        })
      ]);
    } else {
      return tree;
    }
  },

  preprocessTree(type, tree) {
    if (type === 'css' && !this.hasIncludedTailwind && this.tailwindInputPath) {
      this.hasIncludedTailwind = true;
      return this._buildTailwind(tree);
    } else {
      return tree;
    }
  },

  // Private

  _getInputPath(root, inputPath) {
    if (typeof inputPath !== 'string') {
      this.ui.writeWarnLine('Unable to process Tailwind styles for a non-string tree');
      return;
    }

    let fullPath = path.join(root, inputPath);
    if (fs.existsSync(path.join(fullPath, 'tailwind', 'config', 'tailwind.js'))) {
      return fullPath;
    }
  },

  _buildTailwind(tree) {
    let basePath = this.projectType === 'app' ? 'app/styles' : '';
    let tailwindInput = new Rollup(this.tailwindInputPath, {
      rollup: {
        input: 'tailwind/config/tailwind.js',
        output: {
          file: 'tailwind-config.js',
          format: 'cjs'
        }
      }
    });

    return new MergeTrees([
      new Funnel(tree, {
        exclude: [`${basePath}/tailwind`]
      }),
      new BuildTailwindPlugin([tree, tailwindInput], {
        basePath,
      })
    ]);
  }

};
