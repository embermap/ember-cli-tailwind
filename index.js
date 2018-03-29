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

  included(includer) {
    this._super.included.apply(this, arguments);

    let buildTarget = includer.options &&
      includer.options['ember-cli-tailwind'] &&
      includer.options['ember-cli-tailwind']['buildTarget'];

    if (!this._validateBuildTarget(buildTarget, includer)) {
      return;
    }
    
    let buildConfig = buildDestinations[buildTarget];
    
    this.import('vendor/etw.css');
    
    this.projectType = buildConfig.type;
    this.tailwindInputPath = this._getInputPath(this.parent.root, buildConfig.path);
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
  },

  _validateBuildTarget(buildTarget) {
    if (!buildTarget) {
      this.ui.writeWarnLine('You must specify a buildTarget using an ember-cli-tailwind config object in your app or addon.')
      return false;
    }
    
    if (buildTarget && !validBuildTargets.includes(buildTarget)) {
      this.ui.writeWarnLine('Your buildTarget is invalid. Valid targets are "app", "addon", or "dummy".')
      return false;
    }

    if (this._tailwindAddonConfigExists() && !this._isDependency()) {
      this.ui.writeError('A Tailwind config was detected in the addon folder, but `ember-cli-tailwind` is not listed as a dependency. Please make sure `ember-cli-tailwind` is listed in `dependencies` (NOT `devDependencies`).');
      return false;
    }
    
    return true;
  },

  _tailwindAddonConfigExists() {
    return fs.existsSync(path.join(this.parent.root, 'addon', 'tailwind'));
  },

  // Check that `ember-cli-tailwind` is listed in `dependencies` (as opposed to `devDependencies`)
  _isDependency() {
    let deps = this.parent.pkg.dependencies;

    return Object.keys(deps).includes(this.name);
  }
};
