'use strict';

const Merge = require('broccoli-merge-trees');
const CopyTailwindBuildPlugin = require('ember-cli-tailwind/lib/copy-tailwind-build-plugin');

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

    trees.push(new CopyTailwindBuildPlugin([ tree ], this));

    return new Merge(trees);
  }
};
