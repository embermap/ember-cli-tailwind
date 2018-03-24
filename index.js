'use strict';

const fs = require('fs');
const path = require('path');
const Rollup = require('broccoli-rollup');
const BuildTailwindPlugin = require('./lib/build-tailwind-plugin');

module.exports = {
  name: 'ember-cli-tailwind',

  included(includer) {
    this._super.included.apply(this, arguments);

    this.import('vendor/etw.css');

    if (includer.trees) {
      this.projectType = 'app';
      this.tailwindInputPath = this._getInputPath(this.project.root, includer.trees.app);
    } else if (includer.treePaths) {
      this.projectType = 'addon';
      this.tailwindInputPath = this._getInputPath(includer.root, includer.treePaths.addon);
    }
  },

  treeForStyles() {
    if (this.projectType === 'app' && this._hasTailwindConfig()) {
      return this._buildTailwind();
    }
  },

  treeForAddonStyles() {
    if (this.projectType === 'addon' && this._hasTailwindConfig()) {
      return this._buildTailwind();
    }
  },

  // Private

  _getInputPath(root, inputPath) {
    if (typeof inputPath !== 'string') {
      this.ui.writeWarnLine('Unable to process Tailwind styles for a non-string tree');
      return;
    }

    let fullPath = path.join(root, inputPath, 'tailwind');
    if (fs.existsSync(path.join(fullPath, 'config', 'tailwind.js'))) {
      return fullPath;
    }
  },

  _hasTailwindConfig() {
    return this.tailwindInputPath;
  },

  _buildTailwind() {
    let basePath = this.projectType === 'app' ? 'app/styles' : '';
    let tailwindConfig = new Rollup(this.tailwindInputPath, {
      rollup: {
        input: 'config/tailwind.js',
        output: {
          file: 'tailwind-config.js',
          format: 'cjs'
        }
      }
    });

    return new BuildTailwindPlugin([this.tailwindInputPath, tailwindConfig], {
      srcFile: path.join('config', 'modules.css'),
      destFile: path.join(basePath, 'tailwind.css')
    });
  }

};
