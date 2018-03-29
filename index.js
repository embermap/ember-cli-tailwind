'use strict';

const fs = require('fs');
const path = require('path');
const Rollup = require('broccoli-rollup');
const BuildTailwindPlugin = require('./lib/build-tailwind-plugin');

const buildDestinations = {
  dummy: {
    path: 'tests/dummy/app',
    type: 'app'
  },
  app: {
    path: 'app',
    type: 'app'
  },
  addon: {
    path: 'addon',
    type: 'addon'
  }
};

const validBuildTargets = Object.keys(buildDestinations);

module.exports = {
  name: 'ember-cli-tailwind',

  isAddon() {
    const keywords = this.project.pkg.keywords;
    return (keywords && keywords.indexOf('ember-addon') !== -1);
  },

  included(includer) {
    this._super.included.apply(this, arguments);
    
    let buildTarget = includer.options['ember-cli-tailwind']['buildTarget'];
    }
    let buildConfig = buildDestinations[buildTarget];
    
    this.import('vendor/etw.css');
    
    this.projectType = buildConfig.type;
    this.tailwindInputPath = this._getInputPath(this.project.root, buildConfig.path);
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
